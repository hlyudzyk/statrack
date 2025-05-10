'use server'

import apiService from "@/app/services/apiService";

export async function getClockingEventsByUser(userId: string,page: number,size:number): Promise<Event[]> {
  return await apiService.get(`api/v1/clocking-events/by-user-id/${userId}?page=${page}&size=${size}`);
}