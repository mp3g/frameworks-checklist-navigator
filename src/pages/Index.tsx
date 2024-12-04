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

const Index = () => {
  const [selectedDimensionId, setSelectedDimensionId] = useState(dimensions[0].id);
  const [localDimensions, setLocalDimensions] = useState(dimensions);

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
    if (progress >= 80) return "text-green-600";
    if (progress >= 50) return "text-yellow-600";
    if (progress >= 20) return "text-orange-600";
    return "text-red-600";
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <ScrollArea className="h-screen">
          <div className="p-4">
            <h1 className="text-xl font-bold text-primary mb-4">Dimensions</h1>
            <Accordion type="single" collapsible className="space-y-2">
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
                              "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors text-sm",
                              selectedDimensionId === dimension.id
                                ? "bg-accent text-white"
                                : "hover:bg-gray-100",
                              getProgressColor(progress)
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
                              "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors text-sm",
                              selectedDimensionId === dimension.id
                                ? "bg-accent text-white"
                                : "hover:bg-gray-100",
                              getProgressColor(progress)
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
                              "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors text-sm",
                              selectedDimensionId === dimension.id
                                ? "bg-accent text-white"
                                : "hover:bg-gray-100",
                              getProgressColor(progress)
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