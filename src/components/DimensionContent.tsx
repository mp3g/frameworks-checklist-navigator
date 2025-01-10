import { Dimension } from "@/types/attributes";
import { AreaItem } from "./AreaItem";

interface DimensionContentProps {
  dimension: Dimension;
  selectedCategory: string;
  onToggleComplete: (areaId: string, proposalId?: string) => void;
}

export const DimensionContent = ({
  dimension,
  selectedCategory,
  onToggleComplete,
}: DimensionContentProps) => {
  const filteredAreas = dimension.areas.map(area => ({
    ...area,
    controls: area.controls.filter(control => control.category === selectedCategory)
  })).filter(area => area.controls.length > 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">{dimension.title}</h2>
        {dimension.description && dimension.description !== "nan" && (
          <p className="text-gray-600 text-justify">{dimension.description}</p>
        )}
      </div>
      
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {filteredAreas.map((area) => (
          <AreaItem
            key={area.id}
            area={area}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};