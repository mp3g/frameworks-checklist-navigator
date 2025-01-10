import { cn } from "@/lib/utils";
import { Dimension } from "@/types/attributes";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SidebarSectionProps {
  title: string;
  category: string;
  dimensions: Dimension[];
  selectedDimensionId: string;
  onSelectDimension: (id: string, category: string) => void;
}

const getProgressColor = (progress: number) => {
  if (progress >= 80) return "bg-[#F2FCE2]";
  if (progress >= 50) return "bg-[#FEF7CD]";
  if (progress >= 20) return "bg-[#FDE1D3]";
  return "bg-[#FFDEE2]";
};

const calculateDimensionProgress = (dimension: Dimension) => {
  const totalAreas = dimension.areas.length;
  const completedAreas = dimension.areas.reduce(
    (sum, area) => {
      const completedControls = area.controls.filter(
        control => control.isCompleted
      ).length;
      const totalControls = area.controls.length;
      return sum + (totalControls > 0 ? completedControls / totalControls : 0);
    },
    0
  );
  return totalAreas > 0 ? (completedAreas / totalAreas) * 100 : 0;
};

export const SidebarSection = ({ 
  title, 
  category, 
  dimensions, 
  selectedDimensionId, 
  onSelectDimension 
}: SidebarSectionProps) => {
  const sectionDimensions = dimensions.filter((dimension) => 
    dimension.areas.some((area) => 
      area.controls.some((control) => control.category === category)
    )
  );

  return (
    <AccordionItem value={category.toLowerCase()}>
      <AccordionTrigger className="text-sm font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col justify-between space-y-1">
          {sectionDimensions.map((dimension) => {
            const progress = calculateDimensionProgress(dimension);
            return (
              <button
                key={dimension.id}
                onClick={() => onSelectDimension(dimension.id, category)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors text-xs hover:brightness-95",
                  getProgressColor(progress),
                  selectedDimensionId === dimension.id
                    ? "ring-2 ring-accent ring-opacity-50"
                    : ""
                )}
              >
                <div className="text-sm">{dimension.title}</div>
              </button>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};