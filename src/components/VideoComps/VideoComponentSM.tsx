import { VidI } from '@/lib/api-client'
import { IKVideo } from 'imagekitio-next'
import { Heart } from 'lucide-react'
import React from 'react'

function VideoComponentSM({video,onclick}:{video:VidI,onclick?: ()=> void}) {
  return (
    <div className='relative w-fit group' onClick={onclick}>
      <div className='absolute top-1/2 left-1/2 text-white text-xl -translate-x-1/2 -translate-y-1/2 group-hover:flex flex-col justify-center items-center hidden'>
        <Heart size={38} className='fill-white' color='white' />
        <span>{video.likes?.length}</span>
      </div>
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