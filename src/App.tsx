// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

// import Gauge from "@/components/gauge"

import { ThemeProvider } from "@/components/theme-provider";
import gcsImage from '@/assets/GCS.png'
import appliedRoboticsLogo from '@/assets/appliedRobotics-logo.svg'
import setulogo from '@/assets/setu-logo.svg'

import {
  NavigationMenuDemo
} from "@/components/navmenuDemo"

function App() {

  return (
    <>
     <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {/* <img src="src/assets/noise.jpg" className="noise-bg" alt="" /> */}

      <div className="noise-bg">


      <div className='nav'>
        <img className='setu-logo' src={setulogo} alt="SETU Logo" />
        <img className='main-logo' src={appliedRoboticsLogo} alt="Applied Robotics Logo"  />
         <NavigationMenuDemo />
      </div>

    {/* divs are purely for visual purposes */}
      <div className='noiseOverlay'></div>
      <div className="gradient"></div>



        
          <h1 className="Title">
            Portable Ground Control Station
            <Separator  className="separator"/>
          </h1>
          <h3 className='subtitle'>
            An Exploration Into Specialized Use-Case Computing Platforms
          </h3>

          <div className="mainContainer">

          <img src={gcsImage} className='hero-image' alt="GCS Image" />

          </div>

          <h3 className='subtitle-2'>Final Year Computer Science Project By Andrew Koval</h3>
          <br />
          <br />
          <br />

          <Card className=" mx-auto max-w-3xl" id='Card'>   
            <CardContent className="flex items-center justify-center max-w-3xl p-6 text-center ">
                <p>
                  This project aims to provide a device targeted towards drone, robot and remote-operated vehicle (ROV) operators with the aim of simplifying initial configuration of devices before deployment of the drone / robot / ROV.
                   Construction and development of this device is an exploration of a specialized use-case computing platform rarely seen in the consumer electronics sector.
                   <br />
                   <br />
                    An overarching theme within this development effort is the return to aspects of older, vintage technology.
                   <br />
                   <br />
                    In a world of endless information, artificial intelligence, touchscreens and software updates, I believe that there is profound value in taking a step back and studying technology from the past. In this pursuit I have discovered that physical control surfaces such as real switches, sliders and rotary dials are much more appealing to interact with compared to pressing a virtual button on a GUI and that analog-format video still has a place in today’s world. This project aims to strike a balance between the old and the new world in respect to user interaction and potentially convince individuals that more touchscreens are not always the answer.
                </p>
            </CardContent>
          </Card>
          


      </div>


    </ThemeProvider>


    </>
  )
}

export default App
