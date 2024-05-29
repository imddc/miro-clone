import React from 'react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

interface CanvasProps {
  boardId: string
}

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="relative size-full touch-none bg-neutral-100">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}

export default Canvas
