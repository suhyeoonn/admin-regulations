import { NextRequest, NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(
      `select * from regulation where tree_id = :id`,
      [id]
    );

    // 컬럼명을 키로 하는 객체 배열로 변환
    const rows =
      result.rows?.map((row: any) => ({
        id: row[0],
        tree_id: row[1],
        title: row[2],
        content: row[3],
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
