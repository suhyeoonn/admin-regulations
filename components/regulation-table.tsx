"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Regulation = {
  id: string
  title: string
  content: string
}

type RegulationTableProps = {
  regulations: Regulation[]
  selectedRegulation: string | null
  onSelectRegulation: (id: string) => void
}

export default function RegulationTable({ regulations, selectedRegulation, onSelectRegulation }: RegulationTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">규정 목록</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regulations.length > 0 ? (
            regulations.map((regulation) => (
              <TableRow
                key={regulation.id}
                className={`cursor-pointer ${selectedRegulation === regulation.id ? "bg-gray-100" : ""}`}
                onClick={() => onSelectRegulation(regulation.id)}
              >
                <TableCell>{regulation.title}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center py-4 text-gray-500">등록된 규정이 없습니다.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

