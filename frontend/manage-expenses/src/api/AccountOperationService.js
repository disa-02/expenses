import { ApiPaths } from "./ApiPaths";
import { ApiService } from "./ApiService";

export const AccountOperationService = {
    list: (id, accountId, token) => {
        const response = ApiService.get(ApiPaths.accountOperation.list(id, accountId), token)
        return response
    },
    add: (id, body, token) => {
        const response = ApiService.authPost(ApiPaths.accountOperation.add(id), body, token);
        return response
    },
    delete: (id, accountId, operationId, token) => {
        const response = ApiService.delete(ApiPaths.accountOperation.delete(id, accountId, operationId),token)
        return response
    },
    transfer: (id, body, token) => {
        const response = ApiService.put(ApiPaths.accountOperation.transfer(id),body, token)
        return response
    },
    findExpenseByMonth: async(id,year,token) =>{
        const response = ApiService.get(ApiPaths.accountOperation.findExpenseByMonth(id,year), token)
        return response
    }
}