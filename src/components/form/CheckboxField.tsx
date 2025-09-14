import { Checkbox } from '@chakra-ui/react'
import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

export interface CheckboxFieldProps {
  name: string
  label?: string
  helpText?: string
}

export default function CheckboxField({ name, label, helpText }: CheckboxFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field name={name} helpText={helpText}>
          <Checkbox isChecked={!!field.value} onChange={(e) => field.onChange(e.target.checked)}>{label}</Checkbox>
        </Field>
      )}
    />
  )
}


