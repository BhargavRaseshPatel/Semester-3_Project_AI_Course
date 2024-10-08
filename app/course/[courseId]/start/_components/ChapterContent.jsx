import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'

function ChapterContent({ chapter, content }) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    return (
        <div className='p-10'>
            <h2 className='font-medium text-2xl'>{chapter?.ChapterName}</h2>
            <p className='text-gray-400 mt-3'>{chapter?.about}</p>

            {/* Video  */}
            <div className='flex justify-center my-6'>
                <YouTube videoId={content?.videoId} opts={opts} />
            </div>

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
            {/* Content  */}

        </div>
    )
}

export default ChapterContent