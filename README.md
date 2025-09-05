
```markdown
# 🚀 Next.js + Payload CMS + Bun Boilerplate

This is a **modern full-stack boilerplate** combining:

- [Next.js](https://nextjs.org/) → frontend with App Router  
- [Payload CMS](https://payloadcms.com/) → headless CMS / backend  
- [Bun](https://bun.sh/) → fast JS runtime, package manager & bundler  

It provides a **ready-to-use structure** for building web apps with a frontend and backend in the same project, optimized for developer experience and speed.

---

## 📂 Project Structure

```

.
├── src/
│   ├── app/ (frontend)        # Next.js frontend
│   │   ├── (frontend)         # Example frontend pages
│   │   └── (payload)          # Payload CMS admin + API
│   └── collections/           # Payload collections (Users, Media, etc.)
├── public/                    # Public static assets
├── payload.config.ts          # Payload configuration
├── payload-types.ts           # Auto-generated Payload types
├── .env.example               # Example environment variables
├── biome.json                 # Biome config (lint/format)
└── bun.lock                   # Bun lockfile

````

---

## ⚡ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/AurimarL/bunload.git
cd bunload
bun install
````

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in required values:

```bash
cp .env.example .env
```

### 3. Run Development Server

```bash
bun dev
```

* Next.js app → [http://localhost:3000](http://localhost:3000)
* Payload CMS admin → [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🛠 Scripts

| Command     | Description                         |
| ----------- | ----------------------------------- |
| `bun dev`   | Start Next.js + Payload in dev mode |
| `bun b`     | Build production bundle             |
| `bun start` | Run production server               |
| `bun lint`  | Run Biome linter/formatter          |
| `bun gt`    | Run payload generate:types          |


---

## 🧩 Features

* ✅ **Next.js App Router** ready
* ✅ **Payload CMS** preconfigured (with Users + Media collections)
* ✅ **Bun** for runtime, install & scripts
* ✅ **Biome** for linting & formatting
* ✅ Type-safe Payload auto-generated types
* ✅ Monorepo-like structure for frontend + backend together

---

## 📖 Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Payload Documentation](https://payloadcms.com/docs)
* [Bun Documentation](https://bun.sh/docs)
* [Biome](https://biomejs.dev/)

---
