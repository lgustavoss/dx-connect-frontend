Este PR configura o Chakra UI v3 na aplicação e define o tema base com a fonte Inter.

Resumo:
- Instalação do @chakra-ui/react v3 e dependências
- Tema com brand.500 (#0066ff) e fonte Inter
- ChakraProvider configurado no main.tsx (API v3)

Como validar:
- npm install
- npm run dev -> página inicial deve carregar sem erros
- npm run build -> build deve completar com sucesso

Closes #2
