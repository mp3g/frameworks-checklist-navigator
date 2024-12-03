import { Dimension } from "@/types/attributes";
import { AreaItem } from "./AreaItem";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface DimensionContentProps {
  dimension: Dimension;
  onToggleComplete: (areaId: string, proposalId?: string) => void;
}

export const DimensionContent = ({
  dimension,
  onToggleComplete,
}: DimensionContentProps) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(dimension, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dimension-${dimension.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Dimension exported successfully");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedData = JSON.parse(content);
          console.log("Imported data:", importedData);
          toast.success("Data imported successfully");
          // Here you would typically update your state with the imported data
          // For now we just log it since we don't have state management set up
        } catch (error) {
          toast.error("Error importing data");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{dimension.title}</h2>
          <p className="text-gray-600">{dimension.description}</p>
        </div>
        <div className="space-x-2">
          <Button onClick={handleExport} variant="outline">
            Export
          </Button>
          <Button variant="outline" className="relative">
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {dimension.areas.map((area) => (
          <AreaItem
            key={area.id}
            area={area}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};