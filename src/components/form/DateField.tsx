import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

export interface DateFieldProps {
  name: string
  label?: string
  required?: boolean
  helpText?: string
}

export default function DateField({ name, label, required, helpText }: DateFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} required={required} helpText={helpText} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
          <input {...field} type="date" className="dxc-input" />
        </Field>
      )}
    />
  )
}


