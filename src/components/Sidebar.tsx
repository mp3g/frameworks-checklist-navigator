import { Dimension } from "@/types/attributes";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  dimensions: Dimension[];
  selectedDimensionId: string;
  onSelectDimension: (id: string) => void;
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
    (sum, area) => sum + (area.remediationProposals.isCompleted ? 1 : 0),
    0
  );
  return totalAreas > 0 ? (completedAreas / totalAreas) * 100 : 0;
};

const getDimensionsByCategory = (dimensions: Dimension[], category: string) => {
  return dimensions.filter((dimension) => 
    dimension.areas.some((area) => 
      area.remediationProposals.category === category
    )
  );
};

export const Sidebar = ({ dimensions, selectedDimensionId, onSelectDimension }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r shadow-sm">
      <ScrollArea className="h-screen">
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary mb-4">Dimensions</h1>
          <Accordion type="multiple" defaultValue={["owasp", "dsomm", "mitre"]} className="space-y-2">
            <AccordionItem value="owasp">
              <AccordionTrigger className="text-sm font-semibold">
                OWASP ASVS
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {getDimensionsByCategory(dimensions, "OWASP ASVS").map((dimension) => {
                    const progress = calculateDimensionProgress(dimension);
                    return (
                      <button
                        key={dimension.id}
                        onClick={() => onSelectDimension(dimension.id)}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors text-sm hover:brightness-95",
                          selectedDimensionId === dimension.id
                            ? "bg-accent text-white"
                            : getProgressColor(progress)
                        )}
                      >
                        {dimension.title}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dsomm">
              <AccordionTrigger className="text-sm font-semibold">
                DSOMM
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {getDimensionsByCategory(dimensions, "DSOMM").map((dimension) => {
                    const progress = calculateDimensionProgress(dimension);
                    return (
                      <button
                        key={dimension.id}
                        onClick={() => onSelectDimension(dimension.id)}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors text-sm hover:brightness-95",
                          selectedDimensionId === dimension.id
                            ? "bg-accent text-white"
                            : getProgressColor(progress)
                        )}
                      >
                        {dimension.title}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mitre">
              <AccordionTrigger className="text-sm font-semibold">
                MITRE ATT&CK
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {getDimensionsByCategory(dimensions, "MITRE ATT&CK").map((dimension) => {
                    const progress = calculateDimensionProgress(dimension);
                    return (
                      <button
                        key={dimension.id}
                        onClick={() => onSelectDimension(dimension.id)}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors text-sm hover:brightness-95",
                          selectedDimensionId === dimension.id
                            ? "bg-accent text-white"
                            : getProgressColor(progress)
                        )}
                      >
                        {dimension.title}
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};
