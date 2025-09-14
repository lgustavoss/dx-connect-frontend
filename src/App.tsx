import './App.css'
import { HStack, Text } from '@chakra-ui/react'
import { useAuth } from './hooks/useAuth'
import { useEffect, useState } from 'react'
import { getMe } from './services/authService'
import LayoutShell from './components/LayoutShell'

function App() {
  const { isAuthenticated } = useAuth()
  const [me, setMe] = useState<any | null>(null)
  const [isLoadingMe, setIsLoadingMe] = useState(false)

  useEffect(() => {
    let mounted = true
    if (isAuthenticated) {
      setIsLoadingMe(true)
      getMe()
        .then((data) => { if (mounted) setMe(data) })
        .catch(() => { if (mounted) setMe(null) })
        .finally(() => { if (mounted) setIsLoadingMe(false) })
    } else {
      setMe(null)
    }
    return () => { mounted = false }
  }, [isAuthenticated])
  return (
    <LayoutShell>
      <HStack justify="space-between">
        <Text fontWeight="bold">Início</Text>
      </HStack>
      <Text mt={4}>Boas-vindas ao DX Connect.</Text>
      {isLoadingMe && (
        <Text mt={2} color="gray.500">Carregando dados do usuário...</Text>
      )}
      {me && !isLoadingMe && (
        <Text mt={2} color="gray.600">Usuário: {me?.username ?? me?.email ?? 'autenticado'}</Text>
      )}
    </LayoutShell>
  )
}

export default App
