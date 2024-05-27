'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Input } from '~/components/ui/input'

const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebounceValue(value, 500)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: debouncedValue
        }
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  })

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="search board"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchInput
