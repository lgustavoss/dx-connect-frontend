import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export interface FieldProps {
  name: string
  label?: ReactNode
  helpText?: ReactNode
  required?: boolean
  isInvalid?: boolean
  errorMessage?: ReactNode
  children: ReactNode
}

export default function Field(props: FieldProps) {
  const { name, label, helpText, required, isInvalid, errorMessage, children } = props
  return (
    <FormControl id={name} isRequired={required} invalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
      {isInvalid && errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  )
}


