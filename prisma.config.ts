import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Paste your exact Neon postgresql:// link between these quotes:
    url: "postgresql://neondb_owner:npg_IB4uHMJrZh2t@ep-silent-tree-at1iy6zl-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});