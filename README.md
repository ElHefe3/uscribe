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
```

# 🛣️ Roadmap

- [x] Document upload endpoint  
- [x] Redis-based processing queue  
- [x] Simulated OCR service  
- [x] Validation and metadata persistence in SQLite  
- [x] Real-time status tracking via Redis  
- [x] File upload via multer  
- [x] OCR field validation using zod


# Explanation of decisions made and tools used

## The stack

I used node + express because I am familiar with the framework, and due to its maturity it has a lot of libraries and tools available. I used typescript to have type safety and better developer experience. Redis for its fast in-memory data structure store, which works well for queues. SQLite is usually my go to for small demo project, but I also included it here due to its easy setup and if I have extra time after finnishing the main scope I could set up a all-in-one program you as the user can use to run the project without having to install a database server. I used yarn as the package manager because it is fast and has a lot of features that make development easier, like workspaces and zero-install. I uysaed zod for validation since I am familiar with it, it is lightweight and has a good developer experience. I ran and tested the service inside a devcontainer, which is a great way to have a consistent development environment across different machines and platforms. There are also swagger docs available for the API, which can be used to test the endpoints and see the available options.

Initially I wanted to deliver a more complete product that does in fact use real OCR tool, and I could easily host a frontend for this service on my dashboard tool, but decided against it in favor of a more complete backend that is easy to run and use, and my time contraints with having a full time job and extra activities.