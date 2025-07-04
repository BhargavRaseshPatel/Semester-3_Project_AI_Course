"use client"

import { db } from '@/configs/db'
import { chapterContentSchema, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'
import { useUser } from '@clerk/nextjs'

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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
    console.log(result[0])
    setCourse(result[0])
    GetSelectedChapterContent(0)

    if (user?.primaryEmailAddress?.emailAddress == result[0]?.createdBy) {
      setShowCompleteButton(true)
    }
  }

  const GetSelectedChapterContent = async (chapterId) => {
    const result = await db.select().from(chapterContentSchema)
      .where(and(eq(chapterContentSchema.courseId, params.courseId), eq(chapterContentSchema.chapterId, chapterId)))

    // console.log("Result : ",result[0])
    setChapterContent(result[0])
  }
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <div className=' h-screen border-r shadow-sm'>
            <h2 className='font-medium text-lg bg-primary p-3 text-white'>{course?.courseOutput?.CourseName}</h2>
            <div>
              {course?.courseOutput?.Chapters?.map((chapter, index) => (
                <div key={index} className={`cursor-pointer hover:bg-purple-50 ${selectedChapter == chapter && 'bg-purple-100'}`}
                  onClick={() => { setSelectedChapter(chapter); GetSelectedChapterContent(index) }}>
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              ))}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
      {/* Increase the size of the trigger using a custom class or inline style */}
      <div>

        <SidebarTrigger className="w-16 h-16" style={{ fontSize: 48 }} />

        <div className=''>
          <ChapterContent chapter={selectedChapter} content={chapterContent} showCompleteButton={showCompleteButton} refreshData={() => GetCourse()} />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CourseStart