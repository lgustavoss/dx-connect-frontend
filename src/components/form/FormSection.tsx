import { Box, Text } from '@chakra-ui/react'

export interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <Box mb={6}>
      <Box className="dxc-section-title">{title}</Box>
      {description && <Text color="gray.600" mb={3}>{description}</Text>}
      <Box>{children}</Box>
    </Box>
  )
}


