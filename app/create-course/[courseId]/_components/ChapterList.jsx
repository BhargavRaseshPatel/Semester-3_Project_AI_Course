import React from 'react'
import { HiOutlineClock } from "react-icons/hi2";
import { HiMiniCheckCircle } from "react-icons/hi2";
import EditChapters from './EditChapter';

function ChapterList({ course, refreshData, edit = true }) {
    return (
        <div className='mt-3'>
            <h2 className='font-medium text-xl'>Chapters</h2>
            <div className='mt-2'>
                {course?.courseOutput?.Chapters?.map((chapter, index) => (
                    <div key={index} className='border p-2 mb-2 rounded-lg flex items-center justify-between'>
                        <div className='flex gap-5 items-center'>
                            <h2 className='bg-primary float-none h-10 w-10 text-white rounded-full text-center p-2'>{index + 1}</h2>
                            <div>
                                <h2 className='flex gap-3 font-medium text-lg'>{chapter?.ChapterName} 
                                    {edit && <EditChapters index={index} course={course} refreshData={() => refreshData(true)} />}</h2>
                                <p className='text-sm text-gray-500'>{chapter?.about}</p>
                                <p className='flex items-center gap-2 text-primary'><HiOutlineClock />{chapter?.Duration}</p>
                            </div>
                        </div>
                        <HiMiniCheckCircle className='text-4xl text-gray-300 float-none' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChapterList