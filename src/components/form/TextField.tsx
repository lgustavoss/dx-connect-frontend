import { Input } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

export interface TextFieldProps {
  name: string
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  helpText?: string
}

export default function TextField({ name, label, placeholder, type = 'text', required, helpText }: TextFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} required={required} helpText={helpText} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
          <Input {...field} type={type} placeholder={placeholder} />
        </Field>
      )}
    />
  )
}


