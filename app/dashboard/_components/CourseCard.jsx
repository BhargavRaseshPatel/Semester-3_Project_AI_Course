import Image from 'next/image'
import React from 'react'
import { IoBookOutline } from "react-icons/io5";
import { FaEllipsisVertical } from "react-icons/fa6";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CourseCard({ course, refreshData }) {
  const handleOnDelete = async () => {
    const resp = await db.delete(CourseList).where(eq(CourseList.courseId, course?.courseId)).returning({ id: CourseList?.id })

    if (resp) {
      refreshData()
    }
  }
  return (
    <div className='shadow-sm rounded-lg flex flex-col gap-1 border p-2 cursor-pointer mt-4'>
      <Image src={course?.courseBanner} alt='course banner' width={300} height={200}
        className='w-full h-[200px] object-cover rounded-lg' />
      <div className='p-2'>
        <h2 className='font-medium text-lg flex justify-between items-center'>
          {course?.courseOutput?.CourseName} <DropdownOption handleOnDelete={() => handleOnDelete()}> <FaEllipsisVertical /> </DropdownOption></h2>

        <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm'><IoBookOutline />{course?.courseOutput?.NoOfChapters} chapters</h2>
          <h2 className='text-sm bg-purple-50 text-primary p-1 rounded-sm'>{course?.courseOutput?.Level}</h2>
        </div>
      </div>
    </div>
  )
}

export default CourseCard