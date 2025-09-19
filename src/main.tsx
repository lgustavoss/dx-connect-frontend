import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import LoginPage from './pages/Login'
import DesignColorsPage from './pages/DesignColors'
import DashboardPage from './pages/Dashboard'
import CustomersPage from './pages/Customers'
import ChatsPage from './pages/Chats'
import TicketsPage from './pages/Tickets'
import ReportsPage from './pages/Reports'
import PrivateLayout from './layouts/PrivateLayout'
import SettingsPage from './pages/Settings'

const queryClient = new QueryClient()

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/design/colors" element={<DesignColorsPage />} />
              {/* Rota raiz pública: envia para /login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/app/*" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="chats" element={<ChatsPage />} />
                <Route path="tickets" element={<TicketsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
)
