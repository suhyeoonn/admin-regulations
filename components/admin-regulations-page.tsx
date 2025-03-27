"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import ContentArea from "@/components/content-area";

type CategoryItem = {
  id: string;
  name: string;
  children?: CategoryItem[];
};

type AdminRegulationsPageProps = {
  categories: CategoryItem[];
};

export default function AdminRegulationsPage({
  categories,
}: AdminRegulationsPageProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(
    null
  );
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
      <ContentArea
        isSidebarCollapsed={isSidebarCollapsed}
        selectedRegulation={selectedRegulation}
        onSelectRegulation={setSelectedRegulation}
        selectedCategory={selectedCategory}
      />
    </>
  );
}
