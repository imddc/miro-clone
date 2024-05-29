import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { connectionId2Color } from '~/lib/utils'
import { useOthers, useSelf } from '~/liveblocks.config'
import UserAvatar from './user-avatar'

const MAX_SHOWN_USERS = 2

const Participants = () => {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className="absolute right-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
      <div className="flex items-center gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info.picture}
              name={info.name}
              fallback={info.name[0] || 'T'}
            />
          )
        })}

        {currentUser && (
          <UserAvatar
            borderColor={connectionId2Color(currentUser.connectionId)}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute right-2 top-2 flex h-12 w-[100px] items-center rounded-md bg-white shadow-md">
      <Skeleton className="size-full" />
    </div>
  )
}

export default Participants
