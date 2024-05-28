import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

interface ActionsProps {
  title: string
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
}

const Actions = ({ children, side, sideOffset, id }: ActionsProps) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Faild to copy link'))
  }

  return (
    <div className="absolute right-1 top-1 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>

        <DropdownMenuContent
          side={side}
          sideOffset={sideOffset}
          className="w-60"
          onClick={(e) => e.preventDefault()}
        >
          <DropdownMenuItem className="cursor-pointer p-3" onClick={onCopyLink}>
            <Link2 className="mr-2 size-4" />
            Copy board link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Actions
