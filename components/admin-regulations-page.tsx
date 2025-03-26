"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import ContentArea from "@/components/content-area"

export default function AdminRegulationsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} onSelectCategory={setSelectedCategory} />
        <ContentArea
          isSidebarCollapsed={isSidebarCollapsed}
          selectedRegulation={selectedRegulation}
          onSelectRegulation={setSelectedRegulation}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  )
}

