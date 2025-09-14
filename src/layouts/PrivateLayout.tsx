import LayoutShell from '../components/LayoutShell'
import { createElement, useEffect, useMemo, useState } from 'react'
import { HStack, Box, chakra, IconButton } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import DashboardPage from '../pages/Dashboard'
import CustomersPage from '../pages/Customers'
import ChatsPage from '../pages/Chats'
import TicketsPage from '../pages/Tickets'
import ReportsPage from '../pages/Reports'

type TabDef = { title: string; path: string; component: React.ComponentType; fixed?: boolean }

const ROUTES: Record<string, TabDef> = {
  '/app/dashboard': { title: 'Dashboard', path: '/app/dashboard', component: DashboardPage, fixed: true },
  '/app/customers': { title: 'Clientes', path: '/app/customers', component: CustomersPage },
  '/app/chats': { title: 'Chats', path: '/app/chats', component: ChatsPage },
  '/app/tickets': { title: 'Tickets', path: '/app/tickets', component: TicketsPage },
  '/app/reports': { title: 'Relatórios', path: '/app/reports', component: ReportsPage },
}

export default function PrivateLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tabs, setTabs] = useState<TabDef[]>([])
  const [activePath, setActivePath] = useState<string>('/app/dashboard')
  const STORAGE_TABS = 'dxc_tabs_paths'
  const STORAGE_ACTIVE = 'dxc_tabs_active'

  const currentKey = useMemo(() => {
    const paths = Object.keys(ROUTES).sort((a, b) => b.length - a.length)
    const found = paths.find((p) => location.pathname === p)
    return found ?? '/app/dashboard'
  }, [location.pathname])

  // Carrega abas e aba ativa do storage ao iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_TABS)
      const rawActive = localStorage.getItem(STORAGE_ACTIVE)
      if (raw) {
        const paths: string[] = JSON.parse(raw)
        const defs: TabDef[] = []
        paths.forEach((p) => { if (ROUTES[p]) defs.push(ROUTES[p]) })
        if (!defs.find((t) => t.path === '/app/dashboard')) defs.unshift(ROUTES['/app/dashboard'])
        const sanitized = defs.filter(Boolean)
        setTabs(sanitized.length ? sanitized : [ROUTES['/app/dashboard']])
        const act = (rawActive && ROUTES[rawActive]) ? rawActive : '/app/dashboard'
        setActivePath(act)
        if (location.pathname !== act) navigate(act, { replace: true })
        return
      }
    } catch {}
    // Sem estado salvo, inicia com Dashboard
    setTabs([ROUTES['/app/dashboard']])
    setActivePath('/app/dashboard')
    if (location.pathname !== '/app/dashboard') navigate('/app/dashboard', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ao mudar a rota, adiciona a aba correspondente e ativa
  useEffect(() => {
    const def = ROUTES[currentKey] ?? ROUTES['/app/dashboard']
    if (def) {
      setTabs((prev) => (prev.find((t) => t.path === def.path) ? prev : [...prev, def]))
      setActivePath(def.path)
    }
  }, [currentKey])

  // Persiste abas e ativa
  useEffect(() => {
    try {
      const paths = tabs.map((t) => t.path)
      localStorage.setItem(STORAGE_TABS, JSON.stringify(paths))
      localStorage.setItem(STORAGE_ACTIVE, activePath)
    } catch {}
  }, [tabs, activePath])

  function handleSelect(path: string) {
    setActivePath(path)
    if (location.pathname !== path) navigate(path)
  }

  function handleClose(path: string) {
    const def = tabs.find((t) => t.path === path)
    if (def?.fixed) return
    const remaining = tabs.filter((t) => t.path !== path)
    setTabs(remaining)
    if (activePath === path) {
      const next = remaining[remaining.length - 1]?.path || '/app/dashboard'
      setActivePath(next)
      if (location.pathname !== next) navigate(next)
    }
  }

  return (
    <LayoutShell>
      {/* Tab bar (Chakra) */}
      <HStack spacing={1} mb={0} overflowX="auto" overflowY="hidden" borderBottomWidth={0} borderColor="gray.200" pb={0}
              sx={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '::-webkit-scrollbar': { display: 'none' },
              }}>
        {tabs.map((t) => {
          const isActive = activePath === t.path
          return (
            <HStack key={t.path}
                    as={chakra.button}
                    type="button"
                    onClick={() => handleSelect(t.path)}
                    px={3} py={2}
                    roundedTop="md"
                    roundedBottom="0"
                    borderWidth="1px"
                    borderBottomWidth={0}
                    borderColor="gray.200"
                    bg={isActive ? 'white' : 'surface.200'}
                    color={isActive ? 'gray.800' : 'gray.600'}
                    _hover={{ bg: isActive ? 'white' : 'surface.200', color: isActive ? 'gray.900' : 'gray.700' }}
                    _active={{ bg: isActive ? 'white' : 'surface.100' }}
                    transition="background-color 0.2s, color 0.2s"
                    position="relative"
                    top={isActive ? '1px' : '0'}
                    zIndex={isActive ? 1 : 0}
                    boxShadow={isActive ? '0 1px 0 #fff inset' : 'none'}
                    mb={-1}
                    role="group">
              <Box>{t.title}</Box>
              {!t.fixed && (
                <chakra.button type="button"
                               onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleClose(t.path) }}
                               aria-label={`Fechar aba ${t.title}`}
                               bg="transparent" border="0" color="inherit" opacity={isActive ? 0.6 : 0.3}
                               _groupHover={{ opacity: 0.8 }}
                               _hover={{ opacity: 1 }}>
                  ×
                </chakra.button>
              )}
            </HStack>
          )
        })}
        <IconButton aria-label="Nova aba (Dashboard)" title="Nova aba (Dashboard)" size="sm" variant="ghost"
                    onClick={() => handleSelect('/app/dashboard')}
                    icon={<Box as="span" fontSize="lg" lineHeight="1">+</Box>} />
      </HStack>

      {/* Tab contents (preserve state by keeping mounted) */}
      <Box borderWidth="1px" borderTopWidth={0} borderColor="gray.200" rounded="md" roundedTop="0" p={4} bg="white">
        {tabs.map((t) => {
          const Comp = t.component as React.ComponentType
          return (
            <div key={t.path} style={{ display: activePath === t.path ? 'block' : 'none' }}>
              {Comp ? <Comp /> : null}
            </div>
          )
        })}
      </Box>
    </LayoutShell>
  )
}


