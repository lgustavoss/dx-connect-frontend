import { HStack, Button } from '@chakra-ui/react'
import PrimaryButton from '../PrimaryButton'

export interface FormActionsProps {
  isSubmitting?: boolean
  onCancel?: () => void
}

export default function FormActions({ isSubmitting, onCancel }: FormActionsProps) {
  return (
    <HStack justify="flex-end" gap={3} mt={4}>
      {onCancel && (
        <Button
          variant="outline"
          borderWidth="1px"
          borderColor="brand.700"
          color="brand.700"
          _hover={{ bg: 'brand.50' }}
          _active={{ bg: 'brand.100' }}
          onClick={onCancel}
        >
          Cancelar
        </Button>
      )}
      <PrimaryButton type="submit" isLoading={!!isSubmitting}>Salvar</PrimaryButton>
    </HStack>
  )
}


