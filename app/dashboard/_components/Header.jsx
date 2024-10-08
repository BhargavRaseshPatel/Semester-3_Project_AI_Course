import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <div className='flex justify-between items-center p-2 shadow-sm'>
            <div></div>
            {/* <Image src={'/ai-course-create.png'} alt='no image' width={200} height={100} /> */}
            <UserButton height={100} width={100}/>
        </div>
    )
}

export default Header