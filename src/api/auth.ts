import { api } from "@/lib/api";

interface SignInBody {
  email: string;
}

export async function signIn(body: SignInBody) {
  return await api.post("/authenticate", body);
}

export async function signOut() {
  return await api.post("/sign-out");
}

interface RegisterRestaurantBody {
  restaurantName: string;
  managerName: string;
  phone: string;
  email: string;
}

export async function registerRestaurant(body: RegisterRestaurantBody) {
  return await api.post("/restaurants", body);
}