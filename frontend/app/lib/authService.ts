'use server'
import apiService from "@/app/services/apiService";

export async function authenticate(payload){
  return await apiService.postWithoutToken(`api/v1/auth/authenticate`, payload);
}
