import { useEffect, useState } from "react"
import { AccountBalanceService } from "./api/AccountBalanceService"
import './styles/SpaceOperationsAccounts.css'
import { LimitForm } from "./LimitForm"

export const SpaceOperationAccounts = ({setUpdateBalance, accounts, setAccounts, id, spaceId, token, updateBalance}) => {
    
    const [showLimit, setShowLimit] = useState(false)
    const [accountId, setAccountId] = useState('')

    const getAccountsBalance = async () => { 
        
            try{
                console.log("entra")
                const response = await AccountBalanceService.list(id, spaceId, token)
                console.log(response)
                setAccounts(response)
                setUpdateBalance(false)
              }catch(error){
                console.log(error)
              }
      }

    useEffect(() => {
        if(accounts.length == 0 || updateBalance){
            getAccountsBalance()
        }
    },[updateBalance])
    

    const handleClick = (accId) =>{
        setAccountId(accId)
        setShowLimit(true)    
    }
    const updateLimit = (response) =>{
        console.log(response)
        setAccounts(prevAccounts => {
            return prevAccounts.map(account => {
                if (account.id === response.id) {
                    return { ...account, limitMoney: response.limitMoney };
                }
                return account;
            });
        });
        setShowLimit(false)
    }
    return(
        <div className="accountsList">
            {
            accounts.map((account,index) =>(
                <div className="accountItem" key={index}>
                    <div className="balanceInfo">
                        <p className="accountName">{account.name}</p>
                        <p className="accountBalance">Balance: ${account.balance}</p>
                        <p className="accountLimit">Límite: ${account.limitMoney != -1 ? account.limitMoney : 0}</p>
                    </div>
                    <div className="balanceButton">
                        <button onClick={() => handleClick(account.id)}>setLimit</button>
                    </div>
                </div>
            ))
            }
        {showLimit && 
            <LimitForm updateLimit={updateLimit} onClose={() => setShowLimit(false)} id={id} spaceId={spaceId} token={token} accountId={accountId}/>
        }
        </div>
    )
}