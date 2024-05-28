'use client'

import React, { FormEventHandler, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { api } from '~/convex/_generated/api'
import { useApiMutation } from '~/hooks/use-api-mutation'
import { useRenameModal } from '~/store/use-rename-modal'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '../ui/dialog'
import { Input } from '../ui/input'

const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal()
  const { mutate, pending } = useApiMutation(api.board.update)
  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValues.id,
      title
    })
      .then(() => {
        toast('Updated board')
        onClose()
      })
      .catch(() => {
        toast.error('Failed to update board')
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Edit board title</DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            placeholder="Board title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancle</Button>
            </DialogClose>

            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal
