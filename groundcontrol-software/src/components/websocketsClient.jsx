import React, { useState, useEffect, useCallback } from 'react';

const STATES = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

const determineNextState = (switchId, currentState) => {
  if (!currentState) return STATES.INIT;
  // Example state machine: INIT -> LOADING -> SUCCESS or ERROR
  switch (currentState) {
    case STATES.INIT:
      return STATES.LOADING;
    case STATES.LOADING:
      // Trying to Simulate some business logic (80% chance of SUCCESS, 20% chance of ERROR)
      return Math.random() > 0.2 ? STATES.SUCCESS : STATES.ERROR;
    case STATES.SUCCESS:
    case STATES.ERROR:
      // Terminal states - stay in these states
      return currentState;
    default:
      return STATES.INIT;
  }
};

const SerialController = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [switches, setSwitches] = useState({});
  const [connectionError, setConnectionError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:1323/ws');
    ws.onopen = () => {
      console.log('Connected to serial server');
      setIsConnected(true);
      setConnectionError(null);
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received switch event:', data);
        
        if (data.switchId) {
          setSwitches(prevSwitches => {
            // get current state if it exists
            const currentSwitch = prevSwitches[data.switchId] || {};
            const currentState = currentSwitch.state;
            // determine the next state based on business logic
            const nextState = determineNextState(data.switchId, currentState);
            // updated switch object
            const updatedSwitch = {
              value: data.value,
              state: nextState,
              lastUpdated: new Date().toISOString()
            };
            // send the new state to the ESP32 (via Go server)
            sendStateToESP32(ws, data.switchId, nextState);
            return {
              ...prevSwitches,
              [data.switchId]: updatedSwitch
            };
          });
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    };
    
    // Handle errors
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionError('Failed to connect to the serial server');
    };
    // Handle disconnection
    ws.onclose = () => {
      console.log('Disconnected from serial server');
      setIsConnected(false);
    };
    setSocket(ws);
    
    // Clean up on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); 
  
  // helper function to send state updates to ESP32 and format the command as {"SW-A-EVENT": "LOADING"}
  const sendStateToESP32 = (ws, switchId, state) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const eventKey = `${switchId}-EVENT`;
      const command = {
        [eventKey]: state
      };
      
      console.log('Sending command to ESP32:', command);
      ws.send(JSON.stringify(command));
    }
  };
  
  const manuallySetSwitchState = useCallback((switchId, newState) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // update local state
      setSwitches(prevSwitches => ({
        ...prevSwitches,
        [switchId]: {
          ...(prevSwitches[switchId] || {}),
          state: newState,
          lastUpdated: new Date().toISOString()
        }
      }));
      
      const eventKey = `${switchId}-EVENT`;
      const command = { [eventKey]: newState };
      socket.send(JSON.stringify(command));
    }
  }, [socket]);
  
  return (
    <div className="serial-controller">
      <div className="connection-status">
        Status: {isConnected ? 'Connected' : 'Disconnected'}
        {connectionError && <div className="error-message">{connectionError}</div>}
      </div>
      
      <div className="switches-container">
        <h3>Switch Status</h3>
        {Object.keys(switches).length === 0 ? (
          <p>No switch activity detected yet</p>
        ) : (
          <ul>
            {Object.entries(switches).map(([switchId, data]) => (
              <li key={switchId}>
                <strong>{switchId}:</strong> Value: {data.value}, State: {data.state}
                <div className="state-controls">
                  <button 
                    onClick={() => manuallySetSwitchState(switchId, STATES.INIT)}
                    disabled={!isConnected || data.state === STATES.INIT}
                  >
                    INIT
                  </button>
                  <button 
                    onClick={() => manuallySetSwitchState(switchId, STATES.LOADING)}
                    disabled={!isConnected || data.state === STATES.LOADING}
                  >
                    LOADING
                  </button>
                  <button 
                    onClick={() => manuallySetSwitchState(switchId, STATES.SUCCESS)}
                    disabled={!isConnected || data.state === STATES.SUCCESS}
                  >
                    SUCCESS
                  </button>
                  <button 
                    onClick={() => manuallySetSwitchState(switchId, STATES.ERROR)}
                    disabled={!isConnected || data.state === STATES.ERROR}
                  >
                    ERROR
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SerialController;