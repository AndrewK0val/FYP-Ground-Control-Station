import './App.css'
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeProvider } from "@/components/theme-provider"
import gcsImage from '@/assets/GCS.png'
import appliedRoboticsLogo from '@/assets/appliedRobotics-logo.svg'
import setulogo from '@/assets/setu-logo.svg'
import { NavigationMenuDemo } from "@/components/navmenuDemo"
import ProjectDescription from "@/components/ProjectDescription"
import { Link } from "react-router-dom"; // assumes react-router-dom is set up

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="noise-bg">
        <div className='nav'>
          <img className='setu-logo' src={setulogo} alt="SETU Logo" />
          <img className='main-logo' src={appliedRoboticsLogo} alt="Applied Robotics Logo" />
          <NavigationMenuDemo />
        </div>

        <div className='noiseOverlay'></div>
        <div className="gradient"></div>

        <h1 className="Title">
          Portable Ground Control Station
          <Separator className="separator" />
        </h1>
        <h3 className='subtitle'>
          An Exploration Into Specialized Use-Case Computing Platforms
        </h3>

        <div className="mainContainer">
          <img src={gcsImage} className='hero-image' alt="GCS Image" />
        </div>

        <h3 className='subtitle-2'>Final Year Computer Science Project By Andrew Koval</h3>

        <Card className="mx-auto max-w-3xl" id='Card'>
          <CardContent className="flex items-center justify-center max-w-3xl p-6 text-center">
            <ProjectDescription />
          </CardContent>
        </Card>
      </div>
      <footer className="w-full bg-gray-900 text-white py-8 px-4 mt-16 footer">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm">&copy; 2025 Andrew Koval</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-gray-300 transition-colors"
            >
              LinkedIn
            </a>
            <Link
              to="/about"
              className="hover:underline hover:text-gray-300 transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  )
}

export default App