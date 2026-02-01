# 📡 Exemplos de Requisições - API de Agendamento de Salas

## 📌 Configuração Inicial

**Base URL:** `http://localhost:8080/booking-room/api`

**Headers comuns:**
```
Content-Type: application/json
Authorization: Bearer {seu-token-jwt}  # Exceto cadastro e login
```

---

## 👤 Autenticação

### 1. Cadastrar Usuário

```http
POST /v1/auth/cadastro
Content-Type: application/json

{
  "nomeCompleto": "Maria Santos",
  "email": "maria.santos@empresa.com",
  "cpf": "98765432100",
  "senha": "senha@123"
}
```

**Resposta:** `201 Created`

---

### 2. Fazer Login

```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "maria.santos@empresa.com",
  "senha": "senha@123"
}
```

**Resposta:** `200 OK`
```json
{
  "tipo": "Bearer",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgUmF4YWUiLCJzdWIiOiJtYXJpYS5zYW50b3NAZW1wcmVzYS5jb20iLCJub21lQ29tcGxldG8iOiJNYXJpYSBTYW50b3MiLCJpYXQiOjE3Njk4OTg3NTQsImV4cCI6MTc2OTk0MTk1NH0.xx2vSo-iLqoKgiPkCphRfmqODajjPu23XCqhTO0o9bc",
  "usuarioId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

💡 **Copie o token e use nas próximas requisições!**

---

## 🏢 Gestão de Salas

### 3. Criar Sala

```http
POST /v1/salas
Content-Type: application/json
Authorization: Bearer {seu-token}

{
  "nome": "Sala de Reuniões Principal",
  "capacidade": 15,
  "localizacao": "3º Andar - Ala Oeste"
}
```

**Resposta:** `201 Created`

---

### 4. Listar Todas as Salas

```http
GET /v1/salas
Authorization: Bearer {seu-token}
```

**Resposta:** `200 OK`
```json
[
  {
    "idSala": "92512c49-99cb-4b59-8338-a9a14e98c13c",
    "nome": "Sala de Reuniões Principal",
    "capacidade": 15,
    "localizacao": "3º Andar - Ala Oeste",
    "criadorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  {
    "idSala": "88888888-4444-4444-4444-121212121212",
    "nome": "Sala de Coworking 1",
    "capacidade": 20,
    "localizacao": "2º Andar - Centro",
    "criadorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  }
]
```

---

### 5. Buscar Sala por ID

```http
GET /v1/salas/92512c49-99cb-4b59-8338-a9a14e98c13c
Authorization: Bearer {seu-token}
```

**Resposta:** `200 OK`
```json
{
  "idSala": "92512c49-99cb-4b59-8338-a9a14e98c13c",
  "nome": "Sala de Reuniões Principal",
  "capacidade": 15,
  "localizacao": "3º Andar - Ala Oeste",
  "criadorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

---

### 6. Deletar Sala

```http
DELETE /v1/salas/92512c49-99cb-4b59-8338-a9a14e98c13c
Authorization: Bearer {seu-token}
```

**Resposta:** `204 No Content`

---

## 📅 Gestão de Reservas

### 7. Criar Reserva

```http
POST /v1/reserva/sala/92512c49-99cb-4b59-8338-a9a14e98c13c
Content-Type: application/json
Authorization: Bearer {seu-token}

{
  "dataReserva": "2026-02-05",
  "horaInicio": "14:00:00",
  "horaFim": "16:00:00",
  "numeroPessoas": 10,
  "nomeCliente": "Pedro Oliveira",
  "contatoCliente": "pedro.oliveira@empresa.com"
}
```

**Resposta:** `201 Created`

**❌ Erros possíveis:**
```json
// Data passada
{
  "description": "VALIDATION FAILED",
  "message": "Data de reserva deve ser hoje ou uma data futura"
}

// Conflito de horário
{
  "description": "CONFLICT",
  "message": "Conflito de reserva para o período solicitado ou por capacidade."
}

// Capacidade excedida
{
  "description": "CONFLICT",
  "message": "Conflito de reserva para o período solicitado ou por capacidade."
}
```

---

### 8. Listar Todas as Reservas

```http
GET /v1/reserva
Authorization: Bearer {seu-token}
```

**Resposta:** `200 OK`
```json
[
  {
    "reservaId": "11111111-2222-3333-4444-555555555555",
    "salaId": "92512c49-99cb-4b59-8338-a9a14e98c13c",
    "dataReserva": "2026-02-05",
    "horaInicio": "14:00:00",
    "horaFim": "16:00:00",
    "nomeCliente": "Pedro Oliveira",
    "contatoCliente": "pedro.oliveira@empresa.com",
    "criadorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "checkIn": null,
    "checkOut": null
  }
]
```

---

### 9. Listar Reservas por Sala

```http
GET /v1/reserva/sala/92512c49-99cb-4b59-8338-a9a14e98c13c
Authorization: Bearer {seu-token}
```

**Resposta:** `200 OK`
```json
[
  {
    "reservaId": "11111111-2222-3333-4444-555555555555",
    "salaId": "92512c49-99cb-4b59-8338-a9a14e98c13c",
    "dataReserva": "2026-02-05",
    "horaInicio": "14:00:00",
    "horaFim": "16:00:00",
    "nomeCliente": "Pedro Oliveira",
    "contatoCliente": "pedro.oliveira@empresa.com",
    "criadorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "checkIn": null,
    "checkOut": null
  },
  {
    "reservaId": "22222222-3333-4444-5555-666666666666",
    "salaId": "92512c49-99cb-4b59-8338-a9a14e98c13c",
    "dataReserva": "2026-02-06",
    "horaInicio": "10:00:00",
    "horaFim": "12:00:00",
    "nomeCliente": "Ana Costa",
    "contatoCliente": "ana.costa@empresa.com",
    "criadorId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "checkIn": null,
    "checkOut": null
  }
]
```

---

### 10. Fazer Check-in

**⚠️ Condições:**
- Deve ser o **dia da reserva**
- Horário atual deve ser **>= horário de início**

```http
PATCH /v1/reserva/11111111-2222-3333-4444-555555555555/check-in
Authorization: Bearer {seu-token}
```

**Resposta:** `200 OK`

**❌ Erros possíveis:**
```json
// Data incorreta
{
  "description": "BAD REQUEST",
  "message": "Check-in só pode ser realizado na data da reserva (2026-02-05)"
}

// Horário antecipado
{
  "description": "BAD REQUEST",
  "message": "Check-in só pode ser realizado a partir do horário agendado (14:00:00)"
}

// Check-in duplicado
{
  "description": "CONFLICT",
  "message": "Check-in já foi realizado para esta reserva"
}
```

**✅ Após check-in bem-sucedido:**
```json
{
  "reservaId": "11111111-2222-3333-4444-555555555555",
  "checkIn": "2026-02-05T14:15:30",
  "checkOut": null
}
```

---

### 11. Fazer Check-out

**⚠️ Condições:**
- Deve ser o **dia da reserva**
- Check-in deve ter sido **realizado**

```http
PATCH /v1/reserva/11111111-2222-3333-4444-555555555555/check-out
Authorization: Bearer {seu-token}
```

**Resposta:** `200 OK`

**❌ Erros possíveis:**
```json
// Sem check-in
{
  "description": "BAD REQUEST",
  "message": "Não é possível fazer check-out sem ter feito check-in"
}

// Data incorreta
{
  "description": "BAD REQUEST",
  "message": "Check-out só pode ser realizado na data da reserva (2026-02-05)"
}

// Check-out duplicado
{
  "description": "CONFLICT",
  "message": "Check-out já foi realizado para esta reserva"
}
```

**✅ Após check-out bem-sucedido:**
```json
{
  "reservaId": "11111111-2222-3333-4444-555555555555",
  "checkIn": "2026-02-05T14:15:30",
  "checkOut": "2026-02-05T16:05:10"
}
```

---

### 12. Cancelar Reserva

```http
DELETE /v1/reserva/11111111-2222-3333-4444-555555555555
Authorization: Bearer {seu-token}
```

**Resposta:** `204 No Content`

---

## 🧪 Cenários de Teste

### Cenário 1: Fluxo Completo de Reserva

```bash
# 1. Cadastrar usuário
POST /v1/auth/cadastro

# 2. Fazer login
POST /v1/auth/login
# → Guardar token

# 3. Criar sala
POST /v1/salas

# 4. Criar reserva para amanhã
POST /v1/reserva/sala/{salaId}

# 5. Listar reservas
GET /v1/reserva

# 6. No dia da reserva, fazer check-in
PATCH /v1/reserva/{reservaId}/check-in

# 7. Ao sair, fazer check-out
PATCH /v1/reserva/{reservaId}/check-out
```

---

### Cenário 2: Validação de Conflitos

```bash
# 1. Criar reserva das 14h às 16h
POST /v1/reserva/sala/{salaId}
{
  "dataReserva": "2026-02-05",
  "horaInicio": "14:00:00",
  "horaFim": "16:00:00",
  ...
}

# 2. Tentar criar outra reserva no mesmo horário
POST /v1/reserva/sala/{salaId}
{
  "dataReserva": "2026-02-05",
  "horaInicio": "15:00:00",  # Conflito!
  "horaFim": "17:00:00",
  ...
}
# → Deve retornar erro 409 CONFLICT
```

---

### Cenário 3: Validação de Capacidade

```bash
# Sala com capacidade 10 pessoas

POST /v1/reserva/sala/{salaId}
{
  "numeroPessoas": 15,  # Excede capacidade!
  ...
}
# → Deve retornar erro 409 CONFLICT
```

---

## 📊 Códigos de Status HTTP

| Código | Descrição | Quando ocorre |
|--------|-----------|---------------|
| `200` | OK | Requisição bem-sucedida (GET, PATCH) |
| `201` | Created | Recurso criado (POST) |
| `204` | No Content | Recurso deletado (DELETE) |
| `400` | Bad Request | Dados inválidos ou validação falhou |
| `401` | Unauthorized | Token inválido ou ausente |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito de horário ou capacidade |
| `500` | Internal Server Error | Erro no servidor |

---

## 🔧 Ferramentas para Testar

### Postman
1. Importe esta coleção
2. Configure variáveis de ambiente:
   - `baseUrl`: `http://localhost:8080/booking-room/api`
   - `token`: (após login)

### cURL (Terminal)
```bash
# Login
curl -X POST http://localhost:8080/booking-room/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@empresa.com","senha":"senha123"}'

# Criar sala (substitua TOKEN)
curl -X POST http://localhost:8080/booking-room/api/v1/salas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"nome":"Sala 1","capacidade":10,"localizacao":"1º Andar"}'
```

### Swagger UI
Acesse: `http://localhost:8080/booking-room/api/swagger-ui.html`

---

## 💡 Dicas

1. **Guarde o token** após login - expira em 12 horas
2. **Use datas futuras** para criar reservas
3. **Formate horários** como `"HH:mm:ss"` (com aspas!)
4. **UUIDs** são gerados automaticamente pelo backend
5. **Check-in/out** só funcionam no dia da reserva

---

**Happy Testing! 🚀**

