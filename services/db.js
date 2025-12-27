import "dotenv/config";
import pkg from "pg";

const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres-password",
  database: process.env.DB_NAME || "interestAPI",
});

let isConnected = false;

async function query(text, params) {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return await client.query(text, params);
}

async function testConnection() {
  await query("SELECT NOW()");
  console.log("Database connection successful");
  return true;
}

export { query, testConnection };


