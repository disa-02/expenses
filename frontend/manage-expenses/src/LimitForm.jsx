import { useState } from "react"
import { AccountBalanceService } from "./api/AccountBalanceService"

export const LimitForm = ({updateLimit, onClose, id, spaceId, token, accountId}) =>{
    const [limit, setLimit] = useState('')

    const setLimitAccount = async (e) =>{
        e.preventDefault();
        try{
            const body = {id:accountId, spaceOperationId:spaceId, limitMoney:limit}
            const response = await AccountBalanceService.setLimit(id,body,token)
            updateLimit(response)
        }catch(error){
            console.log(error)
        }
    }
    
    return(
        <div className="modal" >
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={setLimitAccount}>
                    <div className="formGroup">
                        <label  htmlFor="limit">Limit:</label>
                        <input 
                            type="number" 
                            value={limit} 
                            onChange={(e) => setLimit(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="submitButton">Set Limit</button>
                </form>
            </div>
        </div>

            
    )
}