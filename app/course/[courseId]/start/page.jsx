"use client"

import { db } from '@/configs/db'
import { chapterContentSchema, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({ params }) {

  const [selectedChapter, setSelectedChapter] = useState()
  const [course, setCourse] = useState([])
  const [chapterContent, setChapterContent] = useState([])
  useEffect(() => {
    GetCourse()
  }, [])

  const GetCourse = async () => {
    const result = await db.select().from(CourseList).
      where(eq(CourseList.courseId, params.courseId))
    console.log(result[0])
    setCourse(result[0])
    GetSelectedChapterContent(0)
  }

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db.select().from(chapterContentSchema)
    .where(and(eq(chapterContentSchema.courseId, params.courseId), eq(chapterContentSchema.chapterId, chapterId)))

    console.log("Result : ",result[0])
    setChapterContent(result[0])
  }
  return (
    <div>
      {/* Chapter List Side Bar  */}
      <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
        <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.CourseName}</h2>
        <div>
          {course?.courseOutput?.Chapters?.map((chapter, index) => (
            <div key={index} className={`cursor-pointer hover:bg-purple-50 ${selectedChapter == chapter && 'bg-purple-100'}`}
              onClick={() => {setSelectedChapter(chapter); GetSelectedChapterContent(index)}}>
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>  
      {/* Conten Div  */}
      <div className='md:ml-72'>
        <ChapterContent chapter={selectedChapter} content={chapterContent}/>
      </div>
    </div>
  )
}

export default CourseStart