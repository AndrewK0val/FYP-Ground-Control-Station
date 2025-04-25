import { useState } from 'react'
// import HUD1 from './assets/FYP-HUD-1.svg'
import HUDMask from './assets/HUD-mask.svg'
import bgImage from './assets/image.png';
import './App.css'
import MiniMap from './components/MiniMap';
import SerialMonitor from './components/websocketsClient';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

     {/* <img src={HUD1} alt="" className='HUD1'/> */}
        <svg
          className="HUD1"
          xmlns="http://www.w3.org/2000/svg"
          width="2274"
          height="363"
          viewBox="0 0 2274 363"
          fill="none"
        >
            <g filter="url(#filter0_i_388_128)">
            <path d="M490.999 4.9334C487.482 1.7552 482.944 0 478.243 0H19.2204C8.6052 0 0 8.765 0 19.5771L0.000602722 182.985C0.000702722 193.797 8.6059 202.562 19.2209 202.562H801.371C811.986 202.562 820.591 211.327 820.591 222.139V336.804C820.591 347.616 829.196 356.381 839.812 356.381H1428.19C1438.8 356.381 1447.41 347.616 1447.41 336.804V222.139C1447.41 211.327 1456.01 202.562 1466.63 202.562H2248.78C2259.39 202.562 2268 193.797 2268 182.985V19.5768C2268 8.7648 2259.39 0 2248.78 0H1789.76C1785.06 0 1780.52 1.7552 1777 4.9334L1722.93 53.7978C1719.42 56.9758 1714.88 58.7308 1710.18 58.7308H557.824C553.122 58.7308 548.584 56.9758 545.067 53.7978L490.999 4.9334Z" fill="url(#paint0_linear_388_128)"/>
            <path d="M490.999 4.9334C487.482 1.7552 482.944 0 478.243 0H19.2204C8.6052 0 0 8.765 0 19.5771L0.000602722 182.985C0.000702722 193.797 8.6059 202.562 19.2209 202.562H801.371C811.986 202.562 820.591 211.327 820.591 222.139V336.804C820.591 347.616 829.196 356.381 839.812 356.381H1428.19C1438.8 356.381 1447.41 347.616 1447.41 336.804V222.139C1447.41 211.327 1456.01 202.562 1466.63 202.562H2248.78C2259.39 202.562 2268 193.797 2268 182.985V19.5768C2268 8.7648 2259.39 0 2248.78 0H1789.76C1785.06 0 1780.52 1.7552 1777 4.9334L1722.93 53.7978C1719.42 56.9758 1714.88 58.7308 1710.18 58.7308H557.824C553.122 58.7308 548.584 56.9758 545.067 53.7978L490.999 4.9334Z" fill="url(#paint1_radial_388_128)" fillOpacity="0.48" style={{ mixBlendMode: "soft-light" }}/>
            </g>
            <path d="M478.243 1.5C482.569 1.5 486.749 3.11493 489.993 6.04631L544.061 54.9107C547.852 58.3356 552.747 60.2308 557.824 60.2308H1710.18C1715.25 60.2308 1720.15 58.3361 1723.94 54.9107C1723.94 54.9104 1723.94 54.91 1723.94 54.9097L1778.01 6.04673C1781.25 3.11495 1785.44 1.5 1789.76 1.5H2248.78C2258.54 1.5 2266.5 9.56735 2266.5 19.5768V182.985C2266.5 192.994 2258.54 201.062 2248.78 201.062H1466.63C1455.16 201.062 1445.91 210.525 1445.91 222.139V336.804C1445.91 346.813 1437.95 354.881 1428.19 354.881H839.812C830.05 354.881 822.091 346.813 822.091 336.804V222.139C822.091 210.525 812.84 201.062 801.371 201.062H19.2209C9.46023 201.062 1.5007 192.995 1.5006 182.985L1.5 19.5771C1.5 9.5673 9.45951 1.5 19.2204 1.5H478.243Z" stroke="#070707" strokeWidth="3"/>
            <defs>
            <filter id="filter0_i_388_128" x="0" y="0" width="2268" height="356.381" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="41.85"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.73 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_388_128"/>
            </filter>
            <linearGradient id="paint0_linear_388_128" x1="1147.5" y1="-1.03223" x2="1147.5" y2="365.468" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D7D7D7" stopOpacity="0.88"/>
            <stop offset="0.418269" stopColor="#AAAAAA" stopOpacity="0.12"/>
            <stop offset="0.959839" stopColor="#5D5D5D" stopOpacity="0.57"/>
            </linearGradient>
            <radialGradient id="paint1_radial_388_128" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1176.5 -249.532) rotate(90) scale(2124 10943.5)">
            <stop offset="0.180165" stopColor="white"/>
            <stop offset="0.180553" stopColor="white" stopOpacity="0"/>
            </radialGradient>
            </defs>
        </svg>




        <svg xmlns="http://www.w3.org/2000/svg" width="1303" height="63" viewBox="0 0 1303 63" fill="none" className='HUD2'>
          <g filter="url(#filter0_i_374_81)">
            <path d="M1 4C4.27455 4.64673 7.34006 6.11098 9.87397 8.27487L63.8264 54.3484C67.3355 57.3451 71.8643 59 76.5556 59H1226.44C1231.14 59 1235.66 57.3451 1239.17 54.3484L1293.13 8.27488C1295.66 6.11099 1298.73 4.64673 1302 4H1Z" fill="url(#paint0_linear_374_81)"/>
          </g>
          <path d="M8.57517 9.79577L8.57517 9.79577L62.5276 55.8693C66.4054 59.1808 71.3968 61 76.5556 61H1226.44C1231.6 61 1236.59 59.1808 1240.47 55.8693L1294.42 9.79578C1296.69 7.85969 1299.44 6.54387 1302.39 5.9621L1302 2H1L0.612482 5.9621C3.55811 6.54387 6.30802 7.85969 8.57517 9.79577Z" stroke="#666666" strokeWidth="4"/>
          <defs>
            <filter id="filter0_i_374_81" x="0.225098" y="0" width="1302.55" height="86" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="23"/>
              <feGaussianBlur stdDeviation="29.7"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.82 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_374_81"/>
            </filter>
            <linearGradient id="paint0_linear_374_81" x1="651.698" y1="4" x2="651.698" y2="60.1301" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C0C0C0"/>
              <stop offset="1" stopColor="#848484"/>
            </linearGradient>
          </defs>
        </svg>

      {/* <img src={HUDMask} alt="" className='HUDMask' /> */}

        <div className='headerText'>
            Applied Robotics Ground Control System
        </div>
      <div className='mainHeader'>
          <h1> Applied Robotics Dashboard
          </h1>
      </div>

      <MiniMap />
      
      <img src={bgImage} className='bg' alt="" />


      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <SerialMonitor />

      </div>
    </>
  )
}

export default App
