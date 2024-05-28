import Image from 'next/image'
import React from 'react'

const EmptyFavourites = () => {
  return (
    <div className="flex-col-center h-full">
      <Image src="/empty-favourites.svg" height={140} width={140} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">No favourite board</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try favourite a board
      </p>
    </div>
  )
}

export default EmptyFavourites
