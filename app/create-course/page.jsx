'use client';
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react'
import { HiSquares2X2 } from "react-icons/hi2";
import { HiLightBulb } from "react-icons/hi2";
import { HiClipboardDocumentList } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout_AI } from './../../configs/AiModal';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateCourse() {
    const [activeIndex, setActiveIndex] = useState(0)

    const { user } = useUser();
    const router = useRouter()

    const StepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <HiSquares2X2 />

        },
        {
            id: 2,
            name: 'Topic & Desc',
            icon: <HiLightBulb />
        },
        {
            id: 3,
            name: 'Options',
            icon: <HiClipboardDocumentList />
        }
    ]

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(userCourseInput)
    }, [userCourseInput])

    // Used to check Next Button is disabled or not

    const checkStatus = () => {
        if (userCourseInput?.length == 0) {
            return true
        }
        if (activeIndex == 0 && (userCourseInput?.category?.length == 0 || userCourseInput?.category == undefined)) {
            return true
        }
        if (activeIndex == 1 && (userCourseInput?.topic?.length == 0 || userCourseInput?.topic == undefined)) {
            return true
        }
        else if (activeIndex == 2 && (userCourseInput?.level == undefined || userCourseInput?.duration == undefined ||
            userCourseInput?.displayVideo == undefined || userCourseInput?.noOfChapter == undefined)) {
            return true
        }
        return false
    }

    const GenerateCourseLayout = async () => {
        setLoading(true);
        const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail with field as CourseName, Description, Duration Along with ChapterName:';
        const USER_INPUT_PROMPT = `Category: ${userCourseInput.category} \n Topic: ${userCourseInput?.topic} \n Description: ${userCourseInput?.description} \n Level: ${userCourseInput?.level} \n Duration: ${userCourseInput?.duration} \n DisplayVideo: ${userCourseInput?.displayVideo} \n NoOfChapters: ${userCourseInput?.noOfChapter}`;
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
        console.log(FINAL_PROMPT);

        const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        console.log(result.response?.text());
        console.log(JSON.parse(result.response?.text()));
        setLoading(false);
        SaveCourseLayoutInDb(JSON.parse(result.response?.text()));
    }

    const SaveCourseLayoutInDb = async (courseLayout) => {
        setLoading(true);
        var id = uuid4(); // Course Id
        const result = await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.topic,
            category: userCourseInput?.category,
            level: userCourseInput?.level,
            courseOutput: courseLayout,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl
        })

        console.log("Finished", result);
        router.replace('/create-course/'+id);
        setLoading(false);
    }
    return (
        <div>

            {/* Stepper */}

            <div className='flex flex-col justify-center items-center mt-10'>
                <h2 className='text-2xl text-primary font-medium'>Create Course</h2>
                <div className='flex mt-10'>
                    {StepperOptions.map((item, index) => (
                        <div className='flex items-center'>
                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && 'bg-purple-500'}`}>
                                    {item.icon}
                                </div>
                                <h2>{item.name}</h2>
                            </div>
                            {index != StepperOptions.length - 1 && <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && 'bg-purple-500'}`}></div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className='px-10 md:px-20 lg:px-44 mt-10'>

                {/* Component */}

                {activeIndex == 0 ? <SelectCategory /> : null}
                {activeIndex == 1 ? <TopicDescription /> : null}
                {activeIndex == 2 ? <SelectOption /> : null}

                {/* Next Previous Button */}
                <div className='flex justify-between mt-10'>
                    <Button variant='outline' disabled={activeIndex == 0} onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>
                    {activeIndex < 2 && <Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
                    {activeIndex == 2 && <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()}>Generate Course Layout</Button>}
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CreateCourse