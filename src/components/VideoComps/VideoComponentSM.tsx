import { VidI } from '@/lib/api-client'
import { IKVideo } from 'imagekitio-next'
import { Heart } from 'lucide-react'
import React from 'react'
import VideoMenu from './VideoMenu'
import { useSession } from 'next-auth/react'

function VideoComponentSM({video,onclick}:{video:VidI,onclick?: ()=> void}) {
  const {data:session} = useSession();
  return (
    <div className='relative w-fit group'>
      {session?.user.id === video.userId.toString() && <VideoMenu videoId={video._id?.toString()!} videoIdImagekit={video.videoIdImagekit!} className={'absolute top-2 right-2 z-20'} />}
      <div className='absolute top-1/2 left-1/2 text-white text-xl -translate-x-1/2 -translate-y-1/2 group-hover:flex flex-col justify-center items-center hidden'>
        <Heart size={38} className='fill-white' color='white' />
        <span>{video.likes?.length}</span>
      </div>
        <p className='absolute bottom-0 text-sm p-2 text-white'>{video.title}</p>
        <div  onClick={onclick}> 
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
                  /></div>
    </div>
  )
}

export default VideoComponentSM