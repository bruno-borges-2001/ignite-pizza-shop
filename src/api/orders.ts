import { api } from "@/lib/api";

export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

export interface Order {
  orderId: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  total: number;
}

export interface OrderDetails {
  id: string;
  createdAt: string;
  status: OrderStatus;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    product: { name: string };
    priceInCents: number;
    quantity: number;
  }[];
}

export interface GetOrdersResponse {
  orders: Order[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export interface GetOrdersParams {
  pageIndex?: number;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export async function getOrders({ pageIndex = 0, ...rest }: GetOrdersParams) {
  const response = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
      ...rest,
    },
  });

  return response.data;
}

export async function getDetails(orderId: string) {
  const response = await api.get<OrderDetails>(`/orders/${orderId}`);

  return response.data;
}

export async function cancelOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/cancel`);
}

export async function approveOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/approve`);
}

export async function deliverOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/deliver`);
}

export async function dispatchOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/dispatch`);
}
