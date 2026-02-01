# 🏢 Booking Room - Sistema de Agendamento de Salas

Sistema frontend moderno para agendamento de salas acadêmicas, desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultra-rápida
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend da API rodando em `http://localhost:8080`

## 🔧 Instalação

```bash
# Instale as dependências
npm install
```

## ⚙️ Configuração

Configure a URL da API no arquivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/booking-room/api
```

## 🎯 Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

O projeto estará disponível em: **http://localhost:5173**

## 📱 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Tela de Login
- [x] Tela de Cadastro
- [x] Gerenciamento de token JWT
- [x] Proteção de rotas privadas
- [x] Logout automático em token expirado

### ✅ Gerenciamento de Salas
- [x] Listar todas as salas
- [x] Criar nova sala
- [x] Excluir sala
- [x] Estatísticas (total, capacidade)
- [x] Design responsivo com cards

### ✅ Sistema de Reservas
- [x] Criar reserva de sala
- [x] Listar minhas reservas
- [x] Cancelar reserva
- [x] Separação: próximas vs finalizadas
- [x] Indicador visual de reservas "hoje"
- [x] Validações completas

### 🎨 Design
- [x] Tema azul profissional
- [x] Interface responsiva
- [x] Animações e transições suaves
- [x] Feedback visual para ações do usuário
- [x] Validação de formulários em tempo real
- [x] Estados de loading, erro e vazio

## 🔐 Endpoints Utilizados

### Autenticação
- `POST /v1/auth/login` - Realizar login
- `POST /v1/auth/cadastro` - Cadastrar novo usuário

### Salas
- `GET /v1/salas` - Listar todas as salas
- `POST /v1/salas` - Criar nova sala
- `DELETE /v1/salas/{salaId}` - Excluir sala

### Reservas
- `GET /v1/reserva` - Listar todas as reservas
- `GET /v1/reserva/sala/{salaId}` - Listar reservas de uma sala
- `POST /v1/reserva/sala/{salaId}` - Criar reserva
- `DELETE /v1/reserva/{reservaId}` - Cancelar reserva

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── PrivateRoute.tsx
│   ├── CardSala.tsx
│   ├── CardReserva.tsx
│   ├── ModalCriarSala.tsx
│   └── ModalReservarSala.tsx
├── contexts/           # Contextos React
│   └── AuthContext.tsx
├── pages/              # Páginas da aplicação
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Dashboard.tsx
│   ├── Salas.tsx
│   └── MinhasReservas.tsx
├── services/           # Serviços e APIs
│   ├── api.ts
│   ├── auth.service.ts
│   ├── sala.service.ts
│   └── reserva.service.ts
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Componente principal
├── main.tsx           # Entry point
└── index.css          # Estilos globais
```

## 🎨 Paleta de Cores (Tema Azul)

```javascript
primary: {
  50:  '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',  // Azul principal
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
}
```

## 🔒 Autenticação

O sistema utiliza JWT (JSON Web Token) para autenticação:

1. Após login bem-sucedido, o token é armazenado no `localStorage`
2. Todas as requisições subsequentes incluem o token no header `Authorization: Bearer <token>`
3. Em caso de token expirado (401), o usuário é redirecionado para o login
4. O contexto `AuthContext` gerencia o estado de autenticação globalmente

## 🛣️ Rotas

| Rota | Componente | Proteção |
|------|-----------|----------|
| `/` | Redirect → `/login` | Pública |
| `/login` | Login | Pública |
| `/cadastro` | Cadastro | Pública |
| `/dashboard` | Dashboard | Privada |
| `/salas` | Salas | Privada |
| `/minhas-reservas` | MinhasReservas | Privada |

## 📝 Validações de Formulários

### Login
- Email: formato válido obrigatório
- Senha: mínimo 6 caracteres

### Cadastro
- Nome Completo: mínimo 3 caracteres
- WhatsApp: apenas números (10-11 dígitos)
- Email: formato válido obrigatório
- Senha: mínimo 6 caracteres
- Confirmação de senha: deve coincidir

## 🚧 Próximas Funcionalidades

- [ ] Editar sala existente
- [ ] Editar reserva
- [ ] Filtros e busca
- [ ] Visualização em calendário
- [ ] Verificação de conflitos de horário
- [ ] Notificações de lembrete
- [ ] Recorrência de reservas
- [ ] Exportar relatórios

---

**Desenvolvido com ❤️ para atividade acadêmica**

