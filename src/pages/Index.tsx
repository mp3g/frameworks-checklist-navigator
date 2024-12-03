import { useState } from "react";
import { dimensions } from "@/data/mockData";
import { DimensionContent } from "@/components/DimensionContent";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Index = () => {
  const [selectedDimensionId, setSelectedDimensionId] = useState(dimensions[0].id);
  const [localDimensions, setLocalDimensions] = useState(dimensions);

  const selectedDimension = localDimensions.find((d) => d.id === selectedDimensionId);

  const handleToggleComplete = (areaId: string) => {
    setLocalDimensions(prevDimensions => 
      prevDimensions.map(dimension => ({
        ...dimension,
        areas: dimension.areas.map(area => 
          area.id === areaId ? { ...area, isCompleted: !area.isCompleted } : area
        )
      }))
    );
  };

  const handleExportAll = () => {
    const dataStr = JSON.stringify(localDimensions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "all-dimensions.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("All dimensions exported successfully");
  };

  const handleImportAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedData = JSON.parse(content);
          setLocalDimensions(importedData);
          toast.success("Data imported successfully");
        } catch (error) {
          toast.error("Error importing data");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-primary">Dimensions</h1>
            <div className="space-x-2">
              <button
                onClick={handleExportAll}
                className="text-xs text-accent hover:text-accent/80"
              >
                Export
              </button>
              <label className="text-xs text-accent hover:text-accent/80 cursor-pointer">
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportAll}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <nav>
            {localDimensions.map((dimension) => (
              <button
                key={dimension.id}
                onClick={() => setSelectedDimensionId(dimension.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors",
                  selectedDimensionId === dimension.id
                    ? "bg-accent text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {dimension.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {selectedDimension && (
          <DimensionContent
            dimension={selectedDimension}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;