"use client";
import React, { useState } from 'react'
import SlideBar from './_components/SlideBar'
import Header from './_components/Header'
import { UserCourseListContext } from '../_context/UserCourseList'

function DashboardLayout({ children }) {
    const [userCourseList, setUserCourseList] = useState([])

    return (
        <UserCourseListContext.Provider value={{userCourseList, setUserCourseList}}>
                <div className='lg:w-64 hidden lg:block'>
                    <SlideBar showShadow/>
                </div>
                <div className='lg:ml-64'>
                    <Header />
                    <div className='flex p-10'>
                        {children}
                    </div>
                </div>
        </UserCourseListContext.Provider>
    )
}

export default DashboardLayout