"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";

type CategoryItem = {
  id: string;
  name: string;
  children?: CategoryItem[];
};

type SidebarContainerProps = {
  categories: CategoryItem[];
  children: React.ReactNode;
};

export default function SidebarContainer({
  categories,
  children,
}: SidebarContainerProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <Sidebar
        categories={categories}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        onSelectCategory={setSelectedCategory}
      />
      <div
        className={`flex-1 p-6 overflow-auto ${
          isSidebarCollapsed ? "ml-0" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}
