import { ApiPaths } from "./ApiPaths"
import { ApiService } from "./ApiService"

export const SavingService = {
    list: async (id, token) =>{
        const response = ApiService.get(ApiPaths.saving.list(id), token)
        return response;
    },
    delete: async (id, itemId, token) =>{
        const response = ApiService.delete(ApiPaths.saving.delete(id, itemId), token)
        return response;
    },
    add: async (id, body, token) =>{
        const response = await ApiService.authPost(ApiPaths.saving.add(id), body, token);
        return response;
    },
    get: async (id, spaceId, token) => {
        const response = await ApiService.get(ApiPaths.saving.get(id, spaceId), token)
        return response

    },
    update: async(userId,body,token) =>{
        const response = ApiService.put(ApiPaths.saving.update(userId), body, token)
        return response
    }
}