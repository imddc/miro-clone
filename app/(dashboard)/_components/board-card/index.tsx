'use client'

import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import Actions from '~/components/actions'
import { Skeleton } from '~/components/ui/skeleton'
import { api } from '~/convex/_generated/api'
import { useApiMutation } from '~/hooks/use-api-mutation'
import BoardCardFooter from './footer'
import BoardCardOverlay from './overlay'

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavorite: boolean
}

const BoardCard = ({
  id,
  imageUrl,
  title,
  authorName,
  authorId,
  orgId,
  createdAt,
  isFavorite
}: BoardCardProps) => {
  const { userId } = useAuth()
  const authorLable = userId === authorId ? 'You' : authorName
  const createAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

  const { mutate: favoriteMutate, pending: favoritePending } = useApiMutation(
    api.board.favorite
  )
  const { mutate: unFavoriteMutate, pending: unFavoritePending } =
    useApiMutation(api.board.unFavorite)

  const handleFavorite = () => {
    if (!isFavorite) {
      favoriteMutate({
        id,
        orgId
      })
        .then(() => {
          toast.success('Favorited board')
        })
        .catch(() => {
          toast.error('Fail to favorit')
        })
    } else {
      unFavoriteMutate({
        id
      })
        .then(() => {
          toast.success('UnFavorited board')
        })
        .catch(() => {
          toast.error('Fail to unFavorit')
        })
    }
  }

  return (
    <Link href={`/board/${id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fill" />
          <BoardCardOverlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute right-1 top-1 px-3 py-2 opacity-0 outline-none transition-opacity group-hover:opacity-100">
              <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
            </button>
          </Actions>
        </div>

        <BoardCardFooter
          disabled={favoritePending || unFavoritePending}
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLable}
          createdAtLabel={createAtLabel}
          onClick={handleFavorite}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] overflow-hidden rounded-lg">
      <Skeleton className="size-full" />
    </div>
  )
}

export default BoardCard
