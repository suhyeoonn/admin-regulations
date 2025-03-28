import oracledb from "oracledb";

// Oracle 클라이언트 초기화
oracledb.initOracleClient();

const pool = oracledb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING, // 예: "localhost:1521/XEPDB1"
  poolMin: 10,
  poolMax: 10,
  poolIncrement: 0,
});

export default pool;
