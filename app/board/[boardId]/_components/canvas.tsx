import React from 'react'
import BoardIdInfo from './info'
import Participants from './participants'
import Toolbar from './toolbar'

const Canvas = () => {
  return (
    <main className="relative size-full touch-none bg-neutral-100">
      <BoardIdInfo />
      <Participants />
      <Toolbar />
    </main>
  )
}

export default Canvas
