import { Select } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

export interface SelectOption { value: string | number; label: string }
export interface SelectFieldProps {
  name: string
  label?: string
  placeholder?: string
  options: SelectOption[]
  required?: boolean
  helpText?: string
}

export default function SelectField({ name, label, placeholder, options, required, helpText }: SelectFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} required={required} helpText={helpText} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
          <Select {...field} placeholder={placeholder}>
            {options.map((opt) => (
              <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
      )}
    />
  )
}


