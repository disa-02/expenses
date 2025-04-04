import React, { useState , useEffect} from 'react';
import './styles/MoneyTransaction.css'
import { ApiService } from './api/ApiService';
import { AccountService } from './api/AccountService';
import { SpaceOperationService } from './api/SpaceOperationService';

export const OperationForm = ({updateAccountBalance,onClose,setShowOperationForm,spaceId,setOperationList,setAddItem,addItem}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description,setDescription] = useState('');
    const [operationType, setOperationType] = useState('OUT');
    const [accounts, setAccounts] = useState([])
    const [accountId, setAccountId] = useState(0)
    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('authToken')


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const body = {accountId:accountId,name:name,description:description,amount:amount,date:date,type:operationType}
            const response = await SpaceOperationService.add(id,spaceId,body,token)
            setShowOperationForm(false)
            setOperationList(operationList => [...operationList, response])
            updateAccountBalance()
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

    const getCurrentDatetime = () => {
      const now = new Date(Date.now());
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    useEffect(() => {
      setDate(getCurrentDatetime());
      getAccounts()
    },[])

    useEffect(() => {
      if (accounts.length > 0) {
        setAccountId(accounts[0].id); // Establecer el primer account como valor por defecto
      }
    }, [accounts]);

    return(
        <div className='modal'>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <form onSubmit={handleSubmit} className="transactionForm">
            <div className="formGroup">
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div className="formGroup">
                <label htmlFor="amount">Amount:</label>
                <input 
                    type="number" 
                    id="amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
            </div>
            <div className="formGroup">
                <label htmlFor="description">Description:</label>
                <input 
                    type="text" 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}  
                />
            </div>
            <div className="formGroup">
                <label htmlFor="operationType">Type:</label>
                <select 
                    id="operationType" 
                    value={operationType} 
                    onChange={(e) => setOperationType(e.target.value)} 
                    required
                >
                    <option value="IN">In</option>
                    <option value="OUT">Out</option>
                </select>
            </div>
            <div className="formGroup">
                <label htmlFor="accountId">Account:</label>
                <select 
                    id="accountId" 
                    value={accountId} 
                    onChange={(e) => setAccountId(e.target.value)} 
                    required
                >
                    {accounts.map(account => (
                        <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                </select>
            </div>
            <div className="formGroup">
                <label htmlFor="date">Date:</label>
                <input 
                    type="datetime-local" 
                    id="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="submitButton">Enviar</button>
        </form>

        </div>
        </div>
    )
}