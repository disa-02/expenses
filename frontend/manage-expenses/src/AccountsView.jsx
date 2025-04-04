import { useEffect, useState } from "react";
import { OperationTableAccount } from "./OperationTableAccount"
import './styles/Accounts.css';
import { AccountService } from "./api/AccountService";
import { MoneyTransaction } from "./MoneyTransaction";
import { NameInput } from "./NameInput";
import { TransferMoneyForm } from "./TransferMoneyForm";


export const AccountsView = ({setSelectedItem, selectedItem}) =>{
    const [account, setAccount] = useState({id:'',name:'',balance:'',availableMoney:''});
    const [showMoneyTransactionForm, setShowMoneyTransactioForm] = useState(false);
    const [operationType,setOperationType] = useState('');
    const [addItem,setAddItem] = useState(false);
    const [modifyAccount,setModifyAccount] = useState(false);
    const [operationsList, setOperationList] = useState([]);
    const [accountName, setAccountName] = useState('')
    const [showTransferMoney, setShowTransferMoney] = useState(false)


    const accountId = selectedItem.item.item.id

    const getAccount = async () => {
      try{
        const token = localStorage.getItem('authToken')
        const id = localStorage.getItem('userId')
        const response = await AccountService.get(id, accountId, token)
        setAccount(response)
      }catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      getAccount()
      setAccountName(selectedItem.item.item.name)
    },[selectedItem,modifyAccount,operationsList])


    
    const handleMoneyTransactionButton = (type) =>{
      setShowMoneyTransactioForm(true);
      setOperationType(type);
    }
    const handleTransferButton = () =>{
      setShowTransferMoney(true)
    }



    return(
        <div className="accountContainer">
          <div className="accountInfo">
          <div className="accountDetails">

            <NameInput selectedItem={selectedItem} setSelectedItem={setSelectedItem} itemName={accountName} setItemName={setAccountName} update={AccountService.update}/>
            <p className="accountBalance">Balance: ${account.balance}</p>
            <p className="accountAvailable">Disponible: ${account.availableMoney}</p>
          </div>
            <div className="accountButtons">
              <button className="depositButton" onClick={() =>handleMoneyTransactionButton('IN')}>Depositar</button>
              <button className="transferButton" onClick={() => handleTransferButton()}>Transfer</button>
              <button className="withdrawButton" onClick={() =>handleMoneyTransactionButton('OUT')}>Retirar</button>
            </div>
          </div>
          <div className="operations">
            <OperationTableAccount 
              operationsList={operationsList}
              setOperationList={setOperationList}
              selectedItem={selectedItem} 
              addItem={addItem} modify={modifyAccount} 
              setModify={setModifyAccount}/>
          </div>
            {showMoneyTransactionForm && (
              <MoneyTransaction 
                onClose={() =>setShowMoneyTransactioForm(false)} 
                operationType={operationType} 
                setShowMoneyTransactioForm={setShowMoneyTransactioForm} 
                accountId={accountId} 
                getAccount={getAccount} 
                setAddItem={setAddItem} 
                addItem={addItem}
                setOperationList={setOperationList}
                operationsList={operationsList}/>
            )}
            {showTransferMoney && (
              <TransferMoneyForm
                onClose={() => setShowTransferMoney(false)}
                setShowTransferMoney={setShowTransferMoney}
                setOperationList={setOperationList}
                accountId={accountId}
              />
            )}
          </div>
    )
}