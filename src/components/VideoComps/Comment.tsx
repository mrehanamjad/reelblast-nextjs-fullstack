"use client"
import { ActionIcon } from '@mantine/core'
import { MessageCircleMore } from 'lucide-react'
import React from 'react'

function Comment() {
  return (
    <div className="flex flex-col items-center">
    <ActionIcon  size={42} variant="default" radius={'xl'} aria-label="ActionIcon with size as a number">
          <MessageCircleMore size={24} />
        </ActionIcon>
        <span  className="text-white text-xs" >Comments</span>
        </div>
  )
}

export default Comment