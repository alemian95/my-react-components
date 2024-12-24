import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"
import { type Column } from "@tanstack/react-table"

export function SortableColumnHeader<T>(props: {
    column: Column<T, unknown>
    label: string
    className?: string
}) {
    return (
        <div className={`${'flex gap-1 items-center cursor-pointer'} ${props.className}`}
            onClick={() => props.column.toggleSorting(props.column.getIsSorted() === "asc")}
        >
            {props.label}
            {props.column.getIsSorted() === "asc" && <CaretDownIcon />}
            {props.column.getIsSorted() === "desc" && <CaretUpIcon />}
        </div>
    )
}
