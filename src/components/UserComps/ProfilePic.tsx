"use client"
import React from 'react'
import { Avatar } from "@mantine/core";

function ProfilePic({size="md",className="",name, url,radius=100}:{size?:string;className?:string;name:string;url: string;radius?:number}) {
  return (
    <div className={`relative flex flex-col items-center gap-3 ${className}`}>
              <Avatar
                size={size}
                className="border-2 border-blue-400 order-2 md:order-1"
                src={url && `${process.env.NEXT_PUBLIC_URL_ENDPOINT}${url}`}
                key={name}
                name={name}
                color="initials"
                radius={radius}
              />
            </div>
  )
}

export default ProfilePic