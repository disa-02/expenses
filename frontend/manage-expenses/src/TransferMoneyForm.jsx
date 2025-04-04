import React, { useState , useEffect} from 'react';
import './styles/MoneyTransaction.css'
import { AccountOperationService } from './api/AccountOperationService';
import { AccountService } from "./api/AccountService";


export const TransferMoneyForm = ({onClose,setShowTransferMoney,accountId,setOperationList}) => {
    const [amount, setAmount] = useState('');
    const [destinationAccountId, setDestinationAccountId] = useState('')
    const [accounts, setAccounts] = useState([])
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('authToken')
    let cont =0
   

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            console.log(accountId)
            const body = {sourceAccountId:accountId,destinationAccountId:destinationAccountId,amount:amount}
            console.log(body)
            const response = await AccountOperationService.transfer(id, body, token);
            console.log(response)
            setShowTransferMoney(false)
            setOperationList(operationList => [...operationList, response[0]])
        } catch (error) {
            console.log(error);
        }
    }

    const getAccounts = async () =>{
        try{
            const response = await AccountService.list(id, token)
            setAccounts(response)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAccounts()
    },[])

    useEffect(() => {
        
        for (let i = 0; i < accounts.length; i++) {
            if(accountId != accounts[i].id){
                setDestinationAccountId(accounts[i].id)
                break;
            }
        }
      }, [accounts]);

    return(
        <div className='modal'>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <form onSubmit={handleSubmit} className="transactionForm">
            <div className="formGroup">
              <label>Amount:</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
              />
            </div>
            <div className="formGroup">
                <label htmlFor="accountId">Account:</label>
                <select 
                    id="destinationAccountId" 
                    value={destinationAccountId} 
                    onChange={(e) => setDestinationAccountId(e.target.value)} 
                    required
                >
                    {accounts.map(account => {
                        if(account.id != accountId){
                            return <option key={account.id} value={account.id}>{account.name}</option>
}
                        }
                        
                    )}
                </select>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
        </div>
    )
}