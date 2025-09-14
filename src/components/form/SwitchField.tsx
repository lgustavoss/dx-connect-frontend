import { HStack, Switch, Text } from '@chakra-ui/react'
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
          <HStack>
            <Switch isChecked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
            <Text>{field.value ? 'Ativado' : 'Desativado'}</Text>
          </HStack>
        </Field>
      )}
    />
  )
}


