import { getMonthRevenue } from "@/api/metrics";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import BaseCard from "./base-card";

export default function MonthRevenueCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenue,
  });

  return (
    <BaseCard title="Receita total (mês)" icon={DollarSign}>
      <span className="text-2xl font-bold tracking-tight">
        {!data || isLoading ? (
          <Skeleton className="h-6 w-10" />
        ) : (
          formatCurrency(data.receipt / 100)
        )}
      </span>
      {!data || isLoading ? (
        <Skeleton className="h-4 w-full" />
      ) : (
        <p className="text-xs text-muted-foreground">
          <span
            className={cn({
              "text-rose-500 dark:text-rose-400": data.diffFromLastMonth < 0,
              "text-emerald-500 dark:text-emerald-400":
                data.diffFromLastMonth > 0,
            })}
          >
            {data.diffFromLastMonth.toLocaleString("pt-BR")}%
          </span>{" "}
          em relação ao mês passado
        </p>
      )}
    </BaseCard>
  );
}
