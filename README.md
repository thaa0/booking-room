# 🏢 Sistema de Agendamento de Salas - Coworking

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-brightgreen)
![H2 Database](https://img.shields.io/badge/H2-Database-blue)
![Maven](https://img.shields.io/badge/Maven-Build-red)

Sistema completo de **agendamento de salas para coworking** e reuniões, desenvolvido para uso interno de empresas que precisam gerenciar a reserva de seus espaços compartilhados.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Como Executar o Backend](#-como-executar-o-backend)
- [Como Executar o Frontend](#-como-executar-o-frontend)
- [Endpoints da API](#-endpoints-da-api)
- [Fluxo de Uso](#-fluxo-de-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Banco de Dados](#-banco-de-dados)
- [Segurança](#-segurança)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Sobre o Projeto

Este sistema foi desenvolvido para **empresas que utilizam modelo de coworking interno** ou que possuem múltiplas salas de reunião que precisam ser compartilhadas entre equipes.

### Contexto de Uso

- 🏢 **Visão de Empresa Única**: Todos os usuários pertencem à mesma organização
- 👥 **Múltiplos Usuários**: Colaboradores podem criar reservas independentemente
- 📅 **Gestão Centralizada**: Visualização e controle de todas as reservas
- ✅ **Check-in/Check-out**: Controle de presença e utilização efetiva das salas

### Casos de Uso

1. **Equipe de Marketing** precisa reservar a sala de reuniões para apresentação de campanha
2. **Time de Desenvolvimento** agenda a sala de coworking para sprint planning
3. **RH** controla a ocupação das salas e evita conflitos de agendamento
4. **Gestores** acompanham o uso das salas através do histórico de check-ins

---

## ✨ Funcionalidades

### 👤 Gestão de Usuários
- ✅ Cadastro de usuários (colaboradores da empresa)
- ✅ Autenticação via JWT (JSON Web Token)
- ✅ Perfil de usuário com informações da empresa

### 🏢 Gestão de Salas
- ✅ Cadastro de salas (nome, capacidade, localização)
- ✅ Listagem de salas disponíveis
- ✅ Visualização de detalhes das salas
- ✅ Exclusão de salas

### 📅 Gestão de Reservas
- ✅ **Criar reserva** com data, horário, número de pessoas
- ✅ **Listar todas as reservas** do sistema
- ✅ **Listar reservas por sala** específica
- ✅ **Cancelar reserva**
- ✅ **Check-in** (confirmar presença)
- ✅ **Check-out** (finalizar uso)

### 🔒 Validações de Negócio
- ✅ Impede reservas em datas passadas
- ✅ Impede conflitos de horário na mesma sala
- ✅ Valida capacidade da sala vs. número de pessoas
- ✅ Check-in só no dia e horário da reserva
- ✅ Check-out só após check-in

---

## 🛠 Tecnologias Utilizadas

### Backend
- **Java 17** - Linguagem de programação
- **Spring Boot 4.0.2** - Framework principal
- **Spring Security** - Autenticação e autorização
- **Spring Data JPA** - Persistência de dados
- **Hibernate** - ORM (Object-Relational Mapping)
- **H2 Database** - Banco de dados embarcado
- **JWT (JSON Web Token)** - Autenticação stateless
- **MapStruct 1.5.5** - Mapeamento de objetos
- **Lombok** - Redução de código boilerplate
- **Bean Validation** - Validação de dados
- **Swagger/OpenAPI** - Documentação da API

### Arquitetura
- **Clean Architecture** - Separação de responsabilidades
- **Domain-Driven Design (DDD)** - Modelagem de domínio
- **RESTful API** - Comunicação via HTTP

---

## 📋 Pré-requisitos

### Para o Backend

- ☕ **Java 17 ou superior** instalado
  ```bash
  java -version
  ```
  
- 📦 **Maven 3.6+** (ou usar o wrapper `mvnw` incluído no projeto)
  ```bash
  mvn -version
  ```

- 💻 **IDE recomendada**: IntelliJ IDEA, Eclipse ou VS Code

### Para o Frontend

- 🌐 **Navegador moderno** (Chrome, Firefox, Edge)
- 🚀 Tecnologia específica depende da implementação do frontend
  - Se for **React**: Node.js 16+
  - Se for **Angular**: Node.js 16+ e Angular CLI
  - Se for **Vue**: Node.js 16+ e Vue CLI

---

## 🚀 Como Executar o Backend

### Opção 1: Usando IntelliJ IDEA (Recomendado)

1. **Abra o projeto**
   ```
   File → Open → Selecione a pasta 'booking'
   ```

2. **Aguarde o Maven baixar as dependências**
   - O IntelliJ detectará automaticamente o `pom.xml`
   - Aguarde a barra de progresso no canto inferior direito

3. **Configure o Java 17**
   ```
   File → Project Structure → Project → SDK: Java 17
   ```

4. **Execute a aplicação**
   - Localize a classe `BookingApplication.java`
   - Clique com botão direito → `Run 'BookingApplication'`
   - Ou use o atalho: `Shift + F10`

5. **Verifique se subiu corretamente**
   - Console deve mostrar: `Started BookingApplication in X seconds`
   - Porta: `8080`
   - URL Base: `http://localhost:8080/booking-room/api`

### Opção 2: Usando Eclipse

1. **Importe o projeto**
   ```
   File → Import → Maven → Existing Maven Projects
   Selecione a pasta 'booking'
   ```

2. **Aguarde a sincronização do Maven**

3. **Execute a aplicação**
   - Clique com botão direito em `BookingApplication.java`
   - `Run As → Java Application`

### Opção 3: Via Terminal/CMD

1. **Navegue até a pasta do projeto**
   ```bash
   cd /caminho/para/booking
   ```

2. **Execute com Maven Wrapper (Linux/Mac)**
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Execute com Maven Wrapper (Windows)**
   ```cmd
   mvnw.cmd spring-boot:run
   ```

4. **Ou compile e execute manualmente**
   ```bash
   ./mvnw clean package
   java -jar target/booking-0.0.1-SNAPSHOT.jar
   ```

### Verificação da Execução

✅ **Backend rodando com sucesso quando ver:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v4.0.2)

[...] Started BookingApplication in 5.123 seconds
```

### URLs Importantes do Backend

| Serviço | URL | Descrição |
|---------|-----|-----------|
| **API Base** | `http://localhost:8080/booking-room/api` | URL base de todos os endpoints |
| **Swagger UI** | `http://localhost:8080/booking-room/api/swagger-ui.html` | Documentação interativa da API |
| **H2 Console** | `http://localhost:8080/booking-room/api/h2-console` | Console do banco de dados |

**Credenciais do H2 Console:**
- JDBC URL: `jdbc:h2:file:./data/bookingdb`
- Username: `admin`
- Password: `admin`

---

## 🎨 Como Executar o Frontend

### Frontend em Projeto Separado

Se o frontend está em uma pasta separada (recomendado):

#### React

1. **Abra o projeto do frontend em outra IDE/Terminal**
   ```bash
   cd /caminho/para/frontend-react
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure a URL do backend**
   - Edite o arquivo `.env` ou `config.js`
   ```javascript
   REACT_APP_API_URL=http://localhost:8080/booking-room/api
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

#### Angular

1. **Abra o projeto do frontend**
   ```bash
   cd /caminho/para/frontend-angular
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure a URL do backend**
   - Edite `src/environments/environment.ts`
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/booking-room/api'
   };
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   ng serve
   ```

5. **Acesse no navegador**
   ```
   http://localhost:4200
   ```

#### Vue.js

1. **Abra o projeto do frontend**
   ```bash
   cd /caminho/para/frontend-vue
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure a URL do backend**
   - Edite `.env.development`
   ```
   VUE_APP_API_URL=http://localhost:8080/booking-room/api
   ```

4. **Execute o servidor de desenvolvimento**
   ```bash
   npm run serve
   ```

5. **Acesse no navegador**
   ```
   http://localhost:8080
   ```

### ⚠️ Importante: CORS

O backend já está configurado para aceitar requisições do frontend. Se houver problemas de CORS, verifique a classe `CorsConfig.java`.

---

## 📡 Endpoints da API

### Autenticação (`/v1/auth`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/v1/auth/cadastro` | Cadastrar novo usuário | ❌ |
| `POST` | `/v1/auth/login` | Fazer login (retorna JWT) | ❌ |

#### Exemplo: Cadastro
```json
POST /booking-room/api/v1/auth/cadastro

{
  "nomeCompleto": "João Silva",
  "email": "joao.silva@empresa.com",
  "cpf": "12345678900",
  "senha": "senha123"
}
```

#### Exemplo: Login
```json
POST /booking-room/api/v1/auth/login

{
  "email": "joao.silva@empresa.com",
  "senha": "senha123"
}

Resposta:
{
  "tipo": "Bearer",
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "usuarioId": "uuid-do-usuario"
}
```

### Salas (`/v1/salas`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/v1/salas` | Criar sala | ✅ |
| `GET` | `/v1/salas` | Listar todas as salas | ✅ |
| `GET` | `/v1/salas/{id}` | Buscar sala por ID | ✅ |
| `DELETE` | `/v1/salas/{id}` | Deletar sala | ✅ |

#### Exemplo: Criar Sala
```json
POST /booking-room/api/v1/salas
Authorization: Bearer {seu-token-jwt}

{
  "nome": "Sala de Reuniões A",
  "capacidade": 10,
  "localizacao": "2º Andar - Ala Norte"
}
```

### Reservas (`/v1/reserva`)

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/v1/reserva/sala/{salaId}` | Criar reserva | ✅ |
| `GET` | `/v1/reserva` | Listar todas as reservas | ✅ |
| `GET` | `/v1/reserva/sala/{salaId}` | Listar reservas de uma sala | ✅ |
| `DELETE` | `/v1/reserva/{reservaId}` | Cancelar reserva | ✅ |
| `PATCH` | `/v1/reserva/{reservaId}/check-in` | Fazer check-in | ✅ |
| `PATCH` | `/v1/reserva/{reservaId}/check-out` | Fazer check-out | ✅ |

#### Exemplo: Criar Reserva
```json
POST /booking-room/api/v1/reserva/sala/92512c49-99cb-4b59-8338-a9a14e98c13c
Authorization: Bearer {seu-token-jwt}

{
  "dataReserva": "2026-02-05",
  "horaInicio": "14:00:00",
  "horaFim": "16:00:00",
  "numeroPessoas": 8,
  "nomeCliente": "João Silva",
  "contatoCliente": "joao.silva@empresa.com"
}
```

#### Exemplo: Check-in
```bash
PATCH /booking-room/api/v1/reserva/{reservaId}/check-in
Authorization: Bearer {seu-token-jwt}

# Só funciona se:
# - Data atual = data da reserva
# - Horário atual >= horário de início da reserva
```

---

## 🔄 Fluxo de Uso

### 1️⃣ Configuração Inicial

```
Administrador → Cadastra usuários da empresa
              → Cadastra salas disponíveis
```

### 2️⃣ Fluxo de Reserva

```
Usuário → Faz login
        → Visualiza salas disponíveis
        → Cria reserva para data/horário futuro
        → Sistema valida:
            ✓ Data não é passada
            ✓ Não há conflito de horário
            ✓ Capacidade da sala é suficiente
        → Reserva confirmada
```

### 3️⃣ Dia da Reserva

```
Usuário → Chega na sala
        → Faz check-in (confirma presença)
        → Sistema valida:
            ✓ É o dia da reserva
            ✓ Horário atual >= horário de início
        → Utiliza a sala
        → Faz check-out ao sair
        → Sistema registra horário de saída
```

### 4️⃣ Gestão e Consultas

```
Gestores → Listam todas as reservas
         → Filtram por sala
         → Verificam histórico de check-ins
         → Cancelam reservas se necessário
```

---

## 📁 Estrutura do Projeto

```
booking/
├── src/
│   ├── main/
│   │   ├── java/com/room/booking/
│   │   │   ├── auth/                    # Autenticação e JWT
│   │   │   │   ├── domain/
│   │   │   │   └── service/
│   │   │   ├── core/                    # Configurações globais
│   │   │   │   ├── config/              # CORS, Security, Swagger
│   │   │   │   └── handler/             # Exception handlers
│   │   │   ├── reserva/                 # Domínio de Reservas
│   │   │   │   ├── application/
│   │   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   │   ├── service/         # Lógica de negócio
│   │   │   │   │   └── repository/      # Interfaces
│   │   │   │   ├── domain/              # Entidades
│   │   │   │   └── infra/               # Implementação JPA
│   │   │   ├── sala/                    # Domínio de Salas
│   │   │   │   ├── application/
│   │   │   │   ├── domain/
│   │   │   │   └── infra/
│   │   │   └── usuario/                 # Domínio de Usuários
│   │   │       ├── application/
│   │   │       ├── domain/
│   │   │       └── infra/
│   │   └── resources/
│   │       └── application.yaml         # Configurações
│   └── test/                            # Testes
├── data/                                # Banco de dados H2
├── pom.xml                              # Dependências Maven
└── README.md                            # Este arquivo
```

### Arquitetura em Camadas

```
┌─────────────────────────────────────┐
│         Controller Layer            │  ← REST endpoints
├─────────────────────────────────────┤
│         Application Layer           │  ← Lógica de negócio
├─────────────────────────────────────┤
│         Domain Layer                │  ← Entidades e regras
├─────────────────────────────────────┤
│         Infrastructure Layer        │  ← JPA, Database
└─────────────────────────────────────┘
```

---

## 🗄️ Banco de Dados

### H2 Database (Desenvolvimento)

O projeto usa **H2** - um banco de dados em memória/arquivo, ideal para desenvolvimento.

**Características:**
- ✅ Não requer instalação separada
- ✅ Dados persistidos em arquivo (`./data/bookingdb.mv.db`)
- ✅ Console web integrado
- ✅ Fácil de resetar (deletar pasta `data/`)

### Schema Principal

#### Tabela: `USUARIO`
```sql
- id (UUID, PK)
- nome_completo (VARCHAR)
- email (VARCHAR, UNIQUE)
- cpf (VARCHAR, UNIQUE)
- senha (VARCHAR, encrypted)
```

#### Tabela: `SALA`
```sql
- id_sala (UUID, PK)
- nome (VARCHAR)
- capacidade (INTEGER)
- localizacao (VARCHAR)
- criador_id (UUID, FK → USUARIO)
```

#### Tabela: `RESERVA`
```sql
- reserva_id (UUID, PK)
- sala_id (UUID, FK → SALA)
- data_reserva (DATE)
- hora_inicio (TIME)
- hora_fim (TIME)
- numero_pessoas (INTEGER)
- nome_cliente (VARCHAR)
- contato_cliente (VARCHAR)
- criador_id (UUID, FK → USUARIO)
- check_in (TIMESTAMP)
- check_out (TIMESTAMP)
```

### Resetar Banco de Dados

Se precisar resetar completamente o banco:

```bash
# Linux/Mac
rm -rf data/

# Windows
rmdir /s data
```

Na próxima execução, o Hibernate criará o schema novamente.

---

## 🔒 Segurança

### JWT (JSON Web Token)

O sistema usa **autenticação stateless** via JWT.

**Fluxo:**
1. Usuário faz login → Recebe token JWT
2. Frontend armazena token (localStorage/sessionStorage)
3. Toda requisição envia: `Authorization: Bearer {token}`
4. Backend valida token e libera acesso

**Configurações JWT:**
- **Expiração padrão**: 12 horas (43200000ms)
- **Chave secreta**: Configurável via variável de ambiente
- **Algoritmo**: HS256

### Variáveis de Ambiente (Opcional)

Para produção, configure:

```bash
# Linux/Mac
export DB_USERNAME=seu_usuario
export DB_PASSWORD=sua_senha
export JWT_EXPIRATION=86400000  # 24 horas
export JWT_KEY=sua_chave_secreta_super_segura

# Windows
set DB_USERNAME=seu_usuario
set DB_PASSWORD=sua_senha
```

### Endpoints Públicos

Apenas 2 endpoints **NÃO** requerem autenticação:
- `POST /v1/auth/cadastro`
- `POST /v1/auth/login`

Todos os outros requerem token JWT válido.

---

## 🐛 Troubleshooting

### Problema: Porta 8080 já em uso

**Erro:**
```
Web server failed to start. Port 8080 was already in use.
```

**Solução 1:** Mude a porta no `application.yaml`
```yaml
server:
  port: 8081  # ou qualquer porta livre
```

**Solução 2:** Mate o processo na porta 8080
```bash
# Linux/Mac
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Problema: Java version incompatível

**Erro:**
```
java.lang.UnsupportedClassVersionError
```

**Solução:**
- Certifique-se de usar Java 17+
- Configure a IDE para usar Java 17
- Ou atualize a variável `JAVA_HOME`

### Problema: Maven não baixa dependências

**Solução:**
```bash
./mvnw clean install -U
```

Ou limpe o cache do Maven:
```bash
rm -rf ~/.m2/repository
```

### Problema: Frontend não consegue acessar backend (CORS)

**Erro no console do navegador:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solução:**
Verifique se o frontend está configurado com a URL correta e se a classe `CorsConfig.java` permite a origem:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",  // React
    "http://localhost:4200",  // Angular
    "http://localhost:8081"   // Vue/Outro
));
```

### Problema: Data de reserva sendo rejeitada

**Erro:**
```
Data de reserva deve ser hoje ou uma data futura
```

**Causa:**
Sistema valida que reservas só podem ser para hoje ou futuro.

**Solução:**
Use uma data >= data atual no formato `yyyy-MM-dd`.

### Problema: Check-in rejeitado

**Erros possíveis:**
- `"Check-in só pode ser realizado na data da reserva"`
- `"Check-in só pode ser realizado a partir do horário agendado"`

**Solução:**
- Check-in só funciona **no dia da reserva**
- Check-in só funciona **após o horário de início**

### Problema: Column not found

**Erro:**
```
Column "NUMERO_PESSOAS" not found
```

**Solução:**
Apague o banco de dados e reinicie:
```bash
rm -rf data/
./mvnw spring-boot:run
```

---

## 📚 Documentação Adicional

### Swagger UI

Acesse a documentação interativa da API:
```
http://localhost:8080/booking-room/api/swagger-ui.html
```

### Postman Collection

Importe os endpoints no Postman para testes:
1. Crie uma collection
2. Adicione os endpoints documentados acima
3. Configure a variável `{{baseUrl}}` = `http://localhost:8080/booking-room/api`
4. Configure a variável `{{token}}` após fazer login

---

## 👥 Contribuindo

Este é um projeto interno da empresa. Para contribuir:

1. Crie uma branch para sua feature
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. Commit suas mudanças
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```

3. Push para o repositório
   ```bash
   git push origin feature/nova-funcionalidade
   ```

4. Abra um Pull Request

---

## 📄 Licença

Este projeto é de uso interno da empresa.

---

## 🆘 Suporte

Em caso de dúvidas ou problemas:

- 📧 Email: suporte-ti@empresa.com
- 💬 Slack: #canal-desenvolvimento
- 📞 Ramal: 1234

---

## 📝 Changelog

### Versão 0.0.1-SNAPSHOT (Atual)

**Funcionalidades:**
- ✅ Sistema de autenticação JWT
- ✅ CRUD de usuários
- ✅ CRUD de salas
- ✅ Sistema completo de reservas
- ✅ Check-in e check-out
- ✅ Validações de conflito e capacidade
- ✅ Documentação Swagger

**Melhorias Futuras:**
- 📋 Dashboard de estatísticas
- 📧 Notificações por email
- 📱 Lembretes de reserva
- 📊 Relatórios de uso das salas
- 🔔 Sistema de avisos para reservas próximas

---

**Desenvolvido com ❤️ pela equipe de TI**

*Última atualização: Fevereiro 2026*

