import apiService from "@/app/services/apiService";

export async function getAllEvents(): Promise<Event[]> {
  return await apiService.get(`api/v1/events`);
}
export async function getEventById(eventId: string): Promise<Event>{
  return await apiService.get(`api/v1/events${eventId}`);
}
export async function createEvent(payload: FormData){
  return await apiService.post(`api/v1/events`, payload);
}