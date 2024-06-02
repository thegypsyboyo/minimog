/* eslint-disable no-plusplus */
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    // PaginationNext,
    // PaginationPnavrevious,
} from "@/components/ui/pagination"
// import { ChevronRight } from "lucide-react";

import React, { useState } from 'react'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import UserList from "./userList";

const Users = ({ users }: any) => {

    const [currentPage, setCurrentPage] = useState<number>(1);

    const pageSize = 2;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * pageSize;
    const currentPageItems = users.slice(startIndex, startIndex + pageSize);

    // Calculate total number of pages
    const totalPages = Math.ceil(users.length / pageSize);
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <PaginationItem key={i}>
                <PaginationLink isActive={i === currentPage} onClick={() => handlePageChange(i)} className='cursor-pointer outline-none border-borderColor text-blue-600 rounded-full'>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (

        <div className="bg-white pb-8">
            <div className="">
                <UserList users={currentPageItems} />
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <button
                            className={`${currentPage === 1 ? "!cursor-not-allowed text-gray-400 mr-6" : ""} cursor-pointer flex items-center text-sm uppercase gap-2`}
                            // href=""
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            <span className="text-xs">Previous</span>
                            <BsChevronLeft />
                        </button>
                    </PaginationItem>

                    {paginationItems}

                    <PaginationItem>
                        <button
                            className={`${currentPage === totalPages ? "!cursor-not-allowed text-gray-400" : ""} cursor-pointer outline-none ml-5 flex items-center gap-3 text-sm`}
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            aria-disabled="true" type='button'
                        >
                            <span className="uppercase text-xs">Next</span>
                            <BsChevronRight className="text-xs" />
                        </button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}

export default Users