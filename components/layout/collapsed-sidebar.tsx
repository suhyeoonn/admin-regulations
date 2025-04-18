import { ChevronRight } from "lucide-react";

interface CollapsedSidebarProps {
  onToggle: () => void;
}

export const CollapsedSidebar = ({ onToggle }: CollapsedSidebarProps) => {
  return (
    <div className="w-12 bg-gray-100 border-r border-gray-200 flex flex-col">
      <button onClick={onToggle} className="p-3 hover:bg-gray-200 self-end">
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
