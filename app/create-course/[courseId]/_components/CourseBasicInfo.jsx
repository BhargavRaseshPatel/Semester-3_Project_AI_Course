import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState } from 'react'
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from './EditCourseBasicInfo';

function CourseBasicInfo({ course, refreshData }) {

    const [selectedFile, setSelectedFile] = useState()
    const onFileSelected = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setSelectedFile(URL.createObjectURL(file))
    }

    return (
        <div className=' p-10 border rounded-xl shadow-sm mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h2 className='flex gap-3 items-center font-bold text-2xl'>{course?.courseOutput?.CourseName}
                        <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} /></h2>
                    <p className='text-xs text-gray-400 mt-3'>{course?.courseOutput?.Description}</p>
                    <h2 className='font-medium mt-2 flex text-xl gap-2 items-center text-primary'><HiOutlinePuzzlePiece />{course?.category}</h2>
                    <Button className="w-full mt-5">Start</Button>
                </div>
                <div>
                    <label htmlFor='upload-image' className='cursor-pointer'>
                        <Image alt='image' src={selectedFile ? selectedFile : '/placeholder.jpg'} width={200} height={200} className='rounded-xl w-full h-[300px] object-cover' />
                        <input type='file' id='upload-image' className='opacity-0' onChange={onFileSelected}/>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CourseBasicInfo