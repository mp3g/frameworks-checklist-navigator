import { Dimension } from "@/types/attributes";
import { AreaItem } from "./AreaItem";

interface DimensionContentProps {
  dimension: Dimension;
  selectedCategory: "OWASP ASVS" | "DSOMM" | "MITRE ATT&CK";
  onToggleComplete: (areaId: string, proposalId?: string) => void;
}

export const DimensionContent = ({
  dimension,
  selectedCategory,
  onToggleComplete,
}: DimensionContentProps) => {
  // Filter areas to only show controls matching the selected category
  const filteredAreas = dimension.areas.map(area => ({
    ...area,
    controls: area.controls.filter(control => control.category === selectedCategory)
  })).filter(area => area.controls.length > 0);

  return (
    <div className="relative p-6 max-w-5xl mx-auto">
      <div className="mt-8">
        <h1 className="text-xl font-semibold mb-2">{dimension.title}</h1>
        {dimension.description && (
          <p className="text-sm text-gray-600 mb-6 text-justify">
            {dimension.description}
          </p>
        )}
        <div className="space-y-6">
          {filteredAreas.map((area) => (
            <AreaItem
              key={area.id}
              area={area}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};