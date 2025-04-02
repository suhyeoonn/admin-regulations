import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(`
      SELECT 
        id,
        branch_cd,
        name,
        parent_id,
        depth,
        sort_order
      FROM REGULATION_TREE
      WHERE branch_cd = '7000'
      ORDER BY sort_order
    `);

    // 컬럼명을 키로 하는 객체 배열로 변환
    const rows =
      result.rows?.map((row: any) => ({
        id: row[0],
        branch_cd: row[1],
        name: row[2],
        parent_id: row[3],
        depth: row[4],
        sort_order: row[5],
      })) || [];

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Connection close error:", err);
      }
    }
  }
}
