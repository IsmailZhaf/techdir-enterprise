import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { Dispatch, SetStateAction } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface DataTableProps<TData extends Employee, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount: number;
    page: number;
    onPageChange: Dispatch<SetStateAction<number>>;
}

export function DataTable<TData extends Employee, TValue>({ columns, data, pageCount, page, onPageChange }: DataTableProps<TData, TValue>) {
    const navigate = useNavigate();
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount,
    });

    const handleRowClick = (employee: Employee) => {
        navigate(`/employees/${employee.id}`);
    };

    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];
        if (pageCount <= 5) {
            return Array.from({ length: pageCount }, (_, i) => i);
        }
        pages.push(0);
        if (page > 1) pages.push("ellipsis");
        for (let i = Math.max(1, page - 1); i <= Math.min(pageCount - 2, page + 1); i++) {
            pages.push(i);
        }
        if (page < pageCount - 3) pages.push("ellipsis");
        pages.push(pageCount - 1);
        return pages;
    };

    return (
        <div className="overflow-hidden rounded-md">
            <Table>
                <TableHeader className="bg-[#f8f9ff]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="bg-white">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow className="hover:cursor-pointer border-b-0" onClick={() => handleRowClick(row.original)} key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between px-2 md:px-4 py-2">
                <p className="text-xs">
                    <span className="text-gray-500">Halaman</span> <b>{page + 1}</b> <span className="text-gray-500">dari</span> <b>{pageCount}</b>
                </p>

                <Pagination className="w-auto mx-0">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious text=" " onClick={() => onPageChange((prev) => prev - 1)} aria-disabled={page === 0} className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                        </PaginationItem>

                        {getPageNumbers().map((p, i) =>
                            p === "ellipsis" ? (
                                <PaginationItem key={`ellipsis-${i}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={p}>
                                    <PaginationLink isActive={p === page} onClick={() => onPageChange(p)} className={`${p === page ? "bg-primary text-white" : ""} rounded cursor-pointer`}>
                                        {p + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ),
                        )}

                        <PaginationItem>
                            <PaginationNext text=" " onClick={() => onPageChange((prev) => prev + 1)} aria-disabled={page + 1 >= pageCount} className={page + 1 >= pageCount ? "pointer-events-none opacity-50" : "cursor-pointer"} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
