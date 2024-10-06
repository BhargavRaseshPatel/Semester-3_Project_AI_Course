import React, { useState } from 'react'
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
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';

function EditChapters({ course, index, refreshData }) {

    const chapters = course?.courseOutput?.Chapters
    const [name, setName] = useState(chapters[index].ChapterName)
    const [description, setDescription] = useState(chapters[index].about)

    const onUpdateHandler = async () => {
        course.courseOutput.Chapters[index].ChapterName = name
        course.courseOutput.Chapters[index].about = description
        const result = await db.update(CourseList).set({
            courseOutput: course?.courseOutput
        }).where(eq(CourseList?.courseId, course?.courseId))
            .returning({ id: CourseList.id })

        refreshData(true)
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
                                <label>Chapter Name</label>
                                <Input defaultValue={chapters[index]?.ChapterName} onChange={(event) => setName(event?.target.value)} />
                            </div>
                            <div>
                                <label>Description</label>
                                <Textarea className='h-40' defaultValue={chapters[index]?.about}
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

export default EditChapters