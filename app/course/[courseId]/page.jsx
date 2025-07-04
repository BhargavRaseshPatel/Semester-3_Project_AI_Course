"use client";
import Header from '@/app/_components/Header';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import { db } from '@/configs/db';
import { chapterContentSchema, CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

function Course({ params }) {
    const [course, setCourse] = useState([])
    const [chapterList, setChapterList] = useState([])

    useEffect(() => {
        params.courseId && GetCourse()
    }, [params])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList).
            where(eq(CourseList.courseId, params.courseId))
        console.log(result)
        setCourse(result[0])

        GetChapters()
    }

    const GetChapters = async () => {
        const chaptersList = await db.select().from(chapterContentSchema).
            where(eq(chapterContentSchema.courseId, params.courseId))
        console.log("Chapter List \n ----", chaptersList)
        setChapterList(chaptersList)
    }

    return (
        <div>
            {/* <Header /> */}
            <div className='px-3 md:px-6 lg:px-12'>
                <CourseBasicInfo course={course} edit={false} />
                <CourseDetail course={course} />
                <ChapterList course={course} chapterList={chapterList} edit={false} />
            </div>
        </div>
    )
}

export default Course