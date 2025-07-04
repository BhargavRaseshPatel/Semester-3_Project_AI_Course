import React from 'react'
import { HiChartBar } from "react-icons/hi2";
import { HiOutlineClock } from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiOutlinePlayCircle } from "react-icons/hi2";

function CourseDetail({ course }) {
    return (
        <div className='border p-2 md:p-4 rounded-xl shadow-sm mt-3'>
            <div className='grid grid-cols-2 md:gap-0 gap-2 sm:grid-cols-4'>
                <div className='flex gap-2 items-center'>
                    <HiChartBar className='sm:text-4xl text-2xl text-primary'/>
                    <div>
                        <h2 className='text-sm md:text-lg'>Skill Level</h2>
                        <h2 className='font-medium text-sm md:text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <HiOutlineClock  className='sm:text-4xl text-2xl text-primary'/>
                    <div>
                        <h2 className='text-sm md:text-lg'>Duration</h2>
                        <h2 className='font-medium text-sm md:text-lg'>{course?.courseOutput?.Duration}</h2>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <HiOutlineBookOpen className='sm:text-4xl text-2xl text-primary'/>
                    <div>
                        <h2 className='text-sm md:text-lg'>No of Chapter</h2>
                        <h2 className='font-medium text-sm md:text-lg'>{course?.courseOutput?.NoOfChapters} Chapters</h2>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <HiOutlinePlayCircle className='sm:text-4xl text-2xl text-primary'/>
                    <div>
                        <h2 className='text-sm md:text-lg'>Video Included</h2>
                        <h2 className='font-medium text-sm md:text-lg'>{course?.courseOutput?.DisplayVideo}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail