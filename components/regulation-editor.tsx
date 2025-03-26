"use client"
import { Bold, Italic, List, ListOrdered } from "lucide-react"

type RegulationEditorProps = {
  content: string
  onChange: (content: string) => void
}

export default function RegulationEditor({ content, onChange }: RegulationEditorProps) {
  const handleBold = () => {
    onChange(content + "<strong>굵은 텍스트</strong>")
  }

  const handleItalic = () => {
    onChange(content + "<em>기울임 텍스트</em>")
  }

  const handleBulletList = () => {
    onChange(content + "\n<ul>\n  <li>항목 1</li>\n  <li>항목 2</li>\n</ul>")
  }

  const handleNumberedList = () => {
    onChange(content + "\n<ol>\n  <li>항목 1</li>\n  <li>항목 2</li>\n</ol>")
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-2 border-b border-gray-300 flex gap-2">
        <button onClick={handleBold} className="p-1.5 hover:bg-gray-200 rounded" title="굵게">
          <Bold className="h-4 w-4" />
        </button>
        <button onClick={handleItalic} className="p-1.5 hover:bg-gray-200 rounded" title="기울임">
          <Italic className="h-4 w-4" />
        </button>
        <button onClick={handleBulletList} className="p-1.5 hover:bg-gray-200 rounded" title="글머리 기호 목록">
          <List className="h-4 w-4" />
        </button>
        <button onClick={handleNumberedList} className="p-1.5 hover:bg-gray-200 rounded" title="번호 매기기 목록">
          <ListOrdered className="h-4 w-4" />
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 min-h-[300px] focus:outline-none resize-y"
        placeholder="내용을 입력하세요..."
      />
    </div>
  )
}

