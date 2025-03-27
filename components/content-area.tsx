"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import RegulationEditor from "@/components/regulation-editor";
import RegulationTable from "@/components/regulation-table";

type ContentAreaProps = {
  regulation: Regulation[];
  selectedRegulation: string | null;
  onSelectRegulation: (id: string) => void;
  selectedCategory: string | null;
};

type Regulation = {
  id: string;
  title: string;
  content: string;
};

export default function ContentArea({
  regulation,
  selectedRegulation,
  onSelectRegulation,
  selectedCategory,
}: ContentAreaProps) {
  const [regulations, setRegulations] = useState<Record<string, Regulation[]>>({
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
  });

  const [editorContent, setEditorContent] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRegulationTitle, setNewRegulationTitle] = useState("");

  const handleRegulationSelect = (id: string) => {
    onSelectRegulation(id);

    if (selectedCategory) {
      const regulation = regulations[selectedCategory]?.find(
        (r: Regulation) => r.id === id
      );
      if (regulation) {
        setEditorContent(regulation.content);
      }
    }

    setIsAddingNew(false);
  };

  const handleSave = () => {
    console.log("save");
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditorContent("");
    setNewRegulationTitle("");
    onSelectRegulation("");
  };

  const handleSaveNew = () => {
    if (newRegulationTitle.trim()) {
      const newId = `reg${Date.now()}`;

      setIsAddingNew(false);
      onSelectRegulation(newId);
      alert("새 규정이 추가되었습니다.");
    } else {
      alert("제목을 입력해주세요.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{">"} 근무 규정</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>추가</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <RegulationTable
            regulations={regulation}
            selectedRegulation={selectedRegulation}
            onSelectRegulation={handleRegulationSelect}
          />
        </div>
        <div className="md:col-span-2">
          {isAddingNew ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  규정 제목
                </label>
                <input
                  type="text"
                  id="title"
                  value={newRegulationTitle}
                  onChange={(e) => setNewRegulationTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="예: 제 3조 근무시간"
                />
              </div>
              <RegulationEditor
                content={editorContent}
                onChange={setEditorContent}
              />
              <Button onClick={handleSaveNew}>저장</Button>
            </div>
          ) : selectedRegulation ? (
            <div className="space-y-4">
              <RegulationEditor
                content={editorContent}
                onChange={setEditorContent}
              />
              <Button onClick={handleSave}>저장</Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">
                좌측에서 규정을 선택하거나 새 규정을 추가하세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
