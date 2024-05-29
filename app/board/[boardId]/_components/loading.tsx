import { Loader } from 'lucide-react'
import React from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

const Loading = () => {
  return (
    <main className="flex-center relative size-full touch-none bg-neutral-100">
      <Loader className="size-6 animate-spin text-muted-foreground" />

      <Participants.Skeleton />
      <Info.Skeleton />
      <Toolbar.Skeleton />
    </main>
  )
}

export default Loading
