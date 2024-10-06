import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function EditCourseBasicInfo({ course, refreshData }) {

    const [name, setName] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        setName(course?.courseOutput?.CourseName)
        setDescription(course?.courseOutput?.Description)
    }, [course])

    const onUpdateHandler = async () => {
        course.courseOutput.CourseName = name
        course.courseOutput.Description = description
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.courseId, course?.courseId))
            .returning({ id: CourseList.id })

            refreshData(true)
        // console.log(result)
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger><HiPencilSquare /></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit course title and Description</DialogTitle>
                        <DialogDescription>
                            <div>
                                <label>Course title</label>
                                <Input defaultValue={course?.courseOutput?.CourseName} onChange={(event) => setName(event?.target.value)} />
                            </div>
                            <div>
                                <label>Description</label>
                                <Textarea className='h-40' defaultValue={course?.courseOutput?.Description}
                                    onChange={(event) => setDescription(event?.target.value)} />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button onClick={onUpdateHandler}>Update</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default EditCourseBasicInfo