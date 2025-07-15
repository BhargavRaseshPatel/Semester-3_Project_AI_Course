"use client";
import { db } from '@/configs/db';
import { chapterContentSchema, CourseList } from '@/configs/schema';
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
        params.courseId && GetCourse()
    }, [params, user])

    const GetCourse = async () => {
        const result = await db.select().from(CourseList).
            where(eq(CourseList.courseId, params.courseId), eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))
        setCourse(result[0])
    }

    const GenerateChapterContent = async () => {
        setLoading(true);
        const chapters = course?.courseOutput?.Chapters;
    
        if (!chapters || chapters.length === 0) {
            setLoading(false);
            return;
        }
    
        try {
            // Map each chapter to an async operation
            const chapterPromises = chapters.map(async (chapter, index) => {
                const PROMPT = 'Explain the concept in Detail on Topic: ' + course?.name + ' Chapter: ' + chapter?.ChapterName + ', in JSON Format with list of array with field as title, explanation on given chapter in detail, Code Example(Code field in <precode> format) if applicable';
    
                // Generate Video URL asynchronously
                let videoId = '';
                try {
                    const videoResp = await service.getVideos(course?.name + ':' + chapter?.ChapterName);
                    videoId = videoResp[0]?.id?.videoId || '';
                } catch (videoError) {
                    console.error('Error fetching video:', videoError);
                }
    
                // Generate Chapter Content asynchronously
                try {
                    const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
                    const content = JSON.parse(await result.response.text());
    
                    // Save Chapter Content + Video URL asynchronously
                    await db.insert(chapterContentSchema).values({
                        courseId: course?.courseId,
                        chapterId: index,
                        content: content,
                        videoId: videoId
                    });
    
                } catch (contentError) {
                    console.error('Error generating chapter content:', contentError);
                }
            });
    
            // Wait for all chapter operations to finish
            await Promise.all(chapterPromises);
    
            setLoading(false);
            router.replace('/create-course/' + course?.courseId + '/finish');
        } catch (e) {
            setLoading(false);
            console.error('Error during content generation:', e);
        }
    }; 

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
        </div>
    )
}

export default courseLayout