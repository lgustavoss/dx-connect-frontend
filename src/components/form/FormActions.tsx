import { HStack, Button } from '@chakra-ui/react'

export interface FormActionsProps {
  isSubmitting?: boolean
  onCancel?: () => void
}

export default function FormActions({ isSubmitting, onCancel }: FormActionsProps) {
  return (
    <HStack justify="flex-end" gap={3} mt={4}>
      {onCancel && <Button variant="outline" onClick={onCancel}>Cancelar</Button>}
      <Button type="submit" isLoading={!!isSubmitting}>Salvar</Button>
    </HStack>
  )
}


