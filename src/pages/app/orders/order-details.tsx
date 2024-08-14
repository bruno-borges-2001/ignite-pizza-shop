import { getDetails } from "@/api/orders";
import { OrderStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useState } from "react";

interface OrderDetailsProps {
  orderId: string;
}

export default function OrderDetails({ orderId }: OrderDetailsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading } = useQuery({
    enabled: dialogOpen,
    queryKey: ["get-order-details", orderId],
    queryFn: () => getDetails(orderId),
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80dvh] flex-col">
        <DialogHeader>
          <DialogTitle>Pedido #{orderId}</DialogTitle>
          <DialogDescription>Detalhes do pedido</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 overflow-auto">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex items-center justify-end">
                  {!data || isLoading ? (
                    <Skeleton className="h-4 w-[80px]" />
                  ) : (
                    <OrderStatus status={data.status} />
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex items-center justify-end">
                  {!data || isLoading ? (
                    <Skeleton className="h-4 w-[100px]" />
                  ) : (
                    data.customer.name
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex items-center justify-end">
                  {!data || isLoading ? (
                    <Skeleton className="h-4 w-[80px]" />
                  ) : (
                    (data.customer.phone ?? "Não informado")
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex items-center justify-end">
                  {!data || isLoading ? (
                    <Skeleton className="h-4 w-[120px]" />
                  ) : (
                    data.customer.email
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex items-center justify-end">
                  {!data || isLoading ? (
                    <Skeleton className="h-4 w-[60px]" />
                  ) : (
                    dayjs(data.createdAt).fromNow()
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow>
                    <TableCell className="p-0" colSpan={4}>
                      <Skeleton className="h-[50px] w-full rounded-none" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-0" colSpan={4}>
                      <Skeleton className="h-[50px] w-full rounded-none" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="p-0" colSpan={4}>
                      <Skeleton className="h-[50px] w-full rounded-none" />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                data?.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.priceInCents / 100)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        (item.quantity * item.priceInCents) / 100,
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {!data || isLoading ? (
                    <Skeleton className="h-4 w-[60px]" />
                  ) : (
                    formatCurrency(data.totalInCents / 100)
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
