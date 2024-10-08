"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

function Header() {
  const router = useRouter()
  return (
    <div className='flex justify-between items-center shadow-sm p-5'>
        <Image src={'/ai-course-create.png'} alt={'logo image'} width={200} height={50} className='rounded-lg'/>
        <Button onClick={() => router.push('/dashboard')} className='text-xl pb-2 pt-2'>Get Started</Button>
    </div>
  )
}

export default Header