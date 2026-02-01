## 🎨 Telas Desenvolvidas

### 1. Login (`/login`)
![Login](docs/login-preview.png)

**Recursos:**
- ✨ Design moderno com gradiente azul
- 🔒 Validação de email e senha em tempo real
- 💬 Mensagens de erro personalizadas
- 🎯 Redirecionamento automático após login
- 📱 Totalmente responsivo

**Campos:**
- Email (obrigatório, formato válido)
- Senha (obrigatório, mínimo 6 caracteres)

---

### 2. Cadastro (`/cadastro`)
![Cadastro](docs/cadastro-preview.png)

**Recursos:**
- ✅ Feedback visual de sucesso
- 🔄 Validação completa de formulário
- 📞 Máscara para WhatsApp
- 🔐 Confirmação de senha
- ⏱️ Redirecionamento automático após sucesso

**Campos:**
- Nome Completo (obrigatório, mín. 3 caracteres)
- WhatsApp (obrigatório, apenas números)
- Email (obrigatório, formato válido)
- Senha (obrigatório, mín. 6 caracteres)
- Confirmar Senha (deve coincidir)

---

### 3. Dashboard (`/dashboard`)
![Dashboard](docs/dashboard-preview.png)

**Recursos:**
- 🔐 Rota protegida (requer autenticação)
- 🏠 Página inicial após login
- 📊 Layout preparado para futuras funcionalidades

**Próximas implementações:**
- Listagem de salas
- Criação de reservas
- Minhas reservas
- Gerenciamento (admin)

---

## 🔐 Fluxo de Autenticação

```
┌─────────────┐
│   Início    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Login /   │◄────┐
│  Cadastro   │     │
└──────┬──────┘     │
       │            │
       ▼            │
┌─────────────┐     │
│ Autenticado?│─NO──┘
└──────┬──────┘
       │ YES
       ▼
┌─────────────┐
│  Dashboard  │
└─────────────┘
```

## 🎨 Tema de Cores

O design segue uma paleta azul profissional e moderna:

- **Primary 600** (`#2563eb`) - Botões principais
- **Primary 700** (`#1d4ed8`) - Hover states
- **Primary 800-900** - Gradientes de fundo
- **Gray scales** - Textos e bordas

## 📱 Responsividade

Todas as telas são totalmente responsivas:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1920px+)

## ⌨️ Atalhos de Teclado

- `Tab` - Navegar entre campos
- `Enter` - Submeter formulário
- `Esc` - Limpar mensagens de erro (planejado)

## 🔒 Segurança

- ✅ Token JWT armazenado com segurança
- ✅ Interceptor para adicionar token automaticamente
- ✅ Logout automático em token expirado
- ✅ Validação de inputs no frontend
- ✅ Proteção de rotas privadas
