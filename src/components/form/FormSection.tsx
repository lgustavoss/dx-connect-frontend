import { Box, Heading, Text } from '@chakra-ui/react'

export interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <Box mb={6}>
      <Heading size="sm" mb={1}>{title}</Heading>
      {description && <Text color="gray.600" mb={3}>{description}</Text>}
      <Box>{children}</Box>
    </Box>
  )
}


