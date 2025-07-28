import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='flex justify-between items-center mt-5'>
            <Link href={'/dashboard'}>
                <Image src={'/ai-course-create.png'} width={200} height={20} alt="logo image" className=' h-full rounded-lg' />
            </Link>
            <UserButton />
        </div>
    )
}

export default Header