'use client'

import { useOrganization, UserButton } from '@clerk/nextjs'
import InviteButton from './invite-button'
import SearchInput from './search-input'

const Navbar = () => {
  const { organization } = useOrganization()

  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  )
}

export default Navbar
