/* eslint-disable no-shadow */
import React from 'react'
import Image from "next/image"

import { useExport } from '@/hooks/useExport'
// import Link from "next/link"
import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FaPrint } from 'react-icons/fa'
import Link from 'next/link'

const Products = ({ products }: any) => {
    const { printProducts, exportAsPDF, exportAsWord, exportAsImage } = useExport();
    return (
        <div className='bg-white p-5 rounded-[7px] w-full' id='products'>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="draft">Draft</TabsTrigger>
                            <TabsTrigger value="archived" className="hidden sm:flex">
                                Archived
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-7 gap-1">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filter
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Active
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Archived
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                size="sm" variant="outline" type='button' className="h-7 gap-1"
                                onClick={() => printProducts()}
                            >
                                <FaPrint className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Print
                                </span>
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-7 gap-1">
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Export Options
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-white rounded-[7px] px-0 ">
                                    <DialogHeader className='w-full px-5 pb-3 border-b border-b-[#ccc]'>
                                        <DialogTitle>Your export options</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="w-full flex items-start gap-6 flex-col px-5">
                                            <button
                                                onClick={() => exportAsPDF('products')}
                                            >
                                                Export as PDF
                                            </button>
                                            <button
                                                onClick={() => exportAsWord('products')}
                                            >
                                                Export as Word
                                            </button>
                                            <button
                                                onClick={() => exportAsImage('products')}
                                            >
                                                Export as Image
                                            </button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button size="sm" className="h-7 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    <Link href={"/admin/dashboard/product/create"}>
                                        Add Product
                                    </Link>
                                </span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader className='w-full'>
                                <CardTitle>Products</CardTitle>
                                <CardDescription>
                                    Manage your products and view their sales performance.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table className='overflow-x-auto w-full'>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                                <span className="">Image</span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Total Sales
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Created at
                                            </TableHead>
                                            <TableHead>
                                                <span className="">Your Actions</span>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products?.map((product: any, index: any) => (
                                            <TableRow key={index}>

                                                <TableCell className="hidden sm:table-cell" >
                                                    <Image
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src={product.subProducts[0].images[0].url}
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium max-w-[200px]">
                                                    {product.name.length > 35 ? `${product.name.substring(0, 28)} ...` : `${product.name}`}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Draft</Badge>
                                                </TableCell>
                                                <TableCell>${product.subProducts[0].sizes[0].price}</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {product.subProducts[0].sizes[0].qty}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {/* 2023-07-12 10:42 AM */}
                                                    {new Date(product.createdAt).toLocaleString("en-Us", {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        second: "numeric",
                                                        // timeZoneName: "short"
                                                    })}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className='bg-white'>
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <div className="text-xs text-muted-foreground">
                                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                    products
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

export default Products