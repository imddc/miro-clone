import { BaseUserMeta } from '@liveblocks/client'
import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'

interface InfoProps {
  data: BaseUserMeta['info']
}

const Info = ({ data }: InfoProps) => {
  return (
    <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
      Info
      {JSON.stringify(data)}
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center gap-y-4 rounded-md bg-white shadow-md">
      <Skeleton className="size-full" />
    </div>
  )
}

export default Info
