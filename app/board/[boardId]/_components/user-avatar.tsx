import React from 'react'
import Hint from '~/components/hint'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

interface UserAvatarProps {
  name?: string
  src?: string
  fallback?: string
  borderColor?: string
}

const UserAvatar = ({ src, name, fallback, borderColor }: UserAvatarProps) => {
  return (
    <Hint label={name || 'Temmate'} side="bottom" sideOffset={18}>
      <Avatar className="size-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  )
}

export default UserAvatar
