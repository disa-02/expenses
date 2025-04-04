import { useEffect, useState } from "react";
import './styles/OperationTable.css';
import { AccountOperationService } from "./api/AccountOperationService";
import { ContextMenu } from "./ContextMenu";

export const OperationTableAccount = ({ operationsList, setOperationList, selectedItem,addItem,modify,setModify}) => {
    const [contextMenu, setContextMenu] = useState(null);
    const token = localStorage.getItem('authToken')
    const accountId = selectedItem.item.item.id
    const id = localStorage.getItem('userId')

    const getItems = async (offset,limit) => {
      try{
        const response = await AccountOperationService.list(id, accountId, token)
        setOperationList(prevList => [...prevList, ...response])
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
        setOperationList([])
        getItems(1,2)
    },[selectedItem,addItem])

    const handleContextMenu = (event, item) =>{
        event.preventDefault();
        setContextMenu({
            x: event.clientX,
            y: event.clientY,
            item
          });
          console.log(item)
    }

    const handleDelete = async () => {
        try{
            const operationId = contextMenu.item.id
            console.log(id)
            console.log(accountId)
            console.log(operationId)
            console.log(token)
            const response = await AccountOperationService.delete(id, accountId, operationId, token)
            setContextMenu(false)
            setOperationList(prevOperationsList => 
              prevOperationsList.filter(operation => operation.id !== operationId)
            );
            setModify(!modify)
    
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className="tableContainer">
        <table className="table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
            </thead> 
            <tbody>
              {
                  operationsList.map((item) => (
                      <tr  onContextMenu={(e) => handleContextMenu(e,item)}>
                          <td>{item.date}</td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td className={item.type === "OutOperation" ? 'negative' : 'positive'}>{item.type === "OutOperation" ? -item.amount : "+" + item.amount}</td>
                      </tr>
                  ))
              }
            </tbody>   
            {/* <tfoot>
                <tr>
                  <td colspan="4" onClick={() => getItems(1,2)}>Show more</td>
                </tr>
            </tfoot> */}
        </table>
        {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
        //   onEdit={handleEdit} 
          onDelete={handleDelete} 
        //   onClose={handleCloseContextMenu} 
        />
      )}
        </div>
    )
}