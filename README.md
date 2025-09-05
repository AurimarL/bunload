# Next.js + Payload CMS + Bun Boilerplate

A modern, full-stack boilerplate that combines the best of frontend and backend development in a single, optimized project.

## Overview

This boilerplate provides a complete development environment featuring:

- **[Next.js 14+](https://nextjs.org/)** - React framework with App Router for modern frontend development
- **[Payload CMS](https://payloadcms.com/)** - Headless CMS with built-in admin panel and REST/GraphQL APIs
- **[Bun](https://bun.sh/)** - Ultra-fast JavaScript runtime, package manager, and bundler
- **[Biome](https://biomejs.dev/)** - Lightning-fast linter and formatter for code quality

Perfect for building content-driven applications, e-commerce sites, blogs, or any project requiring both a dynamic frontend and powerful content management.

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed on your system
- Node.js 18+ (for compatibility)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AurimarL/bunload.git
   cd bunload
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Start development server**
   ```bash
   bun dev
   ```

### Access Points

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Payload Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **API Endpoints**: [http://localhost:3000/api](http://localhost:3000/api)

## Project Structure

```
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (frontend)/        # Public-facing pages
│   │   └── (payload)/         # Payload CMS routes (/admin, /api)
│   ├── collections/           # Payload collections (Users, Media, etc.)
│   ├── components/            # Reusable React components
│   └── lib/                   # Utility functions and configurations
├── public/                    # Static assets
├── payload.config.ts          # Payload CMS configuration
├── payload-types.ts           # Auto-generated TypeScript types
├── biome.json                 # Code formatting and linting rules
└── .env.example               # Environment variables 
````

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with hot reload |
| `bun build` | Build production-ready application |
| `bun start` | Run production server |
| `bun lint` | Run Biome linter and formatter |
| `bun gt` | Generate TypeScript types from Payload collections |

## Key Features

### 🚀 **Performance Optimized**
- Bun runtime for 3x faster package installation and execution
- Next.js App Router for optimal loading and SEO
- Built-in image optimization and caching

### 🎯 **Developer Experience**
- TypeScript support with auto-generated types
- Hot reload for both frontend and backend changes
- Integrated linting and formatting with Biome
- Monorepo structure for simplified development

### 🔧 **Production Ready**
- Pre-configured Payload collections (Users, Media)
- Authentication and authorization built-in
- File upload and media management
- REST and GraphQL APIs out of the box

### 🎨 **Flexible Architecture**
- Headless CMS for content flexibility
- Customizable admin interface
- Extensible collection schemas
- Frontend framework agnostic (can be adapted)

## Environment Configuration

Key environment variables you'll need to configure:

```bash
# Database
DATABASE_URI=mongodb://localhost:27017/your-db-name

# Payload
PAYLOAD_SECRET=your-super-secret-key

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

See `.env.example` for the complete list of available configuration options.

## Deployment

This boilerplate is optimized for deployment on:

- **Vercel** (recommended for Next.js)
- **Railway** 
- **DigitalOcean App Platform**
- Any Node.js hosting provider

Make sure to:
1. Set all required environment variables
2. Configure your database connection
3. Update `NEXT_PUBLIC_SERVER_URL` to your production domain

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API
- **[Payload Documentation](https://payloadcms.com/docs)** - Complete Payload CMS guide
- **[Bun Documentation](https://bun.sh/docs)** - Bun runtime and tooling
- **[Biome Documentation](https://biomejs.dev/)** - Code quality tools

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the modern web development community**
