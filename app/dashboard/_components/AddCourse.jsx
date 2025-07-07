"use client";
import { UserCourseListContext } from '@/app/_context/UserCourseList';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useContext } from 'react'

function AddCourse() {
    const { user } = useUser()
    const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)

    return (
        <div className='grid md:grid-cols-3  sm:grid-cols-1 w-full items-center'>
            <div className='md:col-span-2 col-span-1'>
                <h2 className='text-2xl'>Hello,
                    <span className='font-bold'>{user?.fullName}</span></h2>
                <p className='text-sm text-gray-500'>Create new course with AI, Share with friends and family</p>
            </div>

            <Link className='md:mt-0 mt-3 w-fit' href={ userCourseList?.length >= 15 ? '/dashboard/upgrad' : '/create-course' }>
                <Button className='text-xl md:w-fit p-5 h-10 w-full'>+ Create AI course</Button>
            </Link>
        </div>
    )
}

export default AddCourse