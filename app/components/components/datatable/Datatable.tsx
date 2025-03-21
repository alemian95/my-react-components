import { DoubleArrowLeftIcon, DoubleArrowRightIcon, DropdownMenuIcon } from "@radix-ui/react-icons"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from "@tanstack/react-table"
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Pagination, PaginationContent, PaginationItem } from "~/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { PaginationTable } from "./pagination/PaginationTable"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Spinner } from "../ui/spinner"
import { ErrorBanner } from "../ui/error"

export type DataTableProps<T> = {
    data: T[]
    columns: ColumnDef<T>[]
    enableColumnsSelection?: boolean
    enableRowsSelection?: boolean
    enableFilter?: boolean
    isLoading: boolean
    error: string | null
    enablePagination?: boolean
    pageSize?: number
}

export function DataTable<T>(props: DataTableProps<T>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState<any>([]);

    const data = props.data
    const columns = props.columns
    const [currentPage, setCurrentPage] = useState(0)

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'auto',
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            globalFilter,
            pagination: {
                pageIndex: currentPage,
                pageSize: props.enablePagination && props.pageSize ? props.pageSize : Number.MAX_SAFE_INTEGER
            }
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {
                    props.enableFilter
                    &&
                    <Input
                        placeholder={`Filter`}
                        value={globalFilter ?? ''}
                        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                        className="max-w-sm"
                    />
                }
                {
                    props.enableColumnsSelection
                    &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDownIcon className="ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column: any) => column.getCanHide())
                                .map((column: any) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value: any) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>
            <div className="border rounded">
                <Table>
                    <TableHeader className="bg-background">
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    return (
                                        <TableHead key={header.id} className="text-neutral-400 font-semibold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowCount() > 0
                                ?
                                (
                                    table.getRowModel().rows.map((row: any) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell: any) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )
                                :
                                (
                                    props.isLoading
                                        ?
                                        <tr><td className="flex justify-center py-2"><Spinner /></td></tr>
                                        :
                                        props.error
                                            ?
                                            <ErrorBanner message={props.error} />
                                            :
                                            <TableRow>
                                                <TableCell
                                                    colSpan={columns.length}
                                                    className="h-24 text-center"
                                                >
                                                    No results
                                                </TableCell>
                                            </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {
                    props.enableRowsSelection
                    &&
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} items selected.
                    </div>
                }
                {
                    props.enablePagination
                    &&
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        onClick={() => setCurrentPage(0)}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <DoubleArrowLeftIcon className="mr-1" />
                                        Prima
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <ChevronLeft className="mr-1 w-4 h-4" />
                                        Precedente
                                    </Button>
                                </PaginationItem>
                                <PaginationTable page={currentPage} onPageChange={setCurrentPage} table={table} />
                                <PaginationItem>
                                    <Button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        Successiva
                                        <ChevronRight className="ml-1 w-4 h-4" />
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button
                                        onClick={() => setCurrentPage(table.getPageCount() - 1)}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        Ultima
                                        <DoubleArrowRightIcon className="ml-1" />
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                }
            </div>
        </div>
    )
}
