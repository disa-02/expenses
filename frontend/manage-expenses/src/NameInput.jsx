import { useEffect, useState } from "react";
import { AccountService } from "./api/AccountService";
import './styles/NameInput.css'

export const NameInput = ({selectedItem, setSelectedItem, itemName, setItemName, update }) => {
    const itemId = selectedItem.item.item.id

    const handleNameInput = async (e) =>{
        e.preventDefault();
        // alert("aaa")
        if(selectedItem.item.item.name != itemName){
          try {
            const id = localStorage.getItem('userId')
            const token = localStorage.getItem('authToken')
            const body = {id:itemId, name: itemName}
            const response = await update(id,body,token)
            selectedItem.item.item.name=itemName
            setSelectedItem(selectedItem)
            selectedItem.setListElements((prevListElements) =>
              prevListElements.map((element) =>
                element.id === selectedItem.item.item.id ? { ...element, name: itemName } : element
              )
            );
  
          } catch (error) {
              console.log(error);
          }
        }

    }

    const handleKeyPress =(e) => {
        
      if (e.key === 'Enter') {
        console.log("S")
        handleNameInput(e)
        e.target.blur();
      }
    }

    useEffect(() => {
        setItemName(selectedItem.item.item.name)
    },[])
    return(
        <input className="inputItemName"
            type="text" 
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleNameInput}
        />
    )
}