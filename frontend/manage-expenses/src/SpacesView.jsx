import { useEffect, useState } from "react";
import { OperationTableSpace } from "./OperationTableSpace"
import './styles/Spaces.css';
import { SpaceOperationAccounts } from "./SpaceOperationAccounts";
import { OperationForm } from "./OperationForm";
import { SpaceService } from "./api/SpaceService";
import { NameInput } from "./NameInput";
import { SpaceOperationService } from "./api/SpaceOperationService";




export const SpacesView = ({setSelectedItem, selectedItem}) =>{
    const [space, setSpace] = useState({id:'',name:'',balance:'',accounts:[{}],operations:[{}]});
    const [showAccounts, setShowAccounts] = useState(false);
    const [showOperationForm, setShowOperationForm] = useState(false)
    const [addItem,setAddItem] = useState(false);
    const [modifySpace, setModifySpace] = useState(false)
    const [operationsList, setOperationList] = useState([]);
    const [spaceName, setSpaceName] = useState('')
    const [accounts, setAccounts] = useState([])
    const [updateBalance, setUpdateBalance] = useState(false)
    



    const id = localStorage.getItem('userId')
    const spaceId = selectedItem.item.item.id
    const token = localStorage.getItem('authToken')

    const getSpace = async () => {
      try{
        const response = await SpaceService.get(id,spaceId,token)
        setSpace(response) 
        setAccounts([])      
      }catch(error){
        console.log(error)
      }
    }


    useEffect(() => {
        setShowAccounts(false)
        getSpace()
        setSpaceName(selectedItem.item.item.name)
    },[selectedItem, modifySpace, operationsList])

    return(
        <div className="spaceContainer">
          <div className="spaceInfo">
            <div className="spaceDetails">
              <NameInput selectedItem={selectedItem} setSelectedItem={setSelectedItem} itemName={spaceName} setItemName={setSpaceName} update={SpaceService.update}/>
              <p className="spaceBalance">Balance: ${space.balance}</p>
            </div>
            <div className="accountsLimits">
              <button className="toggleButton" onClick={() => setShowAccounts(!showAccounts)}>
                  {showAccounts ? 'Ocultar Cuentas' : 'Mostrar Cuentas'}
              </button>
              {showAccounts && (
                <SpaceOperationAccounts setUpdateBalance={setUpdateBalance} accounts={accounts} setAccounts={setAccounts} id={id} spaceId={spaceId} token={token} updateBalance={updateBalance}/>
              )}
            </div>
            <div className="addContainer">
              <button onClick={() =>setShowOperationForm(true)}> Add Operation</button>

            </div>
          </div>
          <div className="operations">
          {/* path={path} selectedItem={selectedItem} addItem={addItem} modifyAccount={modifyAccount} setModifyAccount={setModifyAccount} */}
            <OperationTableSpace updateAccountBalance={() => setUpdateBalance(true)} operationsList={operationsList} setOperationList={setOperationList} selectedItem={selectedItem} addItem={addItem} modify={modifySpace} setModify={setModifySpace} service={SpaceOperationService}/>
          </div>
          {showOperationForm &&
            <OperationForm updateAccountBalance={() => setUpdateBalance(true)} setOperationList={setOperationList} onClose={() =>setShowOperationForm(false)} setShowOperationForm={setShowOperationForm} spaceId={spaceId} getSpace={getSpace} addItem={addItem} setAddItem={setAddItem}/>
          }
        </div>
    )
}