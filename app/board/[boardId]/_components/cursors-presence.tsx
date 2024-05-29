import React, { memo } from 'react'
import { useOthersConnectionIds } from '~/liveblocks.config'
import { Cursor } from './cursor'

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

const CursorsPresence = memo(function CursorsPresence() {
  return (
    <>
      <Cursors />
    </>
  )
})
export default CursorsPresence
