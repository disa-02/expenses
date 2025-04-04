import { ApiPaths } from "./ApiPaths"
import { ApiService } from "./ApiService"

export const AccountService = {
    list: async (id, token) =>{
        const response = ApiService.get(ApiPaths.account.base(id), token)
        return response;
    },
    delete: async (id, itemId, token) =>{
        const response = ApiService.delete(ApiPaths.account.delete(id, itemId), token)
        return response;
    },
    add: async (id, body, token) =>{
        const response = await ApiService.authPost(ApiPaths.account.base(id), body, token);
        return response;
    },
    get: async (id, accountId, token) =>{
        const response = ApiService.get(ApiPaths.account.get(id, accountId), token)
        return response;
    },
    update: async(userId,body,token) =>{
        const response = ApiService.put(ApiPaths.account.update(userId), body, token)
        return response
    }
}