import { useState } from "react";
import { dimensions } from "@/data/mockData";
import { DimensionContent } from "@/components/DimensionContent";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedDimensionId, setSelectedDimensionId] = useState(dimensions[0].id);
  const [localDimensions, setLocalDimensions] = useState(dimensions);
  const { toast } = useToast();

  const selectedDimension = localDimensions.find(
    (d) => d.id === selectedDimensionId
  );

  const calculateDimensionProgress = (dimension: typeof dimensions[0]) => {
    const totalProposals = dimension.areas.reduce(
      (sum, area) => sum + area.remediationProposals.length,
      0
    );
    const completedProposals = dimension.areas.reduce(
      (sum, area) =>
        sum + area.remediationProposals.filter((p) => p.isCompleted).length,
      0
    );
    return totalProposals > 0 ? (completedProposals / totalProposals) * 100 : 0;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-[#F2FCE2]"; // Soft Green
    if (progress >= 50) return "bg-[#FEF7CD]"; // Soft Yellow
    if (progress >= 20) return "bg-[#FDE1D3]"; // Soft Peach
    return "bg-[#FFDEE2]"; // Soft Pink
  };

  const handleToggleComplete = (areaId: string, proposalId?: string) => {
    setLocalDimensions((prevDimensions) =>
      prevDimensions.map((dimension) => ({
        ...dimension,
        areas: dimension.areas.map((area) => {
          if (area.id !== areaId) return area;

          if (proposalId) {
            const updatedProposals = area.remediationProposals.map((proposal) =>
              proposal.id === proposalId
                ? { ...proposal, isCompleted: !proposal.isCompleted }
                : proposal
            );
            const allCompleted = updatedProposals.every((p) => p.isCompleted);
            return {
              ...area,
              isCompleted: allCompleted,
              remediationProposals: updatedProposals,
            };
          } else {
            return {
              ...area,
              isCompleted: !area.isCompleted,
              remediationProposals: area.remediationProposals.map((proposal) => ({
                ...proposal,
                isCompleted: !area.isCompleted,
              })),
            };
          }
        }),
      }))
    );
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(localDimensions, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dimensions-export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Your data has been exported successfully.",
    });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setLocalDimensions(importedData);
        toast({
          title: "Import Successful",
          description: "Your data has been imported successfully.",
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "There was an error importing your data. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
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
                    {localDimensions
                      .filter((d) => d.category === "OWASP ASVS")
                      .map((dimension) => {
                        const progress = calculateDimensionProgress(dimension);
                        return (
                          <button
                            key={dimension.id}
                            onClick={() => setSelectedDimensionId(dimension.id)}
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
                    {localDimensions
                      .filter((d) => d.category === "DSOMM")
                      .map((dimension) => {
                        const progress = calculateDimensionProgress(dimension);
                        return (
                          <button
                            key={dimension.id}
                            onClick={() => setSelectedDimensionId(dimension.id)}
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
                    {localDimensions
                      .filter((d) => d.category === "MITRE ATT&CK")
                      .map((dimension) => {
                        const progress = calculateDimensionProgress(dimension);
                        return (
                          <button
                            key={dimension.id}
                            onClick={() => setSelectedDimensionId(dimension.id)}
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

      {/* Main Content */}
      <div className="flex-1">
        {selectedDimension && (
          <>
            <div className="p-4 border-b flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('import-input')?.click()}
              >
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <input
                id="import-input"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </div>
            <DimensionContent
              dimension={selectedDimension}
              onToggleComplete={handleToggleComplete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;