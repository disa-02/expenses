import React, { useState } from 'react'
import {  NavBarItem } from './NavBarItem'
import './styles/NavBar.css'
import { AccountService } from './api/AccountService'
import { SpaceService } from './api/SpaceService'
import { SavingService } from './api/SavingService'


export const NavBar = ({ selectedItem, setSelectedItem }) => {
  const [accountListElements, setAccountListElements] = useState([]);
  const [spaceListElements, setSpaceListElements] = useState([]);
  const [savingListElements, setSavingListElements] = useState([])

  return (
    <div className='navBarContainer'>
        <p onClick={() => setSelectedItem("Home)")}>Home</p>
        <NavBarItem 
          className='navBarItem'
          nameItem='Accounts' 
          listElements={accountListElements}
          setListElements={setAccountListElements}
          setSelectedItem={setSelectedItem}
          listItems={AccountService.list}
          deleteItem={AccountService.delete}
          addItem={AccountService.add}
          selectedItem={selectedItem}
          />
        <NavBarItem 
          className='navBarItem' 
          nameItem='Spaces'
          listElements={spaceListElements}
          setListElements={setSpaceListElements}
          setSelectedItem={setSelectedItem}
          listItems={SpaceService.list}
          deleteItem={SpaceService.delete}
          addItem={SpaceService.add}/>
        <NavBarItem 
          className='navBarItem' 
          nameItem='Savings'
          listElements={savingListElements}
          setListElements={setSavingListElements}
          setSelectedItem={setSelectedItem}
          listItems={SavingService.list}
          deleteItem={SavingService.delete}
          addItem={SavingService.add}/>
    </div>
  )
}
