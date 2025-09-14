import { NumberInput, NumberInputField } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

export interface NumberFieldProps {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  helpText?: string
  min?: number
  max?: number
  step?: number
}

export default function NumberField({ name, label, placeholder, required, helpText, min, max, step }: NumberFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} required={required} helpText={helpText} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
          <NumberInput value={field.value ?? ''} onChange={(v) => field.onChange(v === '' ? '' : Number(v))} min={min} max={max} step={step}>
            <NumberInputField placeholder={placeholder} />
          </NumberInput>
        </Field>
      )}
    />
  )
}


