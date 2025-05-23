import { useState } from "react";
import { dimensions as initialDimensions } from "@/data/mockData";
import { DimensionContent } from "@/components/DimensionContent";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateDimensionData, normalizeData } from "@/utils/jsonUtils";
import { RemediationProposal } from "@/types/attributes";
import { HelpDialog } from "@/components/HelpDialog";

const Index = () => {
  const [selectedDimensionId, setSelectedDimensionId] = useState(initialDimensions[0].id);
  const [selectedCategory, setSelectedCategory] = useState<RemediationProposal["category"]>("OWASP ASVS");
  const [localDimensions, setLocalDimensions] = useState(initialDimensions);
  const { toast } = useToast();

  const selectedDimension = localDimensions.find(
    (d) => d.id === selectedDimensionId
  );

  const handleSelectDimension = (id: string, category: RemediationProposal["category"]) => {
    setSelectedDimensionId(id);
    setSelectedCategory(category);
  };

  const handleUpdateAudit = (areaId: string, controlId: string, audit: string) => {
    setLocalDimensions((prevDimensions) =>
      prevDimensions.map((dimension) => ({
        ...dimension,
        areas: dimension.areas.map((area) => {
          if (area.id !== areaId) return area;
          return {
            ...area,
            controls: area.controls.map((control) =>
              control.id === controlId ? { ...control, audit } : control
            ),
          };
        }),
      }))
    );
  };

  const handleToggleComplete = (areaId: string, proposalId?: string) => {
    // Find all dimensions that contain this area
    const affectedDimensions = localDimensions.filter(dimension =>
      dimension.areas.some(area => area.id === areaId)
    );

    // Get all unique categories where this area appears
    const affectedCategories = new Set(
      affectedDimensions.flatMap(dimension =>
        dimension.areas
          .find(area => area.id === areaId)?.controls
          .map(control => control.category) || []
      )
    );

    // Remove the current category to only show toast for other categories
    affectedCategories.delete(selectedCategory);

    if (affectedCategories.size > 0) {
      toast({
        title: "Area Updated",
        description: `The area has also been updated in ${Array.from(affectedCategories).join(", ")}`,
      });
    }

    setLocalDimensions((prevDimensions) =>
      prevDimensions.map((dimension) => ({
        ...dimension,
        areas: dimension.areas.map((area) => {
          if (area.id !== areaId) return area;

          if (proposalId) {
            // Toggle specific security control
            const updatedControls = area.controls.map(proposal => 
              proposal.id === proposalId 
                ? { ...proposal, isCompleted: !proposal.isCompleted }
                : proposal
            );
            
            // Area is completed if all proposals are completed
            const allControlsCompleted = updatedControls.every(p => p.isCompleted);
            
            return {
              ...area,
              isCompleted: allControlsCompleted,
              controls: updatedControls
            };
          } else {
            // Toggle the entire area and all its proposals
            const newIsCompleted = !area.isCompleted;
            return {
              ...area,
              isCompleted: newIsCompleted,
              controls: area.controls.map(proposal => ({
                ...proposal,
                isCompleted: newIsCompleted
              }))
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
        onSelectDimension={handleSelectDimension}
      />
      <div className="flex-1">
        {selectedDimension && (
          <>
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <HelpDialog />
              </div>
              <div className="flex space-x-2">
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
            </div>
            <DimensionContent
              dimension={selectedDimension}
              selectedCategory={selectedCategory}
              onToggleComplete={handleToggleComplete}
              onUpdateAudit={handleUpdateAudit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
