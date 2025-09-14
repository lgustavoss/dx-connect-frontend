Este PR implementa a página de Login, AuthProvider, axios com interceptors e roteamento.

Resumo:
- Página /login com React Hook Form + Chakra v3
- AuthProvider com persistência de token
- axios com interceptors e baseURL via .env
- Rotas protegidas e QueryClientProvider
- Refresh de token com coalescing e retry da requisição original

Notas de CORS / Autenticação:
- Front envia JWT no header Authorization (sem cookies)
- Sem uso de withCredentials no frontend
- Backend liberou as origens do front via CORS (localhost:5173)

Como validar:
- npm install
- npm run dev -> acessar /login
- (opcional) configurar VITE_API_BASE_URL

Closes #3
