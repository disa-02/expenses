import { ApiPaths } from "./ApiPaths";
import { ApiService } from "./ApiService";

export const SpaceOperationService = {
    list: (id, spaceId, token) => {
        const response = ApiService.get(ApiPaths.spaceOperation.list(id, spaceId), token)
        return response
    },
    add: (id, spaceId, body, token) => {
        const response = ApiService.authPost(ApiPaths.spaceOperation.add(id, spaceId), body, token);
        return response
    },
    delete: (id, spaceId, operationId, token) => {
        const response = ApiService.delete(ApiPaths.spaceOperation.delete(id, spaceId, operationId),token)
        return response
    }
}