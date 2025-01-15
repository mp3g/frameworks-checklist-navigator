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

const getDimensionsByCategory = (dimensions: Dimension[], category: string) => {
  return dimensions.filter((dimension) => 
    dimension.areas.some((area) => 
      area.controls.some((control) => control.category === category)
    )
  );
};

export const Sidebar = ({ dimensions, selectedDimensionId, onSelectDimension }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r shadow-sm relative">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b p-4">
        <h1 className="text-lg font-bold text-primary">CyberSec Frameworks</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4">
          <Accordion type="multiple" defaultValue={["owasp", "dsomm", "mitre"]} className="space-y-2">
            <AccordionItem value="owasp">
              <AccordionTrigger className="text-sm font-semibold">
                OWASP ASVS
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 flex flex-col justify-between">
                  {getDimensionsByCategory(dimensions, "OWASP ASVS").map((dimension) => {
                    const progress = calculateDimensionProgress(dimension);
                    return (
                      <button
                        key={dimension.id}
                        onClick={() => onSelectDimension(dimension.id, "OWASP ASVS")}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-lg mt-1 transition-colors text-xs hover:brightness-95",
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
            <AccordionItem value="dsomm">
              <AccordionTrigger className="text-sm font-semibold">
                DSOMM
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 flex flex-col justify-between">
                  {getDimensionsByCategory(dimensions, "DSOMM").map((dimension) => {
                    const progress = calculateDimensionProgress(dimension);
                    return (
                      <button
                        key={dimension.id}
                        onClick={() => onSelectDimension(dimension.id, "DSOMM")}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-lg mt-1 transition-colors text-xs hover:brightness-95",
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
            <AccordionItem value="mitre">
              <AccordionTrigger className="text-sm font-semibold">
                MITRE ATT&CK
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 flex flex-col justify-between">
                  {getDimensionsByCategory(dimensions, "MITRE ATT&CK").map((dimension) => {
                    const progress = calculateDimensionProgress(dimension);
                    return (
                      <button
                        key={dimension.id}
                        onClick={() => onSelectDimension(dimension.id, "MITRE ATT&CK")}
                        className={cn(
                          "w-full text-left px-4 py-2 rounded-lg mt-1 transition-colors text-xs hover:brightness-95",
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
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};