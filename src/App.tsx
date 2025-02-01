// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

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


      {/* <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu> */}

      <div className='nav'>
        <img className='setu-logo' src={setulogo} alt="SETU Logo" />
        <img className='main-logo' src={appliedRoboticsLogo} alt="Applied Robotics Logo" />
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
          <br />

        <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


  

      </div>


    </ThemeProvider>

      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

    </>
  )
}

export default App
