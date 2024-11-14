import usePagination from "@/app/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface QueryPaginationProps {
  totalPages: number;
  page: number;
}

const QueryPagination = ({ totalPages, page }: QueryPaginationProps) => {
  const paginationRange = usePagination({ totalPages, page });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${page - 1}`}
            className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>
        {paginationRange.map((item, index) => {
          if (item === null) {
            return <PaginationEllipsis key={index} />;
          }
          return (
            <PaginationItem key={index}>
              <PaginationLink href={`?page=${item}`} isActive={page === item}>
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={`?page=${page + 1}`}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default QueryPagination;
