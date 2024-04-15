import pg from 'pg'
import { DBURL } from './secrets.js'
const { Pool } = pg

const db = new Pool({
  ssl: {
    rejectUnauthorized: false
  },
  connectionString: process.env.DATABASE_CONNECTION
})

export default db
