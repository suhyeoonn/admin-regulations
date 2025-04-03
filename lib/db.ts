import oracledb from "oracledb";

// 운영 체제에 따라 Oracle 클라이언트 초기화
if (process.env.OS_TYPE === "WINDOWS") {
  oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_14" });
}
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
