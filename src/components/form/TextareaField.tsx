import { Textarea } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

export interface TextareaFieldProps {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  helpText?: string
}

export default function TextareaField({ name, label, placeholder, required, helpText }: TextareaFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} required={required} helpText={helpText} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
          <Textarea {...field} placeholder={placeholder} />
        </Field>
      )}
    />
  )
}


