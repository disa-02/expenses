import React, { useEffect, useState } from 'react';
import { AccountOperationService } from './api/AccountOperationService'
import { AccountService } from './api/AccountService'
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

import './styles/Home.css'; // Importar el archivo CSS

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


export const Home = () => {
    const [monthExpenses, setMonthExpenses] = useState([]);
    const [accounts, setAcounts] = useState([]);
    const [balance, setBalance] = useState(-1);
    const [available, setAvailable] = useState(-1);

    const id = localStorage.getItem('userId')
    const token = localStorage.getItem('authToken');

    const getAccounts = async () =>{
        try{
            const response = await AccountService.list(id,token)
            setAcounts(response)
          }catch(error){
            console.log(error)
          }

    }

    const getMonthExpenses = async () =>{
        try{
            const response = await AccountOperationService.findExpenseByMonth(id,12,token)
            console.log(response)
            setMonthExpenses(response)
          }catch(error){
            console.log(error)
          }

    }

    const getExpensesBySpaces = async () =>{

    }

    const getSavingsGroup = async () =>{

    }
    
    const barData = {
        labels: monthExpenses.map(space => space.date),
        datasets: [{
            label: 'Gastos Mensuales',
            data: monthExpenses.map(space => space.expense),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }]
    };

    useEffect(() => {
        getMonthExpenses();
        getAccounts();
    }, []);

    useEffect(() => {
        let totalBalance = 0;
        let totalAvailable = 0;
        accounts.forEach(account => {
            totalBalance += account.balance;
            totalAvailable += account.availableMoney;
        });
        setBalance(totalBalance);
        setAvailable(totalAvailable);
    }, [accounts]);
    
    return (
        <div className="homeContainer">
            <div className="accountsSummary">
                <p>Balance: {balance}</p>
                <p>Available: {available}</p>
            </div>
            <div className='sumary'>
                <div className="chartSection">
                    <h3>Distribución de Gastos</h3>
                    <Bar data={barData} options={{ responsive: true }} />
                </div>
                <div className="accountsSumary">
                    <h3>Listado de Cuentas</h3>
                    <ul>
                        {accounts.map((account, index) => (
                            <li key={index} className="account">
                                <p><strong>Account:</strong> {account.name}</p>
                                <p><strong>Balance:</strong> ${account.balance}</p>
                                <p><strong>Available:</strong> ${account.availableMoney}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          
        </div>
    );
};
