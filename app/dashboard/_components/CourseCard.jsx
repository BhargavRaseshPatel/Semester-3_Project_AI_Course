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
    <div className='shadow-sm rounded-lg flex flex-col gap-1 border p-2 cursor-pointer mt-4'>
      <Link href={'/course/' + course?.courseId}>
        <Image src={'/courseImage.png'} alt='course banner' priority width={250} height={250}
          className='object-center rounded-lg' /></Link>
      <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>
          {course?.courseOutput?.CourseName} {!displayUser && <DropdownOption handleOnDelete={() => handleOnDelete()}> <FaEllipsisVertical /> </DropdownOption>}
          </h2>

        <p className='text-sm text-gray-600 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-50 px-2 rounded-md text-primary text-sm'><IoBookOutline />{course?.courseOutput?.NoOfChapters} chapters</h2>
          <h2 className='text-sm bg-purple-50 text-primary p-1 px-2 rounded-md'>{course?.courseOutput?.Level}</h2>
        </div>

        {displayUser && <div className='flex gap-2 items-center'>
          <Image src={course?.userProfileImage} alt='user profile' width={40} height={40} className='rounded-full m-1 ' />
          <h2 className='font-semibold'>{course?.userName}</h2>
        </div>}
      </div>
    </div>
  )
}

export default CourseCard