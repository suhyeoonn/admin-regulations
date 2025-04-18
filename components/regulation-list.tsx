"use client";

import { cx } from "class-variance-authority";

type Regulation = {
  id: string;
  title: string;
  content: string;
};

type RegulationTableProps = {
  regulations: Regulation[];
  selectedRegulation: string | null;
  onSelectRegulation: (id: string) => void;
};

export default function RegulationList({
  regulations,
  selectedRegulation,
  onSelectRegulation,
}: RegulationTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="font-bold p-2 border-b text-gray-600">규정 목록</div>
      <ul>
        {regulations.length > 0 ? (
          regulations.map((regulation) => (
            <li
              key={regulation.id}
              className={cx(
                `cursor-pointer p-2 border-b`,
                selectedRegulation === regulation.id ? "bg-gray-100" : ""
              )}
              onClick={() => onSelectRegulation(regulation.id)}
            >
              {regulation.title}
            </li>
          ))
        ) : (
          <li className="text-center py-4 text-gray-500">
            등록된 규정이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}
