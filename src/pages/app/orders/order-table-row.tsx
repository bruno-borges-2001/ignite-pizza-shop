import {
  approveOrder,
  cancelOrder,
  deliverOrder,
  dispatchOrder,
  GetOrdersResponse,
  type Order,
  type OrderStatus as TOrderStatus,
} from "@/api/orders";
import { OrderStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowRight, X } from "lucide-react";
import OrderDetails from "./order-details";

interface OrderTableRowProps {
  order: Order;
}

export default function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(status: TOrderStatus) {
    const cachedOrders = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["get-orders"],
    });

    cachedOrders.forEach(([key, data]) => {
      if (!data) return;

      queryClient.setQueryData<GetOrdersResponse>(key, {
        ...data,
        orders: data.orders.map((o) => {
          if (o.orderId === order.orderId) {
            return {
              ...o,
              status,
            };
          }

          return o;
        }),
      });
    });
  }

  const { mutate: handleCancelOrder, isPending: canceling } = useMutation({
    mutationFn: () => cancelOrder(order.orderId),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["get-orders"] });
      updateOrderStatusOnCache("canceled");
    },
  });

  const { mutate: handleApproveOrder, isPending: approving } = useMutation({
    mutationFn: () => approveOrder(order.orderId),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["get-orders"] });
      updateOrderStatusOnCache("processing");
    },
  });

  const { mutate: handleDispatchOrder, isPending: dispatching } = useMutation({
    mutationFn: () => dispatchOrder(order.orderId),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["get-orders"] });
      updateOrderStatusOnCache("delivering");
    },
  });

  const { mutate: handleDeliverOrder, isPending: delivering } = useMutation({
    mutationFn: () => deliverOrder(order.orderId),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["get-orders"] });
      updateOrderStatusOnCache("delivered");
    },
  });

  const loadingState = canceling || approving || dispatching || delivering;

  const Buttons: Record<TOrderStatus, React.ReactNode> = {
    pending: (
      <Button
        onClick={() => handleApproveOrder()}
        disabled={loadingState}
        variant="outline"
        size="xs"
      >
        <ArrowRight className="mr-2 h-3 w-3" />
        Aprovar
      </Button>
    ),
    processing: (
      <Button
        onClick={() => handleDispatchOrder()}
        disabled={loadingState}
        variant="outline"
        size="xs"
      >
        <ArrowRight className="mr-2 h-3 w-3" />
        Em entrega
      </Button>
    ),
    delivering: (
      <Button
        onClick={() => handleDeliverOrder()}
        disabled={loadingState}
        variant="outline"
        size="xs"
      >
        <ArrowRight className="mr-2 h-3 w-3" />
        Entregue
      </Button>
    ),
    canceled: null,
    delivered: null,
  };

  return (
    <TableRow>
      <TableCell>
        <OrderDetails orderId={order.orderId} />
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {dayjs(order.createdAt).fromNow()}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {formatCurrency(order.total / 100)}
      </TableCell>
      <TableCell>{Buttons[order.status]}</TableCell>
      <TableCell>
        <Button
          onClick={() => handleCancelOrder()}
          disabled={
            !["pending", "processing"].includes(order.status) || loadingState
          }
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
