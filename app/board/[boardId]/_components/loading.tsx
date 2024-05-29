'use client'

import { Loader } from 'lucide-react'
import React from 'react'
import { InfoSkeleton } from './info'
import { ParticipantsSkeleton } from './participants'
import { ToolbarSkeleton } from './toolbar'

const Loading = () => {
  return (
    <main className="flex-center relative size-full touch-none bg-neutral-100">
      <Loader className="size-6 animate-spin text-muted-foreground" />

      <ParticipantsSkeleton />
      <InfoSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}

export default Loading
