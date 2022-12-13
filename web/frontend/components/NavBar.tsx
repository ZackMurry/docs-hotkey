import { FC, FormEvent, useState } from 'react'
import { Flex, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NavBar: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchValue)}`)
  }

  return (
    <Flex pl='10vw' pr='10vw' w='100%' alignItems='center' justifyContent='flex-start' bgColor='#f5f5f5'>
      <Link href='/'>
        <Text fontFamily='DM Sans' fontSize='42px' fontWeight='black'>
        Docs Hotkey
        </Text>
      </Link>
    </Flex>
  )
}

export default NavBar
