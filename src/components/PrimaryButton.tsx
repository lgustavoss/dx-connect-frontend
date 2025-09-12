import { Button } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'

export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      rounded="lg"
      fontWeight="semibold"
      bg="brand.700"
      color="white"
      _hover={{ bg: 'brand.800' }}
      _active={{ bg: 'brand.900' }}
      {...props}
    />
  )
}


