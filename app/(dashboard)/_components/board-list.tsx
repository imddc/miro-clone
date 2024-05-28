import React from 'react'
import EmptyBoards from './empty-boards'
import EmptyFavourites from './empty-favourites'
import EmptySearch from './empty-search'

export interface BoardListSearchParams {
  favourites: string
  search: string
}

interface BoardListProps {
  orgId: string
  query: BoardListSearchParams
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []

  if (!data.length && query.favourites) {
    return <EmptyFavourites />
  }

  if (!data.length && query.search) {
    return <EmptySearch />
  }

  if (!data.length) {
    return <EmptyBoards />
  }

  return <div>BoardList</div>
}

export default BoardList
