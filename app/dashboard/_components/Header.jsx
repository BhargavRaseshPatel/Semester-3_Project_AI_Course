import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SlideBar from './SlideBar'

function Header() {
    return (
        <div className='flex justify-end items-center lg:p-1 p-3 shadow-sm'>
            {/* <Image src={'/ai-course-create.png'} alt='no image' width={200} height={100} /> */}
            <div className='lg:block hidden'>
                <UserButton />
            </div>
            <div className='lg:hidden block'>
                <Sheet>
                    <SheetTrigger asChild>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6 hover:cursor-pointer">
                            <path fillRule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </SheetTrigger>
                    <SheetContent className="w-72 m-0 p-0">
                        <SheetTitle>
                            <VisuallyHidden>Edit Profile</VisuallyHidden>
                        </SheetTitle>
                        <SlideBar />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default Header