# 🚀 Guia Rápido de Início

## ⚡ Start em 5 Minutos

### 1. Backend (1 minuto)

```bash
# Clone ou abra o projeto
cd /caminho/para/booking

# Execute
./mvnw spring-boot:run
```

✅ Backend rodando em: `http://localhost:8080/booking-room/api`

### 2. Frontend (2 minutos)

```bash
# Abra em outra janela/IDE
cd /caminho/para/frontend

# Instale dependências (primeira vez)
npm install

# Execute
npm start
```

✅ Frontend rodando em: `http://localhost:3000` (ou porta do seu framework)

### 3. Primeiro Acesso (2 minutos)

#### Passo 1: Cadastre um usuário
```bash
POST http://localhost:8080/booking-room/api/v1/auth/cadastro

{
  "nomeCompleto": "Admin Sistema",
  "email": "admin@empresa.com",
  "cpf": "12345678900",
  "senha": "admin123"
}
```

#### Passo 2: Faça login
```bash
POST http://localhost:8080/booking-room/api/v1/auth/login

{
  "email": "admin@empresa.com",
  "senha": "admin123"
}
```

📝 **Copie o token** retornado!

#### Passo 3: Crie uma sala
```bash
POST http://localhost:8080/booking-room/api/v1/salas
Authorization: Bearer {SEU-TOKEN-AQUI}

{
  "nome": "Sala de Reuniões 1",
  "capacidade": 10,
  "localizacao": "1º Andar"
}
```

#### Passo 4: Crie uma reserva
```bash
POST http://localhost:8080/booking-room/api/v1/reserva/sala/{ID-DA-SALA}
Authorization: Bearer {SEU-TOKEN-AQUI}

{
  "dataReserva": "2026-02-05",
  "horaInicio": "14:00:00",
  "horaFim": "16:00:00",
  "numeroPessoas": 5,
  "nomeCliente": "João Silva",
  "contatoCliente": "joao@empresa.com"
}
```

---

## 🎯 URLs Essenciais

| Serviço | URL | Uso |
|---------|-----|-----|
| Backend API | http://localhost:8080/booking-room/api | Endpoints REST |
| Swagger Docs | http://localhost:8080/booking-room/api/swagger-ui.html | Testar API |
| H2 Console | http://localhost:8080/booking-room/api/h2-console | Ver banco de dados |
| Frontend | http://localhost:3000 | Interface web |

---

## 🔑 Credenciais Padrão

### H2 Database
- **JDBC URL:** `jdbc:h2:file:./data/bookingdb`
- **Username:** `admin`
- **Password:** `admin`

---

## 💡 Dicas Rápidas

### Resetar Banco de Dados
```bash
# Pare a aplicação
# Delete a pasta data
rm -rf data/
# Reinicie a aplicação
```

### Testar Endpoints (Postman/Insomnia)

1. **Importe** os endpoints do Swagger
2. **Configure** variáveis:
   - `baseUrl`: `http://localhost:8080/booking-room/api`
   - `token`: (copie após fazer login)
3. **Teste** cada endpoint

### Ver Logs da Aplicação

Os logs aparecem no console onde você executou `./mvnw spring-boot:run`

---

## 🐛 Problemas Comuns

| Problema | Solução Rápida |
|----------|----------------|
| Porta 8080 em uso | Mude para 8081 no `application.yaml` |
| CORS Error | Adicione origem do frontend no `CorsConfig.java` |
| Token inválido | Faça login novamente |
| Data rejeitada | Use data futura: `2026-02-05` |

---

## 📞 Ajuda

Se nada funcionar:
1. Verifique se Java 17 está instalado: `java -version`
2. Limpe o projeto: `./mvnw clean install`
3. Delete `data/` e reinicie
4. Consulte o README.md completo

---

**Pronto! Sistema funcionando! 🎉**

