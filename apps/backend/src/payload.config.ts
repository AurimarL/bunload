

import { config as buildConfig } from '@repo/payload'

export default buildConfig(
    process.env.PAYLOAD_SECRET ?? 'dev-secret',
    process.env.DATABASE_URI ?? 'postgres://postgres:postgres@localhost:5432/postgres'
)