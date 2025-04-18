"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import RegulationEditor from "@/components/regulation-editor";
import RegulationList from "@/components/regulation-list";

type ContentAreaProps = {
  treeId: string;
};

type Regulation = {
  id: string;
  title: string;
  content: string;
};

export default function ContentArea({ treeId }: ContentAreaProps) {
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(
    null
  );

  const [editorContent, setEditorContent] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRegulationTitle, setNewRegulationTitle] = useState("");
  const [regulations, setRegulations] = useState([]);

  useEffect(() => {
    async function getRegulations() {
      const response = await fetch(
        `http://localhost:3001/api/regulations/${treeId}`
      ); // TODO: next config로 프록시설정
      console.log(response);
      const data = await response.json();

      setRegulations(data);
    }

    getRegulations();
  }, []);

  const handleRegulationSelect = (id: string) => {
    setIsAddingNew(false);
  };

  const handleSave = () => {
    console.log("save");
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditorContent("");
    setNewRegulationTitle("");
  };

  const handleSaveNew = () => {
    if (newRegulationTitle.trim()) {
      const newId = `reg${Date.now()}`;

      setIsAddingNew(false);
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
          <RegulationList
            regulations={regulations}
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
