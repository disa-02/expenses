import React from 'react'
import { TopBar } from './TopBar'
import LandingPage from './LandingPage'
// import './styles/HomePage.css'


export const HomePage = () => {
  return (
    <div className='HomePageContainer'>
      <TopBar />
      <LandingPage />
    </div>
  )
}