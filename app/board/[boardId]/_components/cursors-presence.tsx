'use client'

import { shallow } from '@liveblocks/client'
import React, { memo } from 'react'
import { colorToCss } from '~/lib/utils'
import { useOthersConnectionIds, useOthersMapped } from '~/liveblocks.config'
import { Cursor } from './cursor'
import { Path } from './path'

const Cursors = () => {
  const ids = useOthersConnectionIds()

  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  )
}

const Draft = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      pencilColor: other.presence.penColor
    }),
    shallow
  )

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.pencilColor ? colorToCss(other.pencilColor) : '#000'}
            />
          )
        }
        return null
      })}
    </>
  )
}

const CursorsPresence = memo(function CursorsPresence() {
  return (
    <>
      <Draft />
      <Cursors />
    </>
  )
})

export default CursorsPresence
