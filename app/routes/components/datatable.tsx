import { WebLayout } from "~/layouts/WebLayout";
import type { Route } from "../+types/home";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { SortableColumnHeader } from "~/components/components/datatable/headers/SortableColumnHeader";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/components/datatable/Datatable";
import { useEffect, useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { QrCode } from "lucide-react";
import { Link } from "react-router";
import { GitHubIcon } from "~/components/icons/github";

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

    const [ rows, setRows ] = useState<Product[]>([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState<string|null>(null)

    useEffect(() => {
        fetch("https://dummyjson.com/products")
        .then(response => {
            if (! response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }
            return response.json()
        })
        .then(json => {
            setError(null)
            setRows(json.products)
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
                <div className="text-sm">{row.original.id}</div>
            ),
        },
        {
            accessorKey: "title",
            header: ({ column }) => <SortableColumnHeader column={column} label="Title" />,
            cell: ({ row }) => (
                <div className="text-sm">{row.original.title}</div>
            ),
        },
        // {
        //     accessorKey: "description",
        //     header: ({ column }) => <SortableColumnHeader column={column} label="Description" />,
        //     cell: ({ row }) => (
        //         <div>{row.original.description}</div>
        //     ),
        // },
        {
            accessorKey: "dimensions",
            header: ({ column }) => <SortableColumnHeader column={column} label="Dimensions" />,
            cell: ({ row }) => {
                const { width, height, depth } = row.original.dimensions;
                return <div className="text-sm">{`${width} x ${height} x ${depth}`}</div>;
            },
        },
        {
            accessorKey: "meta.qrCode",
            header: ({ column }) => <SortableColumnHeader column={column} label="QR Code" />,
            cell: ({ row }) => (
                <Dialog>
                    <DialogTrigger><QrCode /></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Scan the qrCode</DialogTitle>
                        </DialogHeader>
                        <img src={row.original.meta.qrCode} alt="QR Code" className="mx-auto my-8" />
                    </DialogContent>
                </Dialog>

            ),
        },
        {
            accessorKey: "reviews",
            header: ({ column }) => <SortableColumnHeader column={column} label="Average Rating" />,
            cell: ({ row }) => {
                const reviews = row.original.reviews;
                const averageRating =
                    reviews.length > 0
                        ? (reviews.reduce((sum: any, review: { rating: any; }) => sum + review.rating, 0) / reviews.length).toFixed(1)
                        : "N/A";
                return <div className="text-sm">{averageRating}/5</div>;
            },
        },
        {
            accessorKey: "thumbnail",
            header: ({ column }) => <SortableColumnHeader column={column} label="Thumbnail" />,
            cell: ({ row }) => (
                <div>
                    <img src={row.original.thumbnail} alt="Thumbnail" className="max-w-16" />
                </div>
            ),
        },
        {
            accessorKey: "category",
            header: ({ column }) => <SortableColumnHeader column={column} label="Category" />,
            cell: ({ row }) => <div className="text-sm">{row.original.category}</div>,
        },
        {
            accessorKey: "price",
            header: ({ column }) => <SortableColumnHeader column={column} label="Price" />,
            cell: ({ row }) => <div className="text-sm">{`$${row.original.price.toFixed(2)}`}</div>,
        },
        {
            accessorKey: "discountPercentage",
            header: ({ column }) => <SortableColumnHeader column={column} label="Discount %" />,
            cell: ({ row }) => <div className="text-sm">{`${row.original.discountPercentage}%`}</div>,
        },
        {
            accessorKey: "rating",
            header: ({ column }) => <SortableColumnHeader column={column} label="Rating" />,
            cell: ({ row }) => <div className="text-sm">{row.original.rating}</div>,
        },
        {
            accessorKey: "stock",
            header: ({ column }) => <SortableColumnHeader column={column} label="Stock" />,
            cell: ({ row }) => <div className="text-sm">{row.original.stock}</div>,
        },
        // {
        //     accessorKey: "tags",
        //     header: ({ column }) => <SortableColumnHeader column={column} label="Tags" />,
        //     cell: ({ row }) => <div>{row.original.tags.join(", ")}</div>,
        // },
        {
            accessorKey: "brand",
            header: ({ column }) => <SortableColumnHeader column={column} label="Brand" />,
            cell: ({ row }) => <div className="text-sm">{row.original.brand}</div>,
        },
        {
            accessorKey: "sku",
            header: ({ column }) => <SortableColumnHeader column={column} label="SKU" />,
            cell: ({ row }) => <div className="text-sm">{row.original.sku}</div>,
        },
        {
            accessorKey: "weight",
            header: ({ column }) => <SortableColumnHeader column={column} label="Weight" />,
            cell: ({ row }) => <div className="text-sm">{`${row.original.weight} kg`}</div>,
        },
        {
            accessorKey: "warrantyInformation",
            header: ({ column }) => <SortableColumnHeader column={column} label="Warranty" />,
            cell: ({ row }) => <div className="text-sm">{row.original.warrantyInformation}</div>,
        },
        {
            accessorKey: "shippingInformation",
            header: ({ column }) => <SortableColumnHeader column={column} label="Shipping Info" />,
            cell: ({ row }) => <div className="text-sm">{row.original.shippingInformation}</div>,
        },
        // {
        //     accessorKey: "availabilityStatus",
        //     header: ({ column }) => <SortableColumnHeader column={column} label="Availability" />,
        //     cell: ({ row }) => <div>{row.original.availabilityStatus}</div>,
        // },
        {
            accessorKey: "returnPolicy",
            header: ({ column }) => <SortableColumnHeader column={column} label="Return Policy" />,
            cell: ({ row }) => <div className="text-sm">{row.original.returnPolicy}</div>,
        },
    ]
    

    return (
        <WebLayout>
            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center"><span>Datatable</span><Link to={"https://github.com/alemian95/my-react-components/blob/master/app/components/components/datatable/Datatable.tsx"} target="_blank"><GitHubIcon className="w-6" /></Link></CardTitle>
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

interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: number
    dimensions: Dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: Meta
    images: string[]
    thumbnail: string
}

interface Dimensions {
    width: number
    height: number
    depth: number
}

interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

interface Meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}
