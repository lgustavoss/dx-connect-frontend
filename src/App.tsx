import './App.css'
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { useAuth } from './hooks/useAuth'

function App() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <Box p={6}>
      <HStack justify="space-between">
        <Text fontWeight="bold">DX Connect</Text>
        {isAuthenticated && <Button size="sm" onClick={logout}>Sair</Button>}
      </HStack>
      <Text mt={4}>Boas-vindas ao DX Connect.</Text>
    </Box>
  )
}

export default App
