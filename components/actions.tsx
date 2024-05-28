import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { Link2, Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { api } from '~/convex/_generated/api'
import { useApiMutation } from '~/hooks/use-api-mutation'
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

  const { pending, mutate } = useApiMutation(api.board.remove)

  const onDelete = () => {
    mutate({ id })
      .then(() => {
        toast.success('delete success')
      })
      .catch((err) => {
        toast.error(err)
      })
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
          <DropdownMenuItem className="cursor-pointer p-3" onClick={onDelete}>
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Actions
