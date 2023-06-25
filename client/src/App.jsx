import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './components/LandingPage.js/LandingPage'
import LandingRoutes from './components/LandingPage.js/LandingRoutes'

function App() {
  return (
    <div className='App'>
      <LandingRoutes/>
    </div>
  )
}

export default App
