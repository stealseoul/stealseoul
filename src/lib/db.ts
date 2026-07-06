import { neon } from "@neondatabase/serverless";

export const DB_CONFIGURED = Boolean(process.env.DATABASE_URL);

export const sql = DB_CONFIGURED ? neon(process.env.DATABASE_URL!) : null;
