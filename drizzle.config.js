import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  dbCredentials: {
    host: "ep-soft-queen-a5z5k45z.us-east-2.aws.neon.tech",
    database: "expense-tracker",
    port: 5432,
    user: "expense-tracker_owner",
    password: "fLOKqgC6Pm5l",
    ssl: "require",
  },
  migrations: {
    table: "__drizzle_migrations__",
    schema: "public",
  },
});
