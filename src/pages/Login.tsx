import { Box, Heading, Input, InputGroup, Stack, Text, chakra } from '@chakra-ui/react'
import PrimaryButton from '../components/PrimaryButton'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

type FormValues = { username: string; password: string }

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({
    defaultValues: { username: 'admin', password: '' },
    mode: 'onChange',
  })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null)
    try {
      await login(values)
      navigate('/', { replace: true })
    } catch (err: any) {
      const data = err?.response?.data
      const serverMsg = data?.detail || data?.message || (typeof data === 'object' && data ? Object.values(data)[0] : null)
      setSubmitError((Array.isArray(serverMsg) ? serverMsg[0] : serverMsg) || 'Falha ao autenticar')
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true })
  }, [isAuthenticated, navigate])

  return (
    <Box minH="100dvh" w="100%" overflow="hidden"
         background="linear-gradient(to bottom right, #101f66, #1c38b0)">
      <Box
        minH="100dvh"
        display={{ base: 'block', md: 'grid' }}
        gridTemplateColumns={{ md: '1fr 1fr' }}
        w="full"
      >
        {/* Painel de destaque (desktop) */}
        <Box display={{ base: 'none', md: 'flex' }} alignItems="center" justifyContent="center" p={12}
             color="white">
          <Stack maxW="lg" gap={3}>
            <Heading size="2xl" letterSpacing="tight">DX Connect</Heading>
            <Text opacity={0.95} fontSize="lg">
              Centralize conversas, tickets e clientes em um só lugar.
            </Text>
          </Stack>
        </Box>

        {/* Área do formulário */}
        <Box display="grid" placeItems="center" p={{ base: 6, md: 12 }}>
          <Box w="full" maxW="md" bg="white" p={{ base: 6, md: 8 }} rounded="2xl" shadow="xl">
            <Stack as="form" gap={6} onSubmit={handleSubmit(onSubmit)}>
              <Heading size="lg" textAlign="left">Bem-vindo de volta</Heading>
              <Stack>
                <Input size="lg" placeholder="Usuário" bg="gray.50" _focus={{ bg: 'white' }}
                       {...register('username', { required: 'Informe seu usuário' })} />
                {errors.username && <Text color="red.500" fontSize="sm">{errors.username.message}</Text>}
              </Stack>
              <Stack>
                <InputGroup>
                  <Box position="relative" w="full">
                    <Input size="lg" type={showPassword ? 'text' : 'password'} placeholder="Senha" bg="gray.50" _focus={{ bg: 'white' }} pr="2.75rem"
                           {...register('password', { required: 'Informe sua senha' })} />
                    <chakra.button
                         type="button"
                         aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                         onClick={() => setShowPassword((v) => !v)}
                         h="2rem"
                         w="2rem"
                         position="absolute"
                         top="50%"
                         right="0.5rem"
                         transform="translateY(-50%)"
                         display="inline-flex"
                         alignItems="center"
                         justifyContent="center"
                         borderRadius="md"
                         color="brand.700"
                         _hover={{ color: 'brand.800', bg: 'transparent' }}
                         _active={{ bg: 'transparent' }}
                         transition="colors 0.2s ease"
                         zIndex={10}
                         opacity={1}>
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5Zm0 12.75a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Zm0-8.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                          <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                          <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5Zm0 12.75a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Zm0-8.25a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                        </svg>
                      )}
                    </chakra.button>
                  </Box>
                </InputGroup>
                {errors.password && <Text color="red.500" fontSize="sm">{errors.password.message}</Text>}
              </Stack>
              {submitError && <Text color="red.600" fontSize="sm">{submitError}</Text>}
              <PrimaryButton size="lg" type="submit" loading={isSubmitting} disabled={!isValid || isSubmitting}>
                Entrar
              </PrimaryButton>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Ao continuar, você concorda com nossos Termos e Política de Privacidade.
              </Text>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


