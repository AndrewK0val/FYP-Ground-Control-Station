import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '320px',
  height: '160px',
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'absolute',
  bottom: '2rem',
  right: '2rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  zIndex: 1000,
  border: '2px solid rgba(255,255,255,0.2)',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const MiniMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeId: 'satellite',
          gestureHandling: 'none',
          draggable: false,
          keyboardShortcuts: false,
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      />
      <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
        <path d="M12 2L15 10H9L12 2Z" fill="#00f" />
      </svg>
    </>
  ) : null;
};

export default React.memo(MiniMap);