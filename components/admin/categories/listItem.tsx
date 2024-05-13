/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
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

import { Button } from "@/components/ui/button"
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';

interface Props {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

type CatProps = {
    category: Props;
    setSubCategories?: any;
}

const ListItem: React.FC<CatProps> = ({ category, setSubCategories }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpdate = async (id: string) => {
        try {
            const { data } = await axios.put("/api/admin/category", {
                id,
                name
            });
            setSubCategories(data.categories);
            setOpen(false);
            toast.success(data.message)
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    const handleRemove = async (id: string) => {
        try {
            const { data } = await axios.delete("/api/admin/category", {
                data: { id },
            });
            setSubCategories(data.categories);
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <li>
            <Table className=''>
                <TableBody>
                    <TableRow>
                        <TableCell className='m-0 w-[60%] p-0 flex items-start gap-12'>
                            <div className={`w-[22px] h-[22px] rounded-[5px] cursor-pointer border border-borderColor bg-[#f1f1f4]`} />
                            <span>
                                <input
                                    className={open ? "bg-white text-[#111] border-b border-spacing-6 border-borderColor pt-0 outline-none " : "outline-none pb-2"}
                                    type='text'
                                    value={open ? name : category.name}
                                    placeholder='Enter category name'
                                    onChange={(e) => setName(e.target.value)}
                                    ref={inputRef}
                                    disabled={!open}
                                />
                                {open && (
                                    <div className="w-full pt-[10px] flex gap-8 pb-3 underline underline-offset-4 mb-3 ">
                                        <button
                                            className={"styles.btn"}
                                            onClick={() => handleUpdate(category?._id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className={"styles.btn"}
                                            onClick={() => {
                                                setOpen(false);
                                                setName("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </span>
                        </TableCell>
                        <TableCell className='pl-0 w-[20%]'>
                            {category?.name}
                        </TableCell>
                        <TableCell className='w-[20%] p-0'>
                            <div className="flex items-center gap-2">
                                {!open && (
                                    <AiTwotoneEdit
                                        onClick={() => {
                                            setOpen((prev) => !prev);
                                            inputRef?.current?.focus();
                                        }}
                                    />
                                )}
                                <div className="">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button>
                                                <AiFillDelete />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-white'>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete
                                                    the category from your collection.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleRemove(category._id)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    {/* <AiFillDelete onClick={() => handleRemove(category._id)} /> */}

                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </li>

    )
}


export default ListItem