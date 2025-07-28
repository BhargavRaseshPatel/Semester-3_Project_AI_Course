"use client"

import { db } from '@/configs/db'
import { chapterContentSchema, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { useUser } from '@clerk/nextjs'

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import Header from './_components/Header'
import Link from 'next/link'

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

function CourseStart({ params }) {

  const [selectedChapter, setSelectedChapter] = useState()
  const [course, setCourse] = useState([])
  const [chapterContent, setChapterContent] = useState([])
  const { user } = useUser()
  const [showCompleteButton, setShowCompleteButton] = useState(false)

  useEffect(() => {
    GetCourse()
  }, [])

  const GetCourse = async () => {
    const result = await db.select().from(CourseList).
      where(eq(CourseList.courseId, params.courseId))
    // console.log(result[0])
    setCourse(result[0])
    setSelectedChapter(result[0]?.courseOutput?.Chapters[0])
    GetSelectedChapterContent(0)

    if (user?.primaryEmailAddress?.emailAddress == result[0]?.createdBy) {
      setShowCompleteButton(true)
    }
  }

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db.select().from(chapterContentSchema)
      .where(and(eq(chapterContentSchema.courseId, params.courseId), eq(chapterContentSchema.chapterId, chapterId)))

    setChapterContent(result[0])
  }
  return (
    <div className='w-screen max-w-screen overflow-x-hidden'>
      {/* Chapter List Side Bar  */}
      <div className='fixed w-0 hidden lg:block lg:w-72 h-screen border-r shadow-sm'>
        <Link href={'/dashboard'}>
          <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.CourseName}</h2>
        </Link>
        <div>
          {course?.courseOutput?.Chapters?.map((chapter, index) => (
            <div key={index} className={`cursor-pointer hover:bg-purple-50 ${selectedChapter == chapter && 'bg-purple-100'}`}
              onClick={() => { setSelectedChapter(chapter); GetSelectedChapterContent(index) }}>
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* Content Div  */}
      <div>

        <div className='lg:ml-72'>
          <Header course={course} selectChapter={setSelectedChapter} getContent={GetSelectedChapterContent} />
          <ChapterContent showCompleteButton={showCompleteButton} chapter={selectedChapter} content={chapterContent} refreshData={() => GetCourse()} />
        </div>
      </div>
    </div>
  )
}

export default CourseStart