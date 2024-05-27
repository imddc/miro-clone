'use client'

import { CreateOrganization } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'

const NewButton = () => {
  // TODO: fix CreateOrganization error it seems like middleware's wrong
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <button className="flex-center size-full rounded-md bg-white/25 opacity-60 transition hover:opacity-100">
            <Plus className="text-white" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[480px] border-none bg-transparent p-0">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  )
}

export default NewButton
