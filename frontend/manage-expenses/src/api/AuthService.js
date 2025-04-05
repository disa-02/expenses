import { ApiService } from "./ApiService";
import { ApiPaths } from "./ApiPaths";

export const AuthService = {
    login: async (credentials) =>{
        const response = await ApiService.post(ApiPaths.auth.login, credentials)
        return response;
    },
    signup: async (credentials) =>{
        const response = await ApiService.post(ApiPaths.auth.signup, credentials)
        return response;
    },
    logOut: async () =>{
        const response = await ApiService.get(ApiPaths.auth.logOut)
        return response;
    },
}