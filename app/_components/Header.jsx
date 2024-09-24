import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between shadow-sm'>
        <Image src={'/logo.png'} width={150} height={50}/>
        <Button>Get Started</Button>
    </div>
  )
}

export default Header