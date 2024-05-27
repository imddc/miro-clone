import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center gap-x-4 bg-gray-300 p-5">
      <div className="hidden bg-yellow-200 lg:flex lg:flex-1">Search</div>
      <UserButton />
    </div>
  )
}

export default Navbar
