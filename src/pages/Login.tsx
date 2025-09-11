import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type FormValues = { email: string; password: string }

export default function LoginPage() {
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
  })
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null)
    try {
      await login(values)
    } catch (err: any) {
      setSubmitError(err?.response?.data?.message ?? 'Falha ao autenticar')
    }
  }

  return (
    <Box minH="100dvh" display="grid" placeItems="center" bg="gray.50" p={4}>
      <Box w="full" maxW="sm" bg="white" p={6} rounded="md" shadow="md">
        <Stack as="form" gap={4} onSubmit={handleSubmit(onSubmit)}>
          <Heading size="md" textAlign="center">Acessar sua conta</Heading>
          <Stack>
            <Input type="email" placeholder="E-mail" {...register('email', { required: 'Informe seu e-mail' })} />
            {errors.email && <Text color="red.500" fontSize="sm">{errors.email.message}</Text>}
          </Stack>
          <Stack>
            <Input type="password" placeholder="Senha" {...register('password', { required: 'Informe sua senha' })} />
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password.message}</Text>}
          </Stack>
          {submitError && <Text color="red.600" fontSize="sm">{submitError}</Text>}
          <Button type="submit" colorScheme="blue" loading={isSubmitting}>Entrar</Button>
        </Stack>
      </Box>
    </Box>
  )
}


