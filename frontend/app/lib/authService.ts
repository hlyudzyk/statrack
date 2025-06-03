'use server'
import apiService from "@/app/services/apiService";

export async function authenticate(payload){
  return await apiService.postWithoutToken(`api/v1/auth/authenticate`, payload,'application/json');
}

export async function activateAccountRequest(token, password){
  return await apiService.postWithoutToken("api/v1/auth/activate-account",JSON.stringify({"token":token,"password":password}),'application/json')
}

export async function validateTokenRequest(token: string){
  return await apiService.get(`api/v1/auth/validate-activation-token?token=${token}`,false)
}
