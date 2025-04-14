"use client"
import { ActionIcon } from '@mantine/core'
import { Share2Icon } from 'lucide-react'
import React from 'react'

function ShareVideo() {
  return (
    <div className="flex flex-col items-center">
    <ActionIcon  size={42} variant="default" radius={'xl'} aria-label="ActionIcon with size as a number">
              <Share2Icon size={24} />
            </ActionIcon>
            <span  className="text-white text-xs " >Share</span>
            </div>
  )
}

export default ShareVideo