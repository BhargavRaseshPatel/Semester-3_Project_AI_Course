import React from 'react'
import { FaRegClock } from "react-icons/fa";

function ChapterListCard({ chapter, index }) { 
    return (
        <div className='grid grid-cols-5 p-3 items-center border-b'>
                <h2 className='p-3 flex bg-primary w-8 h-8 text-white rounded-full items-center justify-center'>{index + 1}</h2>
            
            <div className='col-span-4'>
                <h2 className='font-medium'>{chapter?.ChapterName}</h2>
                <h2 className='flex items-center gap-2 text-sm text-primary'><FaRegClock /> {chapter?.Duration}</h2>
            </div>
        </div>
    ) 
}

export default ChapterListCard