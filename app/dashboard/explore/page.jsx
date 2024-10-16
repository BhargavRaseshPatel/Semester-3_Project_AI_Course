"use client";
import { db } from '@/configs/db'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { CourseList } from '@/configs/schema';
import { Button } from '@/components/ui/button';

function Explore() {

  const [courseList, setCourseList] = useState([])
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    GetAllCourse()
  }, [pageIndex])

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList)
      .limit(8).offset(pageIndex * 8)

    setCourseList(result)
  }

  return (
    <div>
      <h2 className='font-bold text-3xl'>Explore more Projects</h2>
      <p>Explore more project build with AI by other users</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {courseList?.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-5'>
        {pageIndex != 0 && <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous Page</Button>}
        <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
      </div>
    </div>
  )
}

export default Explore