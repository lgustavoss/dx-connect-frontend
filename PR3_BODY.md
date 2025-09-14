Este PR implementa a página de Login, AuthProvider, axios com interceptors e roteamento.

Resumo:
- Página /login com React Hook Form + Chakra v3
- AuthProvider com persistência de token
- axios com interceptors e baseURL via .env
- Rotas protegidas e QueryClientProvider

Como validar:
- npm install
- npm run dev -> acessar /login
- (opcional) configurar VITE_API_BASE_URL

Closes #3
