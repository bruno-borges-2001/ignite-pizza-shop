import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";

interface PaginationProps {
  pageIndex: number;
  perPage: number;
  totalCount: number;
}

export default function Pagination({
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) {
  const [, setSearchParams] = useSearchParams();

  const pages = Math.ceil(totalCount / perPage);

  return (
    <div className="flex items-center justify-between">
      <span>Total de {totalCount} item(ns)</span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("p", "1");
                return prev;
              })
            }
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex === 0}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set(
                  "p",
                  String(Math.max(1, Number(prev.get("p") ?? "0") - 1)),
                );
                return prev;
              })
            }
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex + 1 === pages}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set(
                  "p",
                  String(Math.min(pages, Number(prev.get("p") ?? "0") + 1)),
                );
                return prev;
              })
            }
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pageIndex + 1 === pages}
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("p", String(pages));
                return prev;
              })
            }
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
