import { config } from './config'

// valores padrão para o CLI (por exemplo, geração de tipos)
export default config(
  process.env.PAYLOAD_SECRET ?? 'dev-secret',
  process.env.DATABASE_URI ?? 'postgres://postgres:postgres@localhost:5432/postgres'
)