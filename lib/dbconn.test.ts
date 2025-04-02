import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_CONNECT_STRING);

import oracledb from "oracledb";

async function testOracleConnection() {
  try {
    const conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    const result = await conn.execute(`SELECT 'Hello from Oracle!' FROM dual`);
    console.log("Oracle 연결 성공:", result.rows);

    await conn.close();
  } catch (err) {
    console.error("Oracle 연결 실패:", err);
  }
}

testOracleConnection();
