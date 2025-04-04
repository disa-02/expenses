import React, { useState } from 'react';
import { ApiService } from './api/ApiService';

export const AddButton = ({nameItem,getItems, addItem, listElements, setListElements}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('Add +');

  const handleItemClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApiCall();
      setIsEditing(false)
      setText('Add +')
      
    }
  };

  const handleApiCall = async () => {
    let body = '';
    const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('userId',token)

    if(nameItem ==='Accounts'){
        body = { name: text, description:"",balance: 0 };
    }
    if(nameItem ==='Spaces' || nameItem ==='Savings'){
        body = { name: text, description:""};
    }
    try {
      const response = await addItem(id, body, token);
      setListElements(listElements => [...listElements, response])
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <li key='0' onClick={handleItemClick}>
      {isEditing ? (
        <input 
          type="text" 
          onChange={handleInputChange} 
          onBlur={handleBlur} 
          onKeyDown={handleKeyDown} 
          autoFocus 
        />
      ) : (
        text
      )}
    </li>
  );
};