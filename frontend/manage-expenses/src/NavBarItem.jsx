import React, {useEffect, useState } from 'react'
import './styles/NavBarItem.css'
import { AddButton } from './AddButton';
import { ContextMenu } from "./ContextMenu";



export const NavBarItem = ({nameItem, selectedItem, setSelectedItem, listItems, deleteItem, addItem, listElements, setListElements}) => {
  const [showList, setShowList] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [contextMenu, setContextMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false)
  const id = localStorage.getItem('userId')
  const token = localStorage.getItem('authToken');

  // const updateItem = () =>{
  //   if(listElements.length != 0)
  //     console.log('entra')

  //   listElements.map(element =>{
  //     element.id === selectedItem.item.item.id ? { ...element, name: selectedItem.item.item.name } : element
  //   })
  // }

//   useEffect(() => {
//     updateItem()
// }, [selectedItem]);

  const getItems = async () =>{
    if(listElements.length === 0){
      try{
        const response = await listItems(id,token)
        setListElements(response)
      }catch(error){
        console.log(error)
      }
    }

  }

  const handleClick = async () => {

      if (!showList) {
        getItems()
      }
      setShowList(!showList);
      setIsClicked(!isClicked);
    };

  const handleContextMenu = (event, item) =>{
    event.preventDefault();
    const boundingBox = event.currentTarget.getBoundingClientRect();
    const listContainer = event.currentTarget.closest('.listContainer');
    const listContainerRect = listContainer.getBoundingClientRect();
    setContextMenu({
        x: event.clientX - listContainerRect.left ,
        y: event.clientY - listContainerRect.top + boundingBox.height ,
        // x: event.clientX,
        //     y: event.clientY,
        item
    });
    setShowContextMenu(true)

  }

  const handleClickOutside = (event) => {
    if (showContextMenu) {
        setShowContextMenu(false);
        setContextMenu(null);
    }
  };

  useEffect(() => {
      if (showContextMenu) {
          document.addEventListener('click', handleClickOutside);
      } else {
          document.removeEventListener('click', handleClickOutside);
      }

      return () => {
          document.removeEventListener('click', handleClickOutside);
      };
  }, [showContextMenu]);

  const handleDelete = async () => {
    try{
        const itemId = contextMenu.item.id
        const response = await deleteItem(id,itemId,token)
        setContextMenu(null);
        setShowContextMenu(false)
        setListElements( prevListElement => 
          prevListElement.filter(element => element.id !== itemId)
        );
        onItemClick('')
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div className='navBarItemContainer' >
        <div className='button' onClick={handleClick}>
          <p className='itemName'>{nameItem}</p>
          <img className={isClicked ? 'rotate' : ''} src="/icons/row.png" alt="Descripción de la imagen" />
        </div>
        
        {showList && (
          <div className='listContainer'>
            <ul>
                <AddButton className='button' getItems={getItems} nameItem={nameItem} addItem={addItem} listElements={listElements} setListElements={setListElements}/>
                {listElements.map((item, index) => (
                  <>
                    <li key={index + 1}  onContextMenu={(e) => handleContextMenu(e,item)} onClick={() => setSelectedItem({type:nameItem,item:{item},setListElements:setListElements})}>{item.name}</li>
                {showContextMenu && (
                  <ContextMenu className='contextMenuContainer'
                    x={contextMenu.x} 
                    y={contextMenu.y} 
                  //   onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                  )
                }
                </>
                ))}
            </ul>
          </div>
        )}

        
    </div>
  )
}
