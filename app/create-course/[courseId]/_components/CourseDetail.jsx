import React from 'react'
import { HiChartBar } from "react-icons/hi2";
import { HiOutlineClock } from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiOutlinePlayCircle } from "react-icons/hi2";

function CourseDetail({ course }) {
    return (
        <div className='border p-6 rounded-xl shadow-sm mt-3'>
            <div className='grid grid-cols-2 md:gap-0 gap-2 md:grid-cols-4'>
                <div className='flex gap-2'>
                    <HiChartBar className='text-4xl text-primary'/>
                    <div>
                        <h2>Skill Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <HiOutlineClock  className='text-4xl text-primary'/>
                    <div>
                        <h2>Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.Duration}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <HiOutlineBookOpen className='text-4xl text-primary'/>
                    <div>
                        <h2>No of Chapter</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.NoOfChapters}</h2>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <HiOutlinePlayCircle className='text-4xl text-primary'/>
                    <div>
                        <h2>Video Included</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.DisplayVideo}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail