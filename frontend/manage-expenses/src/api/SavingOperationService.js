import { ApiPaths } from "./ApiPaths";
import { ApiService } from "./ApiService";

export const SavingOperationService = {
    list: (id, spaceId, token) => {
        const response = ApiService.get(ApiPaths.savingOperation.list(id, spaceId), token)
        return response
    },
    add: (id, spaceId, body, token) => {
        const response = ApiService.authPost(ApiPaths.savingOperation.add(id, spaceId), body, token);
        return response
    },
    delete: (id, spaceId, operationId, token) => {
        const response = ApiService.delete(ApiPaths.savingOperation.delete(id, spaceId, operationId),token)
        return response
    }
}