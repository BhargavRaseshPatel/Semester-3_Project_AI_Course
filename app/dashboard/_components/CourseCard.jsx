import Image from 'next/image'
import React from 'react'
import { IoBookOutline } from "react-icons/io5";
import { FaEllipsisVertical } from "react-icons/fa6";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { chapterContentSchema, CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db.delete(CourseList).where(eq(CourseList.courseId, course?.courseId)).returning({ id: CourseList?.id })
    db.delete(chapterContentSchema).where(eq(chapterContentSchema.courseId, course?.courseId))
    if (resp) {
      refreshData()
    }
  }
  return (
    <div className='sm:none mx-auto sm:w-full w-80 h-full justify-center flex'>
      <div className='shadow-sm w-full rounded-lg flex flex-col gap-1 border border-gray-300 p-2 py-1 cursor-pointer'>
        <Link href={'/course/' + course?.courseId} className='flex justify-center'>
          <Image src={'/courseImage.png'} alt='course banner' priority width={200} height={200}
            className='object-center rounded-lg' />
        </Link>
        <div className='p-2'>
          <h2 className='font-medium text-base flex justify-between items-center'>
            {course?.courseOutput?.Topic} {!displayUser && <DropdownOption handleOnDelete={() => handleOnDelete()}> <FaEllipsisVertical /> </DropdownOption>}
          </h2>

          <p className='text-sm  bg-purple-50 text-primary p-1 my-1 w-fit rounded-md'>{course?.category}</p>
          <div className='flex items-center justify-between'>
            {/* <h2 className='flex gap-2 items-center p-1 bg-purple-50 px-2 rounded-md text-primary text-sm'><IoBookOutline />{course?.courseOutput?.NoOfChapters} chapters</h2> */}
            <h2 className='text-sm text-gray-600 my-1'>{course?.courseOutput?.Level}, {course?.courseOutput?.NoOfChapters} Chapters</h2>
          </div>

          {displayUser && <div className='flex gap-2 items-center'>
            <Image src={course?.userProfileImage} alt='user profile' width={40} height={40} className='rounded-full m-1 ' />
            <h2 className='font-semibold'>{course?.userName}</h2>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default CourseCard