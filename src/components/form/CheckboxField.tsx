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
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
            <span>{label}</span>
          </label>
        </Field>
      )}
    />
  )
}


