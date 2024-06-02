/* eslint-disable no-underscore-dangle */
import Image from 'next/image';
import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// import { Button } from '@mui/material';
// import { AiFillDelete } from 'react-icons/ai';

interface MediaProps {
    url: string;
    public_url: string;
}

interface HeaderProps {
    // title: string;
    // description: string,
    title: { en: "", fr: "" },
    description: { en: "", fr: "" },
    images: MediaProps[],
    alt: string,
    video?: MediaProps[] | [],
    url: string,
    _id: string
}

type HeaderTypes = {
    header: HeaderProps;
    setHeaders: any
}
const ListDisplay: React.FC<HeaderTypes> = ({ header, setHeaders }) => {
    const router = useRouter()
    const handleEdit = () => {
        // Redirect to the CreateHeader page with the header ID in the URL
        window.location.href = `/admin/dashboard/home/header?headerId=${header._id}`;
    };

    const handleRemove = async (id: string) => {
        try {
            const { data } = await axios.delete("/api/admin/home/header", {
                data: { id },
            });
            setHeaders(data.categories);
            toast.success(data.message);
            router.reload()
        } catch (error: any) {
            toast.error(error.response.data.message)
        }

    }
    return (

        <Table>
            <TableBody>
                <TableRow className='flex items-center my-6 overflow-x-auto cursor-pointer' >
                    <TableCell className='m-0 w-[50%] p-0 pr-4 flex items-center gap-8'>
                        <div className={`w-[22px] h-[22px] rounded-[5px] cursor-pointer border border-borderColor bg-[#f1f1f4]`} />
                        <div className="w-fit flex items-center  gap-5">
                            {header?.video?.length === 1 ? (
                                <div className="w-[220px] h-[100px] relative bg-yellow-600">
                                    {header?.video.map((vid, index) => (
                                        <video autoPlay loop typeof="video/mp4" src={vid.url} className='h-full object-cover w-full absolute top-0 left-0 bottom-0 right-0' key={index} />
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    {header?.images?.map((img, index) => (
                                        <div className="flex gap-8 w-[220px] h-[100px] relative overflow-hidden" key={index}>
                                            <Image
                                                src={img.url}
                                                width={1400}
                                                height={1400}
                                                alt='main-image'
                                                className='absolute left-0 right-0 bottom-0 top-0'
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TableCell>
                    <TableCell className='pl-0 w-[25%]'>
                        <span className='font-medium capitalize'>{header.title.en}</span>
                    </TableCell>
                    <TableCell className='w-[10%] p-0'>
                        <span className="bg-[#dfffea] text-[#17c653] py-[5px] px-[7px] rounded-[3px]">Published</span>
                    </TableCell>
                    <TableCell className='w-[15%] p-0 z-50'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="w-full outline-none bg-[#f9f9f9] border border-[#f9f9f9] py-[5px] px-[7px]">
                                    Your actions
                                    <span className="sr-only">Your actions</span>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialog>
                            <AlertDialogTrigger asChild className='cursor-pointer'>
                                <span>Delete</span>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='bg-white'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete
                                        <span className='px-2 text-red-600'>( {header.title.en} )</span> header from your collection.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleRemove(header._id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}

export default ListDisplay