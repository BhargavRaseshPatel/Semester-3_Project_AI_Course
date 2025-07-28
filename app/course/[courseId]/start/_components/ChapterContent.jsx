import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { and, eq } from 'drizzle-orm';
import { chapterContentSchema } from '@/configs/schema';

function ChapterContent({ chapter, content, refreshData, showCompleteButton }) {
    const opts = {

        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };


    const makeComplete = () => {
        // Update the chapter as completed
        db.update(chapterContentSchema).set({ readContent: true }).where(and(eq(chapterContentSchema.chapterId, content.chapterId), eq(chapterContentSchema.courseId, content.courseId))).execute()
        console.log('Completed')
        refreshData(true)
    }

    return (
        <div className='md:px-10 px-5 py-2 mt-1 sm:mt-2'>
            
            <h2 className='font-medium text-2xl'>{chapter?.ChapterName}</h2>
            <p className='text-gray-400 mt-1 sm:mt-1'>{chapter?.about}</p>

            {/* Video  */}
            {content?.videoId && (
                <div className='flex justify-center mt-2 sm:mt-3'>
                    <div className='w-full sm:max-w-xl md:max-w-2xl aspect-video'>
                        <YouTube videoId={content?.videoId} opts={opts} className='h-fit' />
                    </div>
                </div>
            )}

            {/* Content  */}
            <div className='mt-2 sm:mt-3'>
                {content?.content?.map((item, index) => (
                    <div className='p-3 md:p-5 bg-sky-50 mb-3 rounded-lg' key={index}>
                        <h2 className='font-semibold text-md md:text-lg '>{item?.title}</h2>
                        {/* <p className='whitespace-pre-wrap'>{item?.explanation}</p> */}
                        <ReactMarkdown className='text-sm md:text-base'>{item?.explanation}</ReactMarkdown>

                        {item?.code && (
                            <pre style={{scrollbarWidth:"none"}} className='overflow-x-auto scroll-smooth hide-scrollbar p-2 md:p-4 bg-black text-white rounded-md my-3'>
                                <code className='text-sm md:text-base whitespace-pre'>{item?.code}</code>
                            </pre>
                        )}
                    </div>
                ))}
            </div>

            <div>
                {content?.content && !content?.readContent && showCompleteButton && <Button className='px-10 text-xl mb-3' onClick={() => makeComplete()}>Mark as Complete</Button>}
            </div>

        </div>
    )
}

export default ChapterContent