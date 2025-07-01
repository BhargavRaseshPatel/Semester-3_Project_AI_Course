import { UserInputContext } from '@/app/_context/UserInputContext'
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React from 'react'

function SelectCategory() {
    const {userCourseInput, setUserCourseInput} = React.useContext(UserInputContext)

    const handleCategoryChange = (category) => {
        setUserCourseInput((prev) => ({
            ...prev,    
            category: category
        })) 
    }

    return (
        <div className='grid grid-cols-3 gap-1 sm:gap-2 md:gap-5 lg:gap-10'>
            {CategoryList.map((category, index) => ( 
                <div className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer
                    ${userCourseInput?.category == category.name && 'border-primary bg-blue-50'}`}
                onClick={() => handleCategoryChange(category.name)}>
                    <Image src={category.icon} width={100} height={100} />
                    <h2 className='text-sm mt-3 md:text-lg'>{category.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default SelectCategory