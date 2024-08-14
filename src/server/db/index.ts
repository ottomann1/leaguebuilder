import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import {Pool} from 'pg';
import "dotenv/config";
const pool = new Pool({

  connectionString: process.env.POSTGRES_URL,

})
const db = drizzle(pool);

export { pool, db };
