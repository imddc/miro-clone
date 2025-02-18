'use client'

import { MousePointer2 } from 'lucide-react'
import { memo } from 'react'
import { connectionId2Color } from '~/lib/utils'
import { useOther } from '~/liveblocks.config'

interface CursorProps {
  connectionId: number
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info)

  const cursor = useOther(connectionId, (user) => user.presence.cursor)

  const name = info?.name || 'Teammate'

  if (!cursor) return null

  const { x, y } = cursor

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`
      }}
      height={50}
      width={name.length * 10 + 30}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="size-5"
        style={{
          fill: connectionId2Color(connectionId),
          color: connectionId2Color(connectionId)
        }}
      />
      <div
        className="absolute left-5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-white"
        style={{
          backgroundColor: connectionId2Color(connectionId)
        }}
      >
        {name}
      </div>
    </foreignObject>
  )
})

Cursor.displayName = 'Cursor'
