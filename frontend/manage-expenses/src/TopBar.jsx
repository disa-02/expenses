import React from 'react'
import { Link } from 'react-router-dom';
import './styles/TopBar.css'

export const TopBar = () =>{
    return(
        <div className="topBarContainer">
            <div className='logo'>
                <img className='logo' src='/images/logo.png' />
            </div>
            <div className='auth'>
                <Link to="/login">
                    <button className='authButton'>Log In</button>
                </Link>
                <Link to="/signup">
                    <button className='authButton'>Sign Up</button>
                </Link>
            </div>

        </div>
    )
}