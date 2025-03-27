import { NextResponse } from "next/server";
import pool from "@/lib/db";

interface Category {
  id: string;
  name: string;
  children: Category[];
}

interface DatabaseRow {
  id: string;
  branch_cd: string;
  name: string;
  parent_id: string | null;
  depth: number;
  sort_order: number;
  path: string;
}

export async function GET() {
  try {
    const [rows] = await pool.execute(`
      WITH RECURSIVE regulation_cte AS (
        SELECT 
          id,
          branch_cd,
          name,
          parent_id,
          depth,
          sort_order,
          CAST(name AS CHAR(1000)) AS path
        FROM regulation_tree
        WHERE parent_id IS NULL AND branch_cd = '7000' 

        UNION ALL

        SELECT 
          r.id,
          r.branch_cd,
          r.name,
          r.parent_id,
          r.depth,
          r.sort_order,
          CONCAT(rc.path, ' > ', r.name) AS path
        FROM regulation_tree r
        JOIN regulation_cte rc ON r.parent_id = rc.id
      )
      SELECT *
      FROM regulation_cte
      ORDER BY path
    `);

    // 데이터를 계층 구조로 변환
    const categories = transformToHierarchy(rows as DatabaseRow[]);

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function transformToHierarchy(rows: DatabaseRow[]): Category[] {
  const map = new Map<string, Category>();
  const result: Category[] = [];

  // 먼저 모든 항목을 map에 저장
  rows.forEach((row) => {
    map.set(row.id, {
      id: row.id,
      name: row.name,
      children: [],
    });
  });

  // 부모-자식 관계 구성
  rows.forEach((row) => {
    const item = map.get(row.id);
    if (row.parent_id === null) {
      result.push(item!);
    } else {
      const parent = map.get(row.parent_id);
      if (parent) {
        parent.children.push(item!);
      }
    }
  });

  return result;
}
