import { VidI } from '@/lib/api-client'
import { IKVideo } from 'imagekitio-next'
import React from 'react'

function VideoComponentSM({video,onclick}:{video:VidI,onclick?: ()=> void}) {
  return (
    <div className='relative w-fit' onClick={onclick}>
        <p className='absolute bottom-0 text-sm p-2 text-white'>{video.title}</p>
        <IKVideo   
                    path={video.videoUrl}
                    transformation={[
                      {
                        height: "1920",
                        width: "1080",
                      },
                    ]}
                    controls={false}
                    autoPlay={false}
                    loop
                    muted={true}
                    className="w-full h-full object-cover"
                  />
    </div>
  )
}

export default VideoComponentSM