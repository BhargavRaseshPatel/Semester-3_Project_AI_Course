import React from 'react'
import SlideBar from './_components/SlideBar'
import Header from './_components/Header'

function DashboardLayout({ children }) {
    return (
        <div >
            <div className='md:w-64 hidden md:block'>
                <SlideBar />
            </div>
            <div className='md:ml-64'>
                <Header/>
                <div className='flex p-10'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout