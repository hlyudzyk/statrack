import apiService from "@/app/services/apiService";


export async function joinQueue(userId: string, payload: FormData){
  return await apiService.postWithoutToken(`api/v1/queues/by-user-id/${userId}/entries`, payload);
}