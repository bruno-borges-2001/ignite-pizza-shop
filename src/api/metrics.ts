import { api } from "@/lib/api";

interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountResponse>(
    "/metrics/day-orders-amount",
  );

  return response.data;
}

interface GetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return response.data;
}

interface GetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<GetMonthOrdersAmountResponse>(
    "/metrics/month-orders-amount",
  );

  return response.data;
}

interface GetMonthRevenueResponse {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueResponse>(
    "/metrics/month-receipt",
  );

  return response.data;
}

type GetPopularProductsResponse = {
  product: string;
  amount: number;
}[];

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsResponse>(
    "/metrics/popular-products",
  );

  return response.data;
}

type GetPeriodRevenueResponse = {
  date: string;
  receipt: number;
}[];

export async function getPeriodRevenue(to?: Date, from?: Date) {
  const response = await api.get<GetPeriodRevenueResponse>(
    "/metrics/daily-receipt-in-period",
    { params: { to: to?.toISOString(), from: from?.toISOString() } },
  );

  return response.data;
}
