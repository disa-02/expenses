import { ApiPaths } from "./ApiPaths";
import { ApiService } from "./ApiService";

export const AccountBalanceService = {
    list: async (id, spaceId, token) => {
        const response = await ApiService.get(ApiPaths.accountBalance.list(id, spaceId), token)
        return response
    },
    setLimit: async (id,body, token) => {
        const response = await ApiService.put(ApiPaths.accountBalance.setLimit(id),body, token)
        return response
    }
}