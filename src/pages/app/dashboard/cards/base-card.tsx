import type { IconType } from "@/@types/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

interface BaseCardProps {
  title: string;
  icon: IconType;
}

export default function BaseCard({
  title,
  icon: Icon,
  children,
}: PropsWithChildren<BaseCardProps>) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">{children}</CardContent>
    </Card>
  );
}
