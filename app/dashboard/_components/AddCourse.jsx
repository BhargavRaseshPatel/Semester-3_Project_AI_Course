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
        <div className='flex w-full items-center justify-between'>
            <div>
                <h2 className='text-2xl'>Hello,
                    <span className='font-bold'>{user?.fullName}</span></h2>
                <p className='text-sm text-gray-500'>Create new course with AI, Share with friends and family</p>
            </div>

            <Link href={ userCourseList?.length >= 15 ? '/dashboard/upgrad' : '/create-course' }>
                <Button className='text-xl pb-3 pt-3'>+ Create AI course</Button>
            </Link>
        </div>
    )
}

export default AddCourse