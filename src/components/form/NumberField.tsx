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
          <input
            type="number"
            value={field.value ?? ''}
            onChange={(e) => {
              const v = e.target.value
              if (v === '') return field.onChange('')
              const num = Number(v)
              if (!Number.isNaN(num)) field.onChange(num)
            }}
            placeholder={placeholder}
            min={min as any}
            max={max as any}
            step={step as any}
            className="dxc-input"
          />
        </Field>
      )}
    />
  )
}


