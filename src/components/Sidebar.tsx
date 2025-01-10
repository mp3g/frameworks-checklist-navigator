import { Dimension } from "@/types/attributes";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarSection } from "./sidebar/SidebarSection";

interface SidebarProps {
  dimensions: Dimension[];
  selectedDimensionId: string;
  onSelectDimension: (id: string, category: string) => void;
}

export const Sidebar = ({ dimensions, selectedDimensionId, onSelectDimension }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r shadow-sm">
      <ScrollArea className="h-screen">
        <div className="p-4">
          <h1 className="text-lg font-bold text-primary mb-4">CyberSec Frameworks</h1>
          <Accordion type="multiple" defaultValue={["owasp", "dsomm", "mitre"]} className="space-y-2">
            <SidebarSection
              title="OWASP ASVS"
              category="OWASP ASVS"
              dimensions={dimensions}
              selectedDimensionId={selectedDimensionId}
              onSelectDimension={onSelectDimension}
            />
            <SidebarSection
              title="DSOMM"
              category="DSOMM"
              dimensions={dimensions}
              selectedDimensionId={selectedDimensionId}
              onSelectDimension={onSelectDimension}
            />
            <SidebarSection
              title="MITRE ATT&CK"
              category="MITRE ATT&CK"
              dimensions={dimensions}
              selectedDimensionId={selectedDimensionId}
              onSelectDimension={onSelectDimension}
            />
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};