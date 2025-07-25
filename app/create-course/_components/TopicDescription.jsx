import { UserInputContext } from '@/app/_context/UserInputContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

function TopicDescription() {

    const {userCourseInput, setUserCourseInput} = useContext(UserInputContext)

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput((prev) => ({
            ...prev,
            [fieldName]: value
        }))
    }
  return (
    <div className='mx-2 md:mx-16 lg:mx-32'>
        {/* Input Topic */}
        <div className='mt-5'>
            <label>Write the topic for which you want to generate a course (e.g., Python Course, Yoga etc.):</label>
            <Input placeholder='Topic' className='h-10 text-lg mt-3' defaultValue={userCourseInput?.topic} onChange={(e) => handleInputChange('topic',e.target.value)}/>
        </div>
        
        {/* Text Area Desc  */}
        <div className='mt-5'>
            <label>Tell us more about your course, what you want to include in the course.</label>
            <Textarea placeholder='About your course' className='h-20 mt-3' defaultValue={userCourseInput?.description} onChange={(e) => handleInputChange('description',e.target.value)}/>
        </div>

    </div>
  )
}

export default TopicDescription