// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Button } from "@/components/ui/button"
import './App.css'
import { Separator } from "@/components/ui/separator"
import appliedRoboticsLogo from '@/assets/appliedRobotics-logo.svg'
import gcsImage from '@/assets/GCS.png'
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu"

import { ThemeProvider } from "@/components/theme-provider";

import {
  NavigationMenuDemo
} from "@/components/navmenuDemo"


// import {
//   Menubar,
//   MenubarCheckboxItem,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarRadioGroup,
//   MenubarRadioItem,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarSub,
//   MenubarSubContent,
//   MenubarSubTrigger,
//   MenubarTrigger,
  
// } from "@/components/ui/menubar"

function App() {


  return (
    <>
     <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">

      <div>
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
        <img className='logo' src={appliedRoboticsLogo} alt="Applied Robotics Logo" />
      <NavigationMenuDemo />
      </div>
      <div className='mainDiv'>



      </div>
          <h1 className="Title">Portable Ground Control Station
            <Separator />
          </h1>
          <h3 className='subtitle'>
            An Exploration Into Specialized Use-Case Computing Platforms
          </h3>

          <div className="mainContainer">

            <img src={gcsImage} className='hero-image' alt="GCS Image" />
          </div>

          <h3 className='subtitle-2'>Final Year Computer Science Project By Andrew Koval</h3>

      </div>
  

      <div>
       <Button>Click me</Button>
      </div>
    </ThemeProvider>

    </>
  )
}

export default App
