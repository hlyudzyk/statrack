import apiService from "@/app/services/apiService";
import {User} from "@/app/lib/types"
import {getUserId} from "@/app/lib/actions";

export async function getUserData(userId: string): Promise<User> {
  return await apiService.get(`api/v1/users/${userId}`);
}
export async function updateUserData(userId: string, data: any): Promise<any>{
  return await apiService.put(`api/v1/users/${userId}`, data);
}

export async function getCurrentUser(): Promise<User | null>{
  const userId = await getUserId();
  let user = null;
  if (userId) {
    user = await getUserData(userId);
  }
  return user;
}