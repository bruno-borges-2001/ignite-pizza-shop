import { api } from "@/lib/api";

interface GetProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");

  return response.data
}

interface UpdateProfileBody {
  name: string
  description: string | null
}

export async function updateProfile(body: UpdateProfileBody) {
  await api.put("/profile", body);
}