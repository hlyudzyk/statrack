'use server'
import apiService from "@/app/services/apiService";

export async function getAllEvents(page: number,size:number): Promise<Event[]> {
  return await apiService.get(`api/v1/events?page=${page}&size=${size}`);
}
export async function getEventById(eventId: string): Promise<Event>{
  return await apiService.get(`api/v1/events${eventId}`);
}
export async function createEvent(payload: FormData){
  return await apiService.post(`api/v1/events`, payload);
}