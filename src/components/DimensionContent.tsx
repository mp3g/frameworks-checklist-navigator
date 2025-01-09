import { Dimension } from "@/types/attributes";
import { AreaItem } from "./AreaItem";

interface DimensionContentProps {
  dimension: Dimension;
  onToggleComplete: (areaId: string, proposalId?: string) => void;
}

export const DimensionContent = ({
  dimension,
  onToggleComplete,
}: DimensionContentProps) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">{dimension.title}</h2>
        <p className="text-gray-600 text-sm">{dimension.description}</p>
      </div>
      
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {dimension.areas.map((area) => (
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