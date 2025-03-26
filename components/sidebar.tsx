"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, FileText, ChevronLeft } from "lucide-react"

type CategoryItem = {
  id: string
  name: string
  children?: CategoryItem[]
}

type SidebarProps = {
  isCollapsed: boolean
  onToggle: () => void
  onSelectCategory: (category: string) => void
}

export default function Sidebar({ isCollapsed, onToggle, onSelectCategory }: SidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    cat1: false,
    cat2: false,
    cat3: false,
  })

  const categories: CategoryItem[] = [
    {
      id: "cat1",
      name: "인사 규정",
      children: [
        { id: "cat1-1", name: "근무 규정" },
        { id: "cat1-2", name: "휴가 규정" },
        { id: "cat1-3", name: "급여 규정" },
      ],
    },
    {
      id: "cat2",
      name: "재무 규정",
      children: [
        { id: "cat2-1", name: "회계 규정" },
        { id: "cat2-2", name: "구매 규정" },
      ],
    },
    {
      id: "cat3",
      name: "보안 규정",
      children: [
        { id: "cat3-1", name: "정보보안 규정" },
        { id: "cat3-2", name: "시설보안 규정" },
      ],
    },
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId)
  }

  if (isCollapsed) {
    return (
      <div className="w-12 bg-gray-100 border-r border-gray-200 flex flex-col">
        <button onClick={onToggle} className="p-3 hover:bg-gray-200 self-end">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
      <div className="p-4 font-semibold border-b border-gray-200 flex justify-between items-center">
        <span>사내규정 목록</span>
        <button onClick={onToggle} className="p-1 hover:bg-gray-200 rounded">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        <ul className="py-2">
          {categories.map((category) => (
            <li key={category.id} className="px-2">
              <div className="flex items-center py-2 px-2 hover:bg-gray-200 cursor-pointer rounded">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="mr-1 w-5 h-5 flex items-center justify-center"
                >
                  {expandedCategories[category.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                <FileText className="h-4 w-4 mr-2" />
                <span onClick={() => handleCategoryClick(category.id)} className="flex-1">
                  {category.name}
                </span>
              </div>
              {expandedCategories[category.id] && category.children && (
                <ul className="pl-7 py-1">
                  {category.children.map((child) => (
                    <li key={child.id}>
                      <div
                        className="flex items-center py-2 px-2 hover:bg-gray-200 cursor-pointer rounded"
                        onClick={() => handleCategoryClick(child.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        <span>{child.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

