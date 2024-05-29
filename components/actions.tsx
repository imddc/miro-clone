import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import { Link2, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { api } from '~/convex/_generated/api'
import { useApiMutation } from '~/hooks/use-api-mutation'
import { useRenameModal } from '~/store/use-rename-modal'
import ConfirmModal from './confirm-modal'
import RenameModal from './modal/rename-modal'
import { Button } from './ui/button'
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

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Faild to copy link'))
  }

  const { onOpen } = useRenameModal()

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
        <DropdownMenuItem
          className="cursor-pointer p-3"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>
        <ConfirmModal
          disabled={pending}
          onConfirm={onDelete}
          header="Delete board?"
          description="This will delete the board and all of it's contents."
        >
          <Button
            variant="ghost"
            className="w-full justify-start p-3 text-sm font-normal"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
