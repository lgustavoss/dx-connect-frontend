import { Controller, useFormContext } from 'react-hook-form'
import Field from './Field'

function applyMask(value: string, mask: 'phone' | 'cep' | 'cnpj') {
  const digits = (value || '').replace(/\D/g, '')
  if (mask === 'phone') {
    // (99) 99999-9999
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15)
  }
  if (mask === 'cep') {
    // 99999-999
    return digits
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9)
  }
  // cnpj 99.999.999/9999-99
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18)
}

export interface MaskedTextFieldProps {
  name: string
  label?: string
  placeholder?: string
  mask: 'phone' | 'cep' | 'cnpj'
  required?: boolean
  helpText?: string
}

export default function MaskedTextField({ name, label, placeholder, mask, required, helpText }: MaskedTextFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} required={required} helpText={helpText} isInvalid={!!fieldState.error} errorMessage={fieldState.error?.message}>
          <input value={applyMask(field.value ?? '', mask)} onChange={(e) => field.onChange(applyMask(e.target.value, mask))} placeholder={placeholder} className="dxc-input" />
        </Field>
      )}
    />
  )
}


