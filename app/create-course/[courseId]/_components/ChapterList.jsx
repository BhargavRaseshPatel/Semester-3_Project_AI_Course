import React, { use, useEffect } from 'react'
import { HiOutlineClock } from "react-icons/hi2";
import { HiMiniCheckCircle } from "react-icons/hi2";
import EditChapters from './EditChapter';
import { useUser } from '@clerk/nextjs';

function ChapterList({ course, refreshData, chapterList = null, edit = true }) {
    const { user } = useUser()

    useEffect(() => {
        console.log(chapterList)
    })

    return (
        <div className='mt-3'>
            <h2 className='font-medium text-xl'>Chapters</h2>
            <div className='mt-2'>
                {course?.courseOutput?.Chapters?.map((chapter, index) => (
                    <div key={index} className='border border-gray-300 sm:p-2 px-0 py-2 mb-2 rounded-lg flex items-center justify-between'>
                        <div className='flex md:gap-5 sm:gap-2 gap-0 items-center'>
                            <h2 className='bg-primary flex items-center justify-center overflow-hidden h-7 w-7 md:h-10 md:w-10 text-white m-1 p-1 rounded-full text-center'>{index + 1}</h2>
                            <div>
                                <h3 className='flex gap-3 text-sm md:text-base font-medium lg:text-lg'>{chapter?.ChapterName}
                                    {edit && <EditChapters index={index} course={course} refreshData={() => refreshData(true)} />}</h3>
                                <p className='text-xs md:text-sm text-gray-500'>{chapter?.about}</p>
                                <p className='flex items-center text-xs md:text-sm gap-2 text-primary'><HiOutlineClock />{chapter?.Duration}</p>
                            </div>
                        </div>
                        {/* { chapterList[index] == null ? <HiMiniCheckCircle className='text-4xl text-gray-300 float-none' /> : chapterList[index]?.readContent == false ? <HiMiniCheckCircle className='text-4xl text-gray-300 float-none' /> : <HiMiniCheckCircle className='text-4xl text-primary float-none' />} */}
                        {course?.createdBy == user?.primaryEmailAddress?.emailAddress ?
                            chapterList == null ? null : chapterList.find(item => item?.chapterId == chapter?.ChapterId)?.readContent ?
                                <HiMiniCheckCircle className='text-4xl text-primary float-none overflow-hidden h-7 w-7 md:h-10 md:w-10' /> :
                                <HiMiniCheckCircle className='text-4xl text-gray-300 float-none overflow-hidden h-7 w-7 md:h-10 md:w-10' /> : null}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList