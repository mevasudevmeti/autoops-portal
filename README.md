# AutoOps Portal

AutoOps Portal is a full-stack operations platform for registering, monitoring, and managing application services.

It is built with **React, TypeScript, Spring Boot, PostgreSQL, Redis, Docker, and Nginx**, with operational features including service health checks, job tracking, execution logs, and audit events.

## Features

* Register, view, update, and delete services
* Environment-specific service management
* Service health checks
* Operational job tracking
* Structured job execution logs
* Audit trail for service actions
* Centralised API error handling
* Redis caching with TTL and cache invalidation
* Spring Boot Actuator health monitoring
* Fully containerised local environment

## Architecture

```text
Browser
   |
   v
React + Nginx
   |
   | /api/*
   v
Spring Boot
   |
   +------------+
   |            |
   v            v
PostgreSQL    Redis
```

Nginx serves the React application and proxies API requests to the Spring Boot backend.

Docker Compose manages the application containers, networking, persistent storage, environment configuration, and health checks.

## Technology Stack

**Frontend**

* React
* TypeScript
* Vite
* TanStack React Query
* Axios
* React Router
* Tailwind CSS
* Nginx

**Backend**

* Java 21
* Spring Boot
* Spring Web MVC
* Spring Data JPA
* Spring Data Redis
* Spring Cache
* Spring Boot Actuator
* Hibernate
* Flyway
* Maven

**Data**

* PostgreSQL
* Redis

**DevOps**

* Docker
* Docker Compose
* Multi-stage Docker builds
* Container health checks
* Docker networking
* Persistent volumes
* Environment-based configuration
* Nginx reverse proxy

## Docker Setup

The application runs using four containers:

```text
autoops-frontend
autoops-backend
autoops-postgres
autoops-redis
```

All services include health checks and dependency-aware startup ordering.

## Run Locally

### Prerequisites

* Git
* Docker
* Docker Compose

Clone the repository:

```bash
git clone https://github.com/mevasudevmeti/autoops-portal.git
cd autoops-portal
```

Build and start:

```bash
docker compose up --build -d
```

Check container status:

```bash
docker compose ps
```

Open AutoOps:

```text
http://localhost
```

Backend health:

```text
http://localhost:8080/actuator/health
```

Stop the application:

```bash
docker compose down
```

## Author

**Vasudev C Meti**

Software Engineer | MSc Advanced Computer Science

* Portfolio: https://mevasudevmeti.github.io/portfolio/#overview
* LinkedIn: https://www.linkedin.com/in/vasudevcmeti
