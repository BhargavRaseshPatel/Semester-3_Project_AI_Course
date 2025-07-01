"use client";
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

function Header() {
  const router = useRouter()
  return (
    <div className='flex sm:justify-between items-center shadow-sm p-5'>
      <div className='sm:block hidden'>
        <Image src={'/ai-course-create.png'} alt={'logo image'} width={200} height={50} className='rounded-lg' />
      </div>
      <div className='hidden sm:block'>
        <Button onClick={() => router.push('/dashboard')} className='text-xl h-full px-4'>Get Started</Button>
      </div>
    </div>
  )
}

export default Header