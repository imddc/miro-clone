import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2
} from 'lucide-react'
import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import ToolButton from './tool-button'

const Toolbar = () => {
  return (
    <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          label="Select"
          Icon={MousePointer2}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Text"
          Icon={Type}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Sticky note"
          Icon={StickyNote}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Rectangle"
          Icon={Square}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Ellipse"
          Icon={Circle}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Pen"
          Icon={Pencil}
          isActive={false}
          onClick={() => {}}
        />
      </div>

      <div className="flex flex-col items-center rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          label="Undo"
          Icon={Undo2}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Redo"
          Icon={Redo2}
          isActive={false}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute left-2 top-1/2 flex h-[360px] w-[52px] -translate-y-1/2 flex-col gap-y-4 rounded-md bg-white shadow-md">
      <Skeleton className="size-full" />
    </div>
  )
}

export default Toolbar
