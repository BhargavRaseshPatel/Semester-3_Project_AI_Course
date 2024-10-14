import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { and, eq } from 'drizzle-orm';
import { chapterContentSchema } from '@/configs/schema';

function ChapterContent({ chapter, content, refreshData }) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const makeComplete = () => {
        // Update the chapter as completed
        db.update(chapterContentSchema).set({ readContent: true }).where(and(eq(chapterContentSchema.chapterId,content.chapterId),eq(chapterContentSchema.courseId,content.courseId))).execute()
        console.log('Completed')
        refreshData(true)
    }

    return (
        <div className='p-10'>
            <h2 className='font-medium text-2xl'>{chapter?.ChapterName}</h2>
            <p className='text-gray-400 mt-3'>{chapter?.about}</p>

            {/* Video  */}
            <div className='flex justify-center my-6'>
                <YouTube videoId={content?.videoId} opts={opts} />
            </div>

            {/* Content  */}
            <div>
                {content?.content?.map((item, index) => (
                    <div className='p-5 bg-sky-50 mb-3 rounded-lg'>
                        <h2 className='font-medium text-lg'>{item?.title}</h2>
                        {/* <p className='whitespace-pre-wrap'>{item?.explanation}</p> */}
                        <ReactMarkdown>{item?.explanation}</ReactMarkdown>
                        
                        {item?.code && <div className='p-4 bg-black text-white rounded-md my-3'>
                            <pre>
                                <code>{item?.code}</code>
                            </pre>
                        </div>}
                    </div>
                ))}
            </div>

            <div>
                {content?.content && !content?.readContent && <Button className='px-10 text-xl' onClick={() => makeComplete()}>Completed</Button>}
            </div>

        </div>
    )
}

export default ChapterContent