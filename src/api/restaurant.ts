import { api } from "@/lib/api";

export interface GetRestaurantResponse {
  id: string
  name: string
  description: string | null
  managerId: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getRestaurant() {
  const response = await api.get<GetRestaurantResponse>("/managed-restaurant");

  return response.data
}