# Uscribe Document Processing API

A minimal Express.js + TypeScript backend for document ingestion and processing using Redis and SQLite.

---

## 📦 Tech Stack

- **Node.js** + **TypeScript**
- **Express.js** – Web API framework
- **Redis** – Queue and status management
- **SQLite** – Persistent metadata storage
- **ts-node**, **nodemon** – Dev-time tooling

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Redis
- Yarn (via Corepack or v4): `corepack enable && corepack prepare yarn@4.9.2 --activate`

---

### 🔨 Installation & Run

First start redis on your machine

```bash
yarn

yarn init-db

yarn worker
```
After the worker has connected to redis

```bash
yarn dev

# 🛣️ Roadmap

- [x] Document upload endpoint  
- [x] Redis-based processing queue  
- [x] Simulated OCR service  
- [x] Validation and metadata persistence in SQLite  
- [x] Real-time status tracking via Redis  
- [x] File upload via multer  
- [ ] OCR field validation using zod  
- [ ] Dockerized dev environment (docker-compose)  
- [ ] Unit tests with Jest
