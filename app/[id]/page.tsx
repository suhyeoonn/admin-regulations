"use client";

import ContentArea from "@/components/content-area";
import { useState } from "react";

type Regulation = {
  id: string;
  title: string;
  content: string;
};

type RegulationData = {
  [key: string]: Regulation[];
};

const data: RegulationData = {
  "cat1-1": [
    { id: "reg1", title: "제 1장 총칙", content: "본 규정은..." },
    {
      id: "reg2",
      title: "제 1조 목적",
      content: "이 규정은 회사의 근무에 관한...",
    },
    {
      id: "reg3",
      title: "제 2조 적용범위",
      content: "이 규정은 모든 직원에게 적용된다.",
    },
  ],
  "cat1-2": [
    { id: "reg4", title: "제 1장 휴가", content: "휴가 관련 내용..." },
    { id: "reg5", title: "제 1조 정의", content: "휴가라 함은..." },
  ],
  "cat2-1": [
    { id: "reg6", title: "제 1장 회계원칙", content: "회계 원칙에 관한..." },
  ],
};

export default function RegulationPage({ params }: { params: { id: string } }) {
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ContentArea
      regulation={data[params.id] || []}
      selectedRegulation={selectedRegulation}
      onSelectRegulation={setSelectedRegulation}
      selectedCategory={selectedCategory}
    />
  );
}
