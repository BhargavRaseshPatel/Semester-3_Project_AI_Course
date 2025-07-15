"use client";
import React, { useContext, useEffect, useState } from 'react'
import { db } from '@/configs/db'
import { eq } from 'drizzle-orm'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseList';

function UserCourseList() {

  const [courseList, setCourseList] = useState([])
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)
  const { user } = useUser()

  useEffect(() => {
    user && getUserCourses()
  }, [user])

  const getUserCourses = async () => {
    const result = await db.select().from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))
    setCourseList(result)
    setUserCourseList(result) // Get all courses created by the user
  }
  return (
    <div className='mt-10'>
      <h2 className='font-medium text-lg'>My AI Courses</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-4 md:gap-5 gap-2 mt-2'>
        {courseList?.length > 0 ? courseList.map((course, index) => (
          <CourseCard course={course} key={index} refreshData={() => getUserCourses()}/>
        ))
        : 
        [1,2,3,4,5].map((item, index) => (
          <div key={index} className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[285px]'>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserCourseList