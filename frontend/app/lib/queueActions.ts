"use server"
import apiService from "@/app/services/apiService";
import {QueueEntry} from "@/app/lib/types";

export async function joinQueue(userId: string, payload: FormData){
  return await apiService.postWithoutToken(`api/v1/queues/by-user-id/${userId}/entries`, payload);
}
export async function getQueueEntriesByUser(userId: string) : Promise<QueueEntry[]>{
  return await apiService.get(`api/v1/queues/by-user-id/${userId}/entries`)
}