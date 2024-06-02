/* eslint-disable no-unused-vars */
import React from 'react'
import Image from "next/image"
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

const UserList = ({ users }: any) => {

    const pageSize = 2;
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const startIndex = (currentPage - 1) * pageSize;
    // const currentPageItems = users.slice(startIndex, startIndex + pageSize);

    // // Calculate total number of pages
    // const totalPages = Math.ceil(users.length / pageSize);
    return (
        <div className='bg-white p-5 rounded-[7px] w-full'>
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
                            <Button size="sm" variant="outline" className="h-7 gap-1">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            {/* <Button size="sm" className="h-7 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Product
                                </span>
                            </Button>  */}
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader className='w-full'>
                                <CardTitle>Your Active Users</CardTitle>
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
                                            {/* <TableHead>Price</TableHead> */}
                                            <TableHead className="hidden md:table-cell">
                                                Email
                                            </TableHead>
                                            {/* <TableHead className="hidden md:table-cell">
                                                Created at
                                            </TableHead> */}
                                            <TableHead>
                                                <span className="">Your Actions</span>
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users?.map((user: any, index: any) => (
                                            <TableRow key={index}>

                                                <TableCell className="hidden sm:table-cell" >
                                                    {user.image ? (
                                                        <Image
                                                            alt="user image"
                                                            className="aspect-square rounded-full object-cover border-solid border-[2px] border-borderColor "
                                                            height="64"
                                                            src={user.image}
                                                            width="64"
                                                        />

                                                    ) : (
                                                        <div className="w-10 flex items-center justify-center h-10 uppercase text-white rounded-full bg-blue-600">
                                                            {user.name.charAt(0)}{user.name.charAt(user.name.length - 1)}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium max-w-[200px]">
                                                    {user.name.length > 35 ? `${user.name.substring(0, 28)} ...` : `${user.name}`}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Draft</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                {/* <TableCell className="hidden md:table-cell">
                                                </TableCell> */}
                                                {/* <TableCell className="hidden md:table-cell">
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
                                                </TableCell> */}
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

export default UserList