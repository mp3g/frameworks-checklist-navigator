import { Dimension } from "@/types/attributes";
import { AreaItem } from "./AreaItem";

interface DimensionContentProps {
  dimension: Dimension;
  selectedCategory: "OWASP ASVS" | "DSOMM" | "MITRE ATT&CK";
  onToggleComplete: (areaId: string, proposalId?: string) => void;
  onUpdateAudit: (areaId: string, controlId: string, audit: string) => void;
}

export const DimensionContent = ({
  dimension,
  selectedCategory,
  onToggleComplete,
  onUpdateAudit,
}: DimensionContentProps) => {
  // Filter areas to only show controls matching the selected category
  const filteredAreas = dimension.areas.map(area => ({
    ...area,
    controls: area.controls.filter(control => control.category === selectedCategory)
  })).filter(area => area.controls.length > 0);

  return (
    <div className="relative p-6 mx-auto">
      <div>
        <h1 className="text-xl font-semibold mb-3">{dimension.title}</h1>
        {dimension.description && (
          <p className="text-sm text-gray-600 mb-6 text-justify">
            {dimension.description}
          </p>
        )}
        <div className="space-y-3 max-w-7xl mx-auto">
          {filteredAreas.map((area) => (
            <AreaItem
              key={area.id}
              area={area}
              onToggleComplete={onToggleComplete}
              onUpdateAudit={onUpdateAudit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};