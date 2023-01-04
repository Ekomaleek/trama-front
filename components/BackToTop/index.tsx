import { useEffect, useState } from 'react'

import { TriangleUpIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

const BackToTop = (): JSX.Element => {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)

  const handleClick = (): void => {
    window.scrollTo(0, 0)
  }

  const scrollListenerHandler = (): void => {
    window.scrollY > 0
      ? setHasScrolled(true)
      : setHasScrolled(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListenerHandler)
    return () => window.removeEventListener('scroll', scrollListenerHandler)
  }, [])

  return (
    <IconButton
      aria-label='Voltar ao topo da página'
      icon={<TriangleUpIcon />}
      onClick={handleClick}
      size='sm'
      position='fixed'
      bottom='4'
      right='4'
      borderRadius='50%'
      opacity={hasScrolled ? 1 : 0}
      transitionProperty='opacity'
      transitionDuration='normal'
    />
  )
}

export default BackToTop
