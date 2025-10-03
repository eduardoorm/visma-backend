# Visma Backend - Technical Challenge

Backend API REST para gestión jerárquica de divisiones organizacionales, desarrollado con NestJS, Prisma y MySQL.

## 🚀 Tecnologías

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript
- **ORM**: Prisma 6.x
- **Base de datos**: MySQL 8.0
- **Testing**: Jest
- **Arquitectura**: Hexagonal (Ports & Adapters)
- **Containerización**: Docker & Docker Compose

## 📋 Características

### Funcionalidades Implementadas

- ✅ CRUD completo de divisiones
- ✅ Búsqueda por texto (nombre, embajador)
- ✅ Filtrado dinámico por múltiples campos
- ✅ Paginación y ordenamiento
- ✅ Relaciones jerárquicas (parent-child)
- ✅ Obtención de subdivisiones
- ✅ CORS configurado para frontend
- ✅ Seeds de datos iniciales

### Arquitectura Hexagonal

```
src/
├── divisions/
│   ├── domain/          # Entidades y reglas de negocio
│   ├── application/     # Casos de uso y DTOs
│   └── infrastructure/  # Controladores y repositorios
└── common/              # Utilidades compartidas
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- Docker y Docker Compose
- npm o yarn

### Variables de Entorno

```env
DATABASE_URL="mysql://root:superSecretPassword@localhost:3306/visma_database"
PORT=8080
NODE_ENV=development
```

### Instalación Local

```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Ejecutar seeds
npx prisma db seed

# Iniciar en desarrollo
npm run start:dev
```

### Instalación con Docker

```bash
# Levantar servicios (backend + MySQL)
docker-compose up --build

# Detener servicios
docker-compose down
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test
```
## 📡 API Endpoints

### Divisiones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/divisions` | Listar divisiones con filtros y paginación |
| GET | `/api/divisions/:id` | Obtener división por ID |
| GET | `/api/divisions/:id/subdivisions` | Obtener subdivisiones |
| POST | `/api/divisions` | Crear nueva división |
| PUT | `/api/divisions/:id` | Actualizar división |
| DELETE | `/api/divisions/:id` | Eliminar división |

### Parámetros de Consulta

- `searchTerm`: Búsqueda por texto (nombre, embajador)
- `level`: Filtrar por nivel
- `collaborators`: Filtrar por colaboradores
- `parentId`: Filtrar por división padre
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `sortBy`: Campo de ordenamiento
- `sortOrder`: Orden (asc/desc)

### Ejemplo de Uso

```bash
# Listar divisiones con búsqueda y paginación
GET /api/divisions?searchTerm=visma&level=1&sortBy=name&sortOrder=asc&page=1&limit=10

# Crear división
POST /api/divisions
{
  "name": "Engineering",
  "level": 1,
  "collaborators": 25,
  "ambassadorName": "John Doe"
}
```

## 🗄️ Modelo de Datos

### Division

```prisma
model Division {
  id              Int        @id @default(autoincrement())
  name            String     @unique @db.VarChar(45)
  parentId        Int?
  parent          Division?  @relation("DivisionToSubdivisions")
  subdivisions    Division[] @relation("DivisionToSubdivisions")
  collaborators   Int
  level           Int
  ambassadorName  String?    @db.VarChar(100)
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
}
```

## 🚢 Despliegue

### Producción (Google Cloud Run)

```bash
# El script start_up.sh ejecuta:
# - Generación de cliente Prisma
# - Migraciones de base de datos
# - Seeds de datos
# - Compilación de la aplicación
# - Inicio en modo producción

chmod +x start_up.sh
./start_up.sh
```

**URL Producción**: `https://visma-backend-lzqunom2jq-uc.a.run.app/api/`


### Endpoints Disponibles en Producción

### Listar todas las divisiones:
```bash
GET https://visma-backend-lzqunom2jq-uc.a.run.app/api/divisions/
```

#### 1. 🆕 Crear División

```bash
POST https://visma-backend-lzqunom2jq-uc.a.run.app/api/divisions
Content-Type: application/json

{
  "name": "Technology Department",
  "level": 1,
  "collaborators": 50,
  "ambassadorName": "John Smith"
}
```

#### 2. 📋 Listar Divisiones (con filtros)

```bash
GET https://visma-backend-lzqunom2jq-uc.a.run.app/api/divisions?searchTerm=tech&level=1&page=1&limit=10&sortBy=name&sortOrder=asc
```

**Parámetros disponibles:**
- `searchTerm`: Buscar por nombre o embajador
- `level`: Filtrar por nivel jerárquico
- `collaborators`: Filtrar por número de colaboradores
- `parentId`: Filtrar por división padre
- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `sortBy`: Campo para ordenar (name, level, collaborators, createdAt)
- `sortOrder`: Orden (asc/desc)

#### 3. 🔍 Obtener División por ID

```bash
GET https://visma-backend-lzqunom2jq-uc.a.run.app/api/divisions/35
```

#### 4. 🌳 Obtener Subdivisiones

```bash
GET https://visma-backend-lzqunom2jq-uc.a.run.app/api/divisions/35/subdivisions
```

#### 5. ✏️ Actualizar División

```bash
PUT https://visma-backend-lzqunom2jq-uc.a.run.app/api/divisions/1
Content-Type: application/json

{
  "name": "Technology Division Updated",
  "collaborators": 75,
  "ambassadorName": "John Smith Updated"
}
```

#### 6. 🗑️ Eliminar División

```bash
DELETE https://visma-backend-lzqunom2jq-uc.a.run.app/api/divisions/1
```

**Actualización Parcial:**
```json
{
  "collaborators": 30,
  "ambassadorName": "New Ambassador"
}
```

### Respuestas de Ejemplo

**Éxito (200 OK):**
```json
{
  "id": 1,
  "name": "Technology Department",
  "level": 1,
  "collaborators": 50,
  "parentId": null,
  "ambassadorName": "John Smith",
  "createdAt": "2025-10-04T00:00:00.000Z",
  "updatedAt": "2025-10-04T00:00:00.000Z"
}
```

**Lista con Paginación:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Technology",
      "level": 1,
      "collaborators": 50,
      "ambassadorName": "John Smith"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```
## �🔒 CORS

Configurado para aceptar peticiones de:
- `http://localhost:4200` (desarrollo)
- `https://visma-frontend.web.app` (producción)
- `https://visma-frontend.firebaseapp.com` (alternativa)

## 📝 Scripts Disponibles

```bash
npm run start           # Modo normal
npm run start:dev       # Modo desarrollo (watch)
npm run start:prod      # Modo producción
npm run build           # Compilar aplicación
npm run test            # Ejecutar tests
npm run lint            # Linter
npm run format          # Formatear código
```

##  Autor

Eduardo Ormeño - Challenge Técnico Visma
