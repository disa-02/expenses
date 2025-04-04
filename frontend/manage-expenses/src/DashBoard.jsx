import React, {useState} from 'react'
import './styles/DashBoard.css'
import { useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar'
import { LandPage } from './LandPage'

export const DashBoard = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const navigate = useNavigate();

  const handleLogOut = () =>{
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    navigate('/');
  }
  return (
    <div className='appContainer'>
      <div className='topBar' > 
        <img src='/images/logo.png' width={200}/> 
        <button onClick={() => handleLogOut()}> Log Out</button>
      </div>
      <div className='navBar'> <NavBar selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> </div>
      <div className='landPage'> <LandPage setSelectedItem={setSelectedItem} selectedItem={selectedItem}/> </div>
    </div>
  )
}
