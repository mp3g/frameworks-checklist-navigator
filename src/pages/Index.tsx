import { useState } from "react";
import { dimensions } from "@/data/mockData";
import { DimensionContent } from "@/components/DimensionContent";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedDimensionId, setSelectedDimensionId] = useState(dimensions[0].id);

  const selectedDimension = dimensions.find((d) => d.id === selectedDimensionId);

  const handleToggleComplete = (areaId: string) => {
    // In a real app, this would update the backend
    console.log("Toggle complete:", areaId);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary mb-4">Dimensions</h1>
          <nav>
            {dimensions.map((dimension) => (
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