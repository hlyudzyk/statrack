'use server'

import apiService from "@/app/services/apiService";
import {ClockingEvent} from "@/app/lib/types"

export async function getClockingEventsByUser(userId: string,page: number,size:number): Promise<ClockingEvent[]> {
  const response = await apiService.get(`api/v1/clocking-events/by-user-id/${userId}?page=${page}&size=${size}`);
  return response.content;
}