# 📊 Visão Geral do Sistema - Diagrama

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SISTEMA DE AGENDAMENTO DE SALAS                  │
│                        Coworking & Reuniões                         │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │         │                  │         │                  │
│    FRONTEND      │◄───────►│     BACKEND      │◄───────►│   DATABASE H2    │
│   (React/Vue/    │  HTTP   │   Spring Boot    │   JPA   │   (Embedded)     │
│    Angular)      │  REST   │      Java 17     │         │                  │
│                  │         │                  │         │                  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
     localhost:3000          localhost:8080/api              ./data/

┌─────────────────────────────────────────────────────────────────────┐
│                         FLUXO DE AUTENTICAÇÃO                       │
└─────────────────────────────────────────────────────────────────────┘

1. Usuário → Cadastro/Login
2. Backend → Gera JWT Token (válido por 12h)
3. Frontend → Armazena token (localStorage)
4. Toda requisição → Header: Authorization: Bearer {token}
5. Backend → Valida token antes de processar

┌─────────────────────────────────────────────────────────────────────┐
│                         MÓDULOS DO SISTEMA                          │
└─────────────────────────────────────────────────────────────────────┘

┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│   👤 USUÁRIOS      │  │   🏢 SALAS         │  │   📅 RESERVAS      │
├────────────────────┤  ├────────────────────┤  ├────────────────────┤
│ • Cadastro         │  │ • Criar sala       │  │ • Criar reserva    │
│ • Login (JWT)      │  │ • Listar salas     │  │ • Listar reservas  │
│ • Autenticação     │  │ • Buscar por ID    │  │ • Filtrar por sala │
│ • Perfil           │  │ • Deletar sala     │  │ • Check-in         │
│                    │  │ • Capacidade       │  │ • Check-out        │
│                    │  │ • Localização      │  │ • Cancelar         │
└────────────────────┘  └────────────────────┘  └────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     JORNADA DO USUÁRIO                              │
└─────────────────────────────────────────────────────────────────────┘

1️⃣ CADASTRO
   └─ POST /v1/auth/cadastro
      └─ Nome, Email, CPF, Senha
         └─ Usuário criado ✓

2️⃣ LOGIN
   └─ POST /v1/auth/login
      └─ Email, Senha
         └─ Recebe Token JWT ✓

3️⃣ VISUALIZAR SALAS
   └─ GET /v1/salas
      └─ Lista todas as salas disponíveis
         └─ Nome, Capacidade, Localização

4️⃣ CRIAR RESERVA
   └─ POST /v1/reserva/sala/{salaId}
      ├─ Data (futura ou hoje)
      ├─ Horário início/fim
      ├─ Número de pessoas
      └─ Dados do solicitante
         ├─ Valida conflitos ✓
         ├─ Valida capacidade ✓
         └─ Reserva confirmada ✓

5️⃣ DIA DA RESERVA
   └─ PATCH /v1/reserva/{id}/check-in
      ├─ Valida data = hoje ✓
      ├─ Valida horário >= início ✓
      └─ Check-in registrado (timestamp)
         └─ Usar sala...
            └─ PATCH /v1/reserva/{id}/check-out
               └─ Check-out registrado ✓

┌─────────────────────────────────────────────────────────────────────┐
│                      VALIDAÇÕES DE NEGÓCIO                          │
└─────────────────────────────────────────────────────────────────────┘

📅 RESERVAS
├─ ❌ Data passada
├─ ❌ Conflito de horário na mesma sala
├─ ❌ Número de pessoas > capacidade da sala
├─ ✅ Data futura ou hoje
└─ ✅ Horário disponível

✓ CHECK-IN
├─ ❌ Data ≠ data da reserva
├─ ❌ Horário < horário de início
├─ ❌ Check-in já realizado
└─ ✅ Data = hoje E horário >= início

✓ CHECK-OUT
├─ ❌ Sem check-in prévio
├─ ❌ Data ≠ data da reserva
├─ ❌ Check-out já realizado
└─ ✅ Check-in feito E data = hoje

┌─────────────────────────────────────────────────────────────────────┐
│                        STACK TECNOLÓGICA                            │
└─────────────────────────────────────────────────────────────────────┘

BACKEND                          FRONTEND (Sugestão)
├─ Java 17                       ├─ React 18 / Vue 3 / Angular 15+
├─ Spring Boot 4.0.2             ├─ Axios / Fetch API
├─ Spring Security               ├─ React Router / Vue Router
├─ Spring Data JPA               ├─ Context API / Vuex / NgRx
├─ Hibernate                     ├─ Material-UI / Vuetify / PrimeNG
├─ H2 Database                   ├─ Date-fns / Moment.js
├─ JWT (Auth)                    ├─ Formik / Vuelidate
├─ MapStruct                     └─ Styled Components / SCSS
├─ Lombok
├─ Bean Validation
└─ Swagger/OpenAPI

┌─────────────────────────────────────────────────────────────────────┐
│                      ENDPOINTS PRINCIPAIS                           │
└─────────────────────────────────────────────────────────────────────┘

AUTH
├─ POST   /v1/auth/cadastro     → Criar usuário
└─ POST   /v1/auth/login        → Login (retorna JWT)

SALAS
├─ POST   /v1/salas             → Criar sala
├─ GET    /v1/salas             → Listar salas
├─ GET    /v1/salas/{id}        → Buscar sala
└─ DELETE /v1/salas/{id}        → Deletar sala

RESERVAS
├─ POST   /v1/reserva/sala/{id}        → Criar reserva
├─ GET    /v1/reserva                  → Listar todas
├─ GET    /v1/reserva/sala/{id}        → Por sala
├─ PATCH  /v1/reserva/{id}/check-in    → Check-in
├─ PATCH  /v1/reserva/{id}/check-out   → Check-out
└─ DELETE /v1/reserva/{id}             → Cancelar

┌─────────────────────────────────────────────────────────────────────┐
│                    MODELO DE DADOS (Simplificado)                   │
└─────────────────────────────────────────────────────────────────────┘

USUARIO                         SALA                         RESERVA
├─ id (UUID)                    ├─ idSala (UUID)             ├─ reservaId (UUID)
├─ nomeCompleto                 ├─ nome                      ├─ salaId (FK)
├─ email (unique)               ├─ capacidade                ├─ dataReserva
├─ cpf (unique)                 ├─ localizacao               ├─ horaInicio
├─ senha (encrypted)            └─ criadorId (FK)            ├─ horaFim
└─ createdAt                                                 ├─ numeroPessoas
                                                             ├─ nomeCliente
                                                             ├─ contatoCliente
                                                             ├─ criadorId (FK)
                                                             ├─ checkIn
                                                             └─ checkOut

┌─────────────────────────────────────────────────────────────────────┐
│                         CASOS DE USO                                │
└─────────────────────────────────────────────────────────────────────┘

🎯 CASO 1: Reunião de Equipe
   Situação: Time de Marketing precisa apresentar campanha
   Ação: Reservar "Sala de Reuniões A" para amanhã 14h-16h
   Resultado: Reserva criada, equipe notificada

🎯 CASO 2: Coworking Diário
   Situação: Freelancer precisa espaço para trabalhar
   Ação: Reservar "Espaço Coworking 1" para hoje 9h-18h
   Resultado: Reserva criada, check-in às 9h, check-out às 18h

🎯 CASO 3: Workshop
   Situação: RH organizando treinamento para 20 pessoas
   Ação: Buscar sala com capacidade >= 20
   Resultado: Encontra "Auditório", cria reserva

🎯 CASO 4: Cancelamento
   Situação: Reunião foi desmarcada
   Ação: Cancelar reserva pelo ID
   Resultado: Reserva removida, sala liberada

┌─────────────────────────────────────────────────────────────────────┐
│                      MÉTRICAS DO SISTEMA                            │
└─────────────────────────────────────────────────────────────────────┘

📊 Dashboards Possíveis (futuras implementações)
├─ Taxa de ocupação por sala
├─ Horários de pico
├─ Salas mais reservadas
├─ Taxa de no-show (reservas sem check-in)
├─ Tempo médio de uso
└─ Reservas por departamento

┌─────────────────────────────────────────────────────────────────────┐
│                     SEGURANÇA & PERFORMANCE                         │
└─────────────────────────────────────────────────────────────────────┘

🔒 SEGURANÇA
├─ Senhas criptografadas (BCrypt)
├─ JWT com expiração (12h)
├─ CORS configurado
├─ Headers de segurança
└─ Validação de entrada

┌─────────────────────────────────────────────────────────────────────┐
│                    AMBIENTE DE DESENVOLVIMENTO                      │
└─────────────────────────────────────────────────────────────────────┘

📁 ESTRUTURA DE PASTAS
booking/
├─ src/main/java/           → Código fonte
│  └─ com.room.booking/
│     ├─ auth/              → Autenticação
│     ├─ core/              → Configs gerais
│     ├─ reserva/           → Módulo de reservas
│     ├─ sala/              → Módulo de salas
│     └─ usuario/           → Módulo de usuários
├─ src/main/resources/      → Configurações
│  └─ application.yaml
├─ data/                    → Banco H2
├─ pom.xml                  → Dependências
├─ README.md               → Guia
├─ QUICK_START.md          → Início rápido
├─ API_EXAMPLES.md         → Exemplos de API
└─ ARCHITECTURE.md         → Arquitetura do sistema

🚀 COMANDOS ÚTEIS
├─ ./mvnw spring-boot:run           → Executar backend
├─ ./mvnw clean install             → Compilar
├─ ./mvnw test                      → Rodar testes
└─ rm -rf data/                     → Resetar banco


┌─────────────────────────────────────────────────────────────────────┐
│                         SUPORTE                                     │
└─────────────────────────────────────────────────────────────────────┘

📚 Documentação
├─ README.md                 → Guia completo
├─ QUICK_START.md           → Início em 5 minutos
├─ API_EXAMPLES.md          → Exemplos de requisições
├─ FRONTEND_INTEGRATION.md  → Como integrar frontend
└─ Swagger UI               → Docs interativa

🆘 Problemas?
├─ Verifique logs do backend
├─ Console do navegador (frontend)
├─ H2 Console (banco de dados)
└─ GitHub Issues / Suporte interno
```

