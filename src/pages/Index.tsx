import { useState } from "react";
import { dimensions as initialDimensions } from "@/data/mockData";
import { DimensionContent } from "@/components/DimensionContent";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { validateDimensionData, normalizeData } from "@/utils/jsonUtils";

const Index = () => {
  const [selectedDimensionId, setSelectedDimensionId] = useState(initialDimensions[0].id);
  const [localDimensions, setLocalDimensions] = useState(initialDimensions);
  const { toast } = useToast();

  const selectedDimension = localDimensions.find(
    (d) => d.id === selectedDimensionId
  );

  const handleToggleComplete = (areaId: string, proposalTitle?: string) => {
    setLocalDimensions((prevDimensions) =>
      prevDimensions.map((dimension) => ({
        ...dimension,
        areas: dimension.areas.map((area) => {
          if (area.id !== areaId) return area;

          if (proposalTitle) {
            // Toggle the specific remediation proposal
            const updatedProposal = {
              ...area.remediationProposals,
              isCompleted: !area.remediationProposals.isCompleted
            };
            
            return {
              ...area,
              isCompleted: updatedProposal.isCompleted,
              remediationProposals: updatedProposal
            };
          } else {
            // Toggle the entire area and its proposal
            return {
              ...area,
              isCompleted: !area.isCompleted,
              remediationProposals: {
                ...area.remediationProposals,
                isCompleted: !area.isCompleted
              }
            };
          }
        }),
      }))
    );
  };

  const handleExport = () => {
    try {
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
    } catch (error) {
      console.error('Export Error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        const validationResult = validateDimensionData(importedData);
        
        if (!validationResult.isValid) {
          console.error('Validation Errors:', validationResult.errors);
          toast({
            title: "Invalid Data Format",
            description: "The imported file contains validation errors. Check console for details.",
            variant: "destructive",
          });
          return;
        }

        const normalizedData = normalizeData(importedData);
        setLocalDimensions(normalizedData);
        toast({
          title: "Import Successful",
          description: "Your data has been imported successfully.",
        });
      } catch (error) {
        console.error('Import Error:', error);
        toast({
          title: "Import Failed",
          description: "There was an error importing your data. Check console for details.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        dimensions={localDimensions}
        selectedDimensionId={selectedDimensionId}
        onSelectDimension={setSelectedDimensionId}
      />
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