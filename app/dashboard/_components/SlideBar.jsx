"use client";
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { HiCircleStack } from "react-icons/hi2";
import { GoShieldCheck } from "react-icons/go";
import { CiPower } from "react-icons/ci";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from '@/app/_context/UserCourseList';

function SlideBar({showShadow = false}) {

    // Get all courses created by the user
    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext)
    const Menu = [
        {
            id: 1,
            name: 'Home',
            icon: <IoHomeOutline />,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Explore',
            icon: <HiCircleStack />,
            path: '/dashboard/explore'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: <GoShieldCheck />,
            path: '/dashboard/upgrade'
        },
        {
            id: 4,
            name: 'Log Out',
            icon: <CiPower />,
            path: '/dashboard/logout'
        }

    ]
    const path = usePathname()
    return (
        <div className={`fixed h-full md:w-64 p-5 ${showShadow ? "shadow-xl" : " mt-4"}`}>
            <div className='flex items-center gap-2 rounded-lg '>
                <Image src={'/ai-course-create.png'} width={200} height={50} alt="logo image" className='mb-10 w-full rounded-lg' />
            </div>
            <ul>
                {Menu.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div key={index} className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer  mb-2
                 hover:bg-gray-100 hover:text-black rounded-lg ${item.path == path && 'bg-gray-100 text-black'}`}>
                            <div className='text-2xl'>{item.icon}</div>
                            <h2>{item.name} </h2>
                        </div>
                    </Link>
                ))}
            </ul>
            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={userCourseList?.length / 10 * 100} max={100} />
                <h3>{userCourseList?.length} out of 10 course created</h3>
                <h2 className='text-xs text-gray-500'>upgrade your plan for unlimited course generate</h2>
            </div>
        </div>
    )
}

export default SlideBar