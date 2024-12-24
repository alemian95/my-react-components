import type { Table } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { PaginationItem, PaginationLink } from "~/components/ui/pagination"

export function PaginationTable<T>(props : {
    table : Table<T>
    paginationItemsCount? : number
    page: number
    onPageChange: (newPage: number) => void
}) {
    const [ pagination, setPagination ] = useState<number[]>([])

    useEffect(() => {

        setPagination(genPaginationArray(props.table.getState().pagination.pageIndex, props.table.getPageCount()))

    }, [props.table, props.page])

    function genPaginationArray(currentPage: number, totalPages: number, paginationItemsCount: number = 5): number[] {
        totalPages--;
        const arr: number[] = [];

        const halfItemsCount = Math.floor(paginationItemsCount / 2);

        let minPage = currentPage - halfItemsCount;
        if (minPage < 0) minPage = 0;

        let maxPage = currentPage + halfItemsCount;
        if (maxPage > totalPages) maxPage = totalPages;

        if (maxPage - minPage < paginationItemsCount - 1) {
            if (minPage === 0) {
                maxPage = Math.min(minPage + paginationItemsCount - 1, totalPages);
            } else if (maxPage === totalPages) {
                minPage = Math.max(totalPages - (paginationItemsCount - 1), 0);
            }
        }

        for (let i = minPage; i <= maxPage; i++) {
            arr.push(i);
        }

        return arr;
    }

    return (
        pagination.map((e) => {
            return (
                <PaginationItem key={e+1} onClick={() => props.onPageChange(e)}>
                    <PaginationLink href="#" isActive={props.table.getState().pagination.pageIndex === e}>{e+1}</PaginationLink>
                </PaginationItem>
            )
        })
    )
}
