# 🚀 Quick Start Guide

## Começando em 3 passos:

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar variável de ambiente
Verifique se o arquivo `.env` existe com:
```
VITE_API_BASE_URL=http://localhost:8080/booking-room/api
```

### 3️⃣ Rodar o projeto
```bash
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📝 Testando as funcionalidades

### ✅ Cadastro
1. Acesse `/cadastro`
2. Preencha os dados:
   - Nome Completo
   - WhatsApp (apenas números)
   - Email
   - Senha (mínimo 6 caracteres)
   - Confirmar Senha
3. Clique em **Cadastrar**
4. Você será redirecionado para o login

### ✅ Login
1. Acesse `/login`
2. Digite seu email e senha
3. Clique em **Entrar**
4. Você será redirecionado para o dashboard

### 🔐 Token JWT
O token é automaticamente:
- Salvo no localStorage após login
- Incluído em todas as requisições autenticadas
- Removido ao fazer logout ou se expirar

---

## 🎨 Customização de Cores

Para alterar as cores azuis, edite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Seus valores aqui
      }
    }
  }
}
```

---

## 📦 Scripts disponíveis

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview da build de produção
npm run lint       # Executa linter
```

---

## ⚠️ Troubleshooting

### Backend não está respondendo
- Verifique se o backend está rodando em `http://localhost:8080`
- Confirme se a URL está correta no `.env`

### Erro de CORS
- Configure o backend para aceitar requisições de `http://localhost:5173`

### Token inválido
- Limpe o localStorage: `localStorage.clear()`
- Faça login novamente

---

**Pronto para desenvolver! 💙**
