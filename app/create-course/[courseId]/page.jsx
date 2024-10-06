"use client";
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';

function courseLayout({ params }) {
    const {user} = useUser()
    const [course, setCourse] = useState([])

    useEffect(() => {
        console.log(params)
        params.courseId && GetCourse()
    }, [params, user])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList).
        where(eq(CourseList.courseId, params.courseId),eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))   
        console.log(result)
        setCourse(result[0])
    }

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

            {/* Basic Info  */}
            <CourseBasicInfo course={course} refreshData={() => GetCourse()}/>

            {/* Course Detail  */}
            <CourseDetail course={course}/>

            {/* List of Lesson  */}
            <ChapterList course={course} refreshData={() => GetCourse()}/>

        </div>
    )
}

export default courseLayout