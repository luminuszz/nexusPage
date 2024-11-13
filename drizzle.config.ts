import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log({
  t: process.env.DATABASE_URL!,
});

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
