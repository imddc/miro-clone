'use client'

import React from 'react'
import { useSelf } from '~/liveblocks.config'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((s) => s.info)

  return (
    <main className="relative size-full touch-none bg-neutral-100">
      <Info data={info} />
      <Participants />
      <Toolbar />
    </main>
  )
}

export default Canvas
