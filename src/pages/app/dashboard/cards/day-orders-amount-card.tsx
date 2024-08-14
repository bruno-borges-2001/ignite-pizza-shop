import { getDayOrdersAmount } from "@/api/metrics";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import BaseCard from "./base-card";

export default function DayOrdersAmountCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDayOrdersAmount,
  });

  return (
    <BaseCard title="Pedidos (dia)" icon={Utensils}>
      <span className="text-2xl font-bold tracking-tight">
        {!data || isLoading ? (
          <Skeleton className="h-6 w-10" />
        ) : (
          data.amount.toLocaleString("pt-BR")
        )}
      </span>
      {!data || isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <p className="text-xs text-muted-foreground">
          <span
            className={cn({
              "text-rose-500 dark:text-rose-400": data.diffFromYesterday < 0,
              "text-emerald-500 dark:text-emerald-400":
                data.diffFromYesterday > 0,
            })}
          >
            {data.diffFromYesterday.toLocaleString("pt-BR", {
              signDisplay: "always",
            })}
            %
          </span>{" "}
          em relação à ontem
        </p>
      )}
    </BaseCard>
  );
}
