import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

export interface SwitchFieldProps {
  name: string
  label?: string
  helpText?: string
}

export default function SwitchField({ name, label, helpText }: SwitchFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field name={name} label={label} helpText={helpText}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
            <span>{field.value ? 'Ativado' : 'Desativado'}</span>
          </label>
        </Field>
      )}
    />
  )
}


