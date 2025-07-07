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
import ChapterListCard from './ChapterListCard'

function Header({ course, selectChapter, getContent }) {
    return (
        <div className='lg:hidden flex justify-end items-center lg:p-1 p-3 shadow-sm'>
            <Sheet>
                <SheetTrigger asChild>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-6 hover:cursor-pointer">
                        <path fillRule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                </SheetTrigger>
                <SheetContent className="w-80">
                    <SheetTitle>
                        <VisuallyHidden>Edit Profile</VisuallyHidden>
                    </SheetTitle>
                    {/* <SlideBar /> */}
                    <div className='border border-gray-300 rounded-lg'>
                        <h2 className='font-medium text-lg bg-primary p-3 rounded-tl-lg rounded-tr-lg text-white'>{course?.courseOutput?.CourseName}</h2>
                        <div>
                            {course?.courseOutput?.Chapters?.map((chapter, index) => (
                                <SheetClose asChild>

                                    <div key={index} className={`cursor-pointer hover:bg-purple-50 ${selectChapter == chapter && 'bg-purple-100'}`}
                                        onClick={() => { selectChapter(chapter); getContent(index) }}>
                                        <ChapterListCard chapter={chapter} index={index} />
                                    </div>
                                </SheetClose>
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Header