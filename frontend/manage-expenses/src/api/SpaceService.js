import { ApiPaths } from "./ApiPaths"
import { ApiService } from "./ApiService"

export const SpaceService = {
    list: async (id, token) =>{
        const response = ApiService.get(ApiPaths.space.list(id), token)
        return response;
    },
    delete: async (id, itemId, token) =>{
        const response = ApiService.delete(ApiPaths.space.delete(id, itemId), token)
        return response;
    },
    add: async (id, body, token) =>{
        const response = await ApiService.authPost(ApiPaths.space.add(id), body, token);
        return response;
    },
    get: async (id, spaceId, token) => {
        const response = await ApiService.get(ApiPaths.space.get(id, spaceId), token)
        return response

    },
    update: async(userId,body,token) =>{
        const response = ApiService.put(ApiPaths.space.update(userId), body, token)
        return response
    }
}