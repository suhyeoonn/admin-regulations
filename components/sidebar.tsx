"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, FileText, ChevronLeft } from "lucide-react";
import Link from "next/link";

type CategoryItem = {
  id: string;
  name: string;
  children?: CategoryItem[];
};

type SidebarProps = {
  categories: CategoryItem[];
  isCollapsed: boolean;
  onToggle: () => void;
  onSelectCategory: (category: string) => void;
};

export default function Sidebar({
  categories,
  isCollapsed,
  onToggle,
  onSelectCategory,
}: SidebarProps) {
  console.log(categories);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >(
    categories.reduce((acc, cat) => {
      acc[cat.id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-gray-100 border-r border-gray-200 flex flex-col">
        <button onClick={onToggle} className="p-3 hover:bg-gray-200 self-end">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
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
                <span
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex-1"
                >
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
                        <Link href={`/${child.id}`}>{child.name}</Link>
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
  );
}
