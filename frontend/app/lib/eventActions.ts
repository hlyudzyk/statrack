'use server'
import apiService from "@/app/services/apiService";

export async function getAllEvents(page: number, size: number, date?: string, keyword?: string): Promise<Event[]> {
  const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
  if (date) params.append("date", date);
  if (keyword) params.append("keyword", keyword);
  return await apiService.get(`api/v1/events?${params.toString()}`);
}

export async function getEventById(eventId: string): Promise<Event>{
  return await apiService.get(`api/v1/events${eventId}`);
}
export async function createEvent(payload: FormData){
  return await apiService.post(`api/v1/events`, payload);
}