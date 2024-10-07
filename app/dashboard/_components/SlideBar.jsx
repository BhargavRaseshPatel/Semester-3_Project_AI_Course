"use client";
import Image from 'next/image'
import React, { useContext } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { HiCircleStack } from "react-icons/hi2";
import { GoShieldCheck } from "react-icons/go";
import { CiPower } from "react-icons/ci";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from '@/app/_context/UserCourseList'; 

function SlideBar() {
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
        <div className='fixed h-full md:w-64 p-5 shadow-md'>
            <Image src={'/logo.png'} width={160} height={50} />
            <hr></hr>

            <ul>
                {Menu.map((item, map) => (
                    <Link href={item.path} key={map}>
                        <div className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer  mb-2
                 hover:bg-gray-100 hover:text-black rounded-lg ${item.path == path && 'bg-gray-100 text-black'}`}>
                            <div className='text-2xl'>{item.icon}</div>
                            <h2>{item.name} </h2>
                        </div>
                    </Link>
                ))}
            </ul>
            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={userCourseList?.length/15 * 100} max={100} />
                <h3>{userCourseList?.length} out of 5 course created</h3>
                <h2 className='text-xs text-gray-500'>upgrade your plan for unlimited course generate</h2>
            </div>
        </div>
    )
}

export default SlideBar