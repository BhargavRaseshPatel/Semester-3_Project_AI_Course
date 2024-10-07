"use client";
import { db } from '@/configs/db';
import { chapterContent, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContent_AI } from './../../../configs/AiModal';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';

function courseLayout({ params }) {
    const { user } = useUser()
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        console.log(params)
        params.courseId && GetCourse()
    }, [params, user])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList).
            where(eq(CourseList.courseId, params.courseId), eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))
        console.log(result)
        setCourse(result[0])
    }

    const GenerateChapterContent = () => {
        console.log('clicked')
        setLoading(true)
        const chapters = course?.courseOutput?.Chapters
        chapters.forEach(async (chapter, index) => {
            const PROMPT = 'Explain the concept in Detail on Topic: ' + course?.name + ' Chapter: ' + chapter?.ChapterName + ', in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable'
            // console.log(PROMPT)

            if(index == 0){
                try{
                    let videoId = ''
                    // Generate Video URL
                    service.getVideos(course?.name + ':' + chapter?.ChapterName).then((resp) => {
                        console.log(resp)
                        videoId = resp[0]?.id?.videoId
                    })

                    // Generate Chapter Content
                    const result = await GenerateChapterContent_AI.sendMessage(PROMPT)
                    console.log(result.response.text())
                    const content = JSON.parse(result.response.text())

                    console.log("Courer ID: ", course?.courseId)

                    await db.insert(chapterContent).values({
                        courseId: course?.courseId,
                        chapterId: index,
                        content: content,
                        videoId: videoId
                    })

                    // Save Capter Content + Video URL
                    setLoading(false)
                }
                catch(e){
                    setLoading(false)
                    console.log(e)
                }
                router.replace('/create-course/'+course?.courseId+'/finish') 
            }
        })
    }

    return (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
            <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

            <LoadingDialog loading={loading} />
            {/* Basic Info  */}
            <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

            {/* Course Detail  */}
            <CourseDetail course={course} />

            {/* List of Lesson  */}
            <ChapterList course={course} refreshData={() => GetCourse()} />

            <Button className="my-10" onClick={GenerateChapterContent}>Generate Course Content</Button>
            {/* <LoadingDialog loading={loading} /> */}
        </div>
    )
}

export default courseLayout