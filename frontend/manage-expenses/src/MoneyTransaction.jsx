import React, { useState , useEffect} from 'react';
import './styles/MoneyTransaction.css'
import { AccountOperationService } from './api/AccountOperationService';

export const MoneyTransaction = ({onClose,operationType,setShowMoneyTransactioForm,accountId,setAddItem,addItem,setOperationList}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description,setDescription] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
          const token = localStorage.getItem('authToken')

            const id = localStorage.getItem('userId')
            console.log(accountId)
            const body = {accountId:accountId,name:name,description:description,amount:amount,date:date,type:operationType}
            const response = await AccountOperationService.add(id, body, token);
            console.log(response)
            setShowMoneyTransactioForm(false)
            setOperationList(operationList => [...operationList, response])
        } catch (error) {
            console.log(error);
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
    },[])

    return(
        <div className='modal'>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <form onSubmit={handleSubmit} className="transactionForm">
            <div className="formGroup">
              <label>Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
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
              <label>Description:</label>
              <input 
                type="text" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </div>
            <div className="formGroup">
              <label>Date:</label>
              <input 
                type="datetime-local" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
        </div>
    )
}