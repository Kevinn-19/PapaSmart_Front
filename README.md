# Prueba Técnica Symplifica

Aplicación Full Stack desarrollada como solución para la prueba técnica de Symplifica.

El proyecto permite gestionar empleados y sus beneficios mediante una API REST desarrollada en Ruby on Rails y una interfaz construida con Vue 3. Además, integra OpenStreetMap para obtener información geográfica de cada empleado.

## Arquitectura

- Frontend: Vue 3 + Tailwind CSS
- Backend: Ruby on Rails 8
- Base de datos: PostgreSQL
- Contenedores: Docker Compose

## Repositorios

- Backend: https://github.com/Kevinn-19/Symplifica-PT-backend
- Frontend: https://github.com/Kevinn-19/Symplifica-PT-frontend
- Google Drive:
- Video demostrativo:

El proyecto se encuentra dividido en dos repositorios independientes para separar el frontend y el backend. Ambos son orquestados mediante Docker Compose.

Para conocer la arquitectura, decisiones técnicas y detalles de implementación de cada componente, consultar el README correspondiente del frontend y del backend.

# Clonar Repositorios

Estos repositorios se deben de clonar en una misma carpeta y en la carpeta raíz del proyecto Symplifica-PT agregar el archivo docker-compose.yml. O si no, simplemente descargar la carpeta del Google Drive.

```bash
git clone https://github.com/Kevinn-19/Symplifica-PT-backend.git
git clone https://github.com/Kevinn-19/Symplifica-PT-frontend.git
```

# Ejecución con Docker

Este documento explica cómo ejecutar la aplicación completa utilizando Docker y Docker Compose.

El proyecto está compuesto por los siguientes servicios:

- **Frontend:** Aplicación web desarrollada con Vue 3.
- **Backend:** API REST desarrollada con Ruby on Rails.
- **Base de datos:** PostgreSQL.

Docker Compose permite construir y ejecutar todos los servicios necesarios utilizando una única configuración.

## Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Docker
- Docker Compose

Puedes verificar la instalación ejecutando:

```bash
docker --version
docker compose version
```

## Estructura del proyecto

```
Symplifica-PT/
├── docker-compose.yml          # Configuración de servicios Docker
├── Symplifica-PT-frontend/    # Código fuente del frontend Vue 3
└── Symplifica-PT-backend/     # Código fuente del backend Rails
```

## Ejecución

Desde la carpeta raíz del proyecto ejecutar:

```bash
docker compose up --build
```

## Acceso a los servicios

Una vez que todos los servicios se hayan iniciado correctamente, podrás acceder a la aplicación en las siguientes direcciones:

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000
- **Base de datos:** PostgreSQL en localhost:5432

## Comandos útiles

### Levantar servicios en segundo plano

```bash
docker compose up -d
```

### Detener servicios

```bash
docker compose down
```

### Ver logs del frontend

```bash
docker compose logs -f frontend
```

### Ver logs del backend

```bash
docker compose logs -f backend
```

### Ver logs de la base de datos

```bash
docker compose logs -f db
```

## Base de datos

Al ejecutarse por primera vez:

- PostgreSQL crea automáticamente la base de datos.
- Rails ejecuta las migraciones mediante `rails db:prepare`.
- La aplicación queda lista para usarse sin configuraciones adicionales.

# Decisiones Técnicas

## Autenticación

No se implementó autenticación mediante JWT debido a que la prueba técnica estaba enfocada en la construcción de una API REST para la gestión de empleados y beneficios, la integración con un servicio externo y el desarrollo de una interfaz funcional.

Al no existir requerimientos relacionados con usuarios, roles o permisos, se priorizó el desarrollo de las funcionalidades principales solicitadas.

En un escenario de producción, la API debería incorporar autenticación basada en JWT para:

- Proteger los endpoints.
- Identificar al usuario autenticado.
- Implementar autorización basada en roles.
- Restringir operaciones sensibles como la creación, edición y eliminación de recursos.

## Calidad del código

El proyecto incluye pruebas automatizadas para:

- Validaciones de modelos.
- Endpoints de la API.
- Operaciones CRUD principales.

Ejecutar:

```bash
docker compose exec backend rails test
```

Resultado esperado:

12 runs, 20 assertions, 0 failures, 0 errors, 0 skips

<img width="368" height="137" alt="image" src="https://github.com/user-attachments/assets/99ffdef8-20f5-4ac4-baa0-0aed8ff1b8a3" />

