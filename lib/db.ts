import oracledb from "oracledb";

oracledb.autoCommit = true;

export async function getConnection() {
  try {
    return await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
  } catch (err) {
    console.error("Oracle 연결 실패:", err);
    throw err;
  }
}
