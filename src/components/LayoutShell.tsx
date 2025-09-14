import { Box, HStack, IconButton, Input, Stack, Text } from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import PrimaryButton from './PrimaryButton'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  contentPadding?: string
}

function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  }, [key, value])
  return [value, setValue] as const
}

const Icon = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  users: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  ),
  ticket: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h14l2-2V6l-2-2H5a2 2 0 0 0-2 2z" />
      <path d="M13 7v10" />
    </svg>
  ),
  reports: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M7 13l3 3 7-7" />
    </svg>
  ),
}

const navigation = [
  { label: 'Dashboard', path: '/app/dashboard', icon: Icon.dashboard },
  { label: 'Clientes', path: '/app/customers', icon: Icon.users },
  { label: 'Chats', path: '/app/chats', icon: Icon.chat },
  { label: 'Tickets', path: '/app/tickets', icon: Icon.ticket },
  { label: 'Relatórios', path: '/app/reports', icon: Icon.reports },
]

export default function LayoutShell({ children, showSidebar = true, contentPadding = '6' }: LayoutProps) {
  const location = useLocation()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = usePersistentState<boolean>('dxc_sidebar_open', true)
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  const [isTablet, setIsTablet] = useState(() => window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const qDesktop = window.matchMedia('(min-width: 1024px)')
    const qTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
    const qMobile = window.matchMedia('(max-width: 767px)')
    const onChange = () => {
      setIsDesktop(qDesktop.matches)
      setIsTablet(qTablet.matches)
      setIsMobile(qMobile.matches)
    }
    qDesktop.addEventListener('change', onChange)
    qTablet.addEventListener('change', onChange)
    qMobile.addEventListener('change', onChange)
    onChange()
    return () => {
      qDesktop.removeEventListener('change', onChange)
      qTablet.removeEventListener('change', onChange)
      qMobile.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) setIsOpen(false)
    if (isDesktop) setIsDrawerOpen(false)
  }, [isDesktop])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Box minH="100dvh" bg="surface.100">
      {/* Header */}
      <HStack as="header" h="64px" px={4} bg="white" shadow="sm" justify="space-between">
        <HStack gap={3}>
          {showSidebar && (
            <IconButton aria-label={isDesktop ? (isOpen ? 'Recolher menu' : 'Expandir menu') : (isDrawerOpen ? 'Fechar menu' : 'Abrir menu')}
                        onClick={() => (isDesktop ? setIsOpen((v) => !v) : setIsDrawerOpen((v) => !v))}
                        size="sm" variant="ghost">
              {/* ícone simples */}
              <Box as="span" w="18px" h="2px" bg="gray.800" position="relative" _before={{ content: '""', position: 'absolute', w: '18px', h: '2px', bg: 'gray.800', top: '-6px' }} _after={{ content: '""', position: 'absolute', w: '18px', h: '2px', bg: 'gray.800', top: '6px' }} />
            </IconButton>
          )}
          <Link to="/">
            <Text fontWeight="bold">DX Connect</Text>
          </Link>
        </HStack>
        <HStack gap={3}>
          {/* Busca (desktop) */}
          <Box display={{ base: 'none', md: 'block' }}>
            <Input ref={searchRef} placeholder="Buscar..." size="sm" bg="surface.50" _focus={{ bg: 'white' }}
                   onChange={() => {/* debounce simples por input nativo, implementar depois se necessário */}} />
          </Box>
          <PrimaryButton size="sm" onClick={logout}>Sair</PrimaryButton>
        </HStack>
      </HStack>

      <HStack align="stretch" spacing={0}>
        {/* Sidebar */}
        {showSidebar && (
          <Box as="nav" aria-label="Navegação principal"
               w={isDesktop ? (isOpen ? '240px' : '64px') : '100vw'}
               position={isDesktop ? 'relative' : 'fixed'}
               top={isDesktop ? undefined : 0} left={0}
               transform={isDesktop ? 'none' : (isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)')}
               transition="all 0.2s"
               bg="white" borderRightWidth={isDesktop ? '1px' : undefined} minH={isDesktop ? 'calc(100dvh - 64px)' : '100dvh'} zIndex={30} overflow="hidden">
            {/* Barra do drawer (mobile/tablet) */}
            {!isDesktop && (
              <HStack h="64px" px={4} justify="space-between" borderBottomWidth="1px">
                <Text fontWeight="bold">Menu</Text>
                <IconButton aria-label="Fechar menu" size="sm" variant="ghost" onClick={() => setIsDrawerOpen(false)}>
                  <Box as="span" position="relative" w="18px" h="18px">
                    <Box position="absolute" top="8px" w="18px" h="2px" bg="gray.800" transform="rotate(45deg)" />
                    <Box position="absolute" top="8px" w="18px" h="2px" bg="gray.800" transform="rotate(-45deg)" />
                  </Box>
                </IconButton>
              </HStack>
            )}
            <Stack p={3} pt={isDesktop ? 3 : 2}>
              {navigation.map((item) => (
                <NavLink key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                  {({ isActive }) => {
                    const hideLabel = (isTablet && !isDesktop) || (isDesktop && !isOpen)
                    const active = isActive || location.pathname.startsWith(item.path)
                    return (
                      <Box px={hideLabel ? 0 : 3} py={2} rounded="md" display="flex" alignItems="center" gap={3}
                           title={hideLabel ? item.label : undefined}
                           bg={active ? 'brand.50' : 'transparent'}
                           color={active ? 'brand.700' : 'gray.700'} _hover={{ bg: 'brand.50' }} justifyContent={hideLabel ? 'center' : 'flex-start'}>
                        {item.icon}
                        <Box display={hideLabel ? 'none' : 'block'} whiteSpace="nowrap">{item.label}</Box>
                      </Box>
                    )
                  }}
                </NavLink>
              ))}
            </Stack>
          </Box>
        )}

        {/* Overlay para drawer mobile */}
        {isMobile && isDrawerOpen && (
          <Box position="fixed" inset={0} bg="blackAlpha.400" zIndex={20} onClick={() => setIsDrawerOpen(false)} />
        )}

        {/* Main content */}
        <Box as="main" flex="1" p={contentPadding}>
          {children}
        </Box>
      </HStack>
    </Box>
  )
}
