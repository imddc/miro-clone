import React from 'react'
import List from './list'
import NewButton from './new-button'

const DashboardSidebar = () => {
  return (
    <div className="fixed left-0 z-[1] flex h-full w-[60px] flex-col gap-y-4 bg-blue-700 p-3 text-white">
      <List />
      <NewButton />
    </div>
  )
}

export default DashboardSidebar
