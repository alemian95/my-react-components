import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { SortableColumnHeader } from "~/components/components/datatable/headers/SortableColumnHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/components/datatable/Datatable";
import { useEffect, useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";

export function meta({}: Route.MetaArgs) {
    return [
        { title: `${import.meta.env.VITE_APP_NAME} - React Datatable` },
        {
            name: "description",
            content: "My React components - React Datatable",
        },
    ];
}

export default function DatatablePage() {

    const [ rows, setRows ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState<string|null>(null)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos")
        .then(response => {
            if (! response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            return response.json()
        })
        .then(json => {
            setError(null)
            setRows(json)
        })
        .catch((err: TypeError) => {
            setError(err.message)
        })
        .finally(() => setLoading(false))
    }, [])

    const columns: ColumnDef<any>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => <SortableColumnHeader column={column} label="ID" />,
            cell: ({ row }) => (
                <div>{row.original.id}</div>
            ),
        },
        {
            accessorKey: "albumId",
            header: ({ column }) => <SortableColumnHeader column={column} label="Album" />,
            cell: ({ row }) => (
                <div>{row.original.albumId}</div>
            ),
        },
        {
            accessorKey: "title",
            header: ({ column }) => <SortableColumnHeader column={column} label="Title" />,
            cell: ({ row }) => (
                <div>{row.original.title}</div>
            ),
        },
        {
            accessorKey: "thumbnailUrl",
            header: ({ column }) => <SortableColumnHeader column={column} label="Anteprima" />,
            cell: ({ row }) => (
                <div><img src={row.original.thumbnailUrl} alt="anteprima"/></div>
            ),
        },
        {
            accessorKey: "url",
            header: ({ column }) => <SortableColumnHeader column={column} label="Immagine" />,
            cell: ({ row }) => (
                <div><a target="_blank" href={row.original.url}>Apri immagine</a></div>
            ),
        },
    ]
    

    return (
        <WebLayout>
            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle>Datatable</CardTitle>
                    <CardDescription>
                        React Datatable
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={rows}
                        columns={columns}
                        enableColumnsSelection={true}
                        enableRowsSelection={true}
                        enableTextFilter="title"
                        isLoading={loading}
                        error={error}
                        pageSize={10}
                        enablePagination={true}
                    />
                </CardContent>
            </Card>
        </WebLayout>
    );
}
