import { useState } from "react";
import { attributes } from "@/data/mockData";
import { AttributeContent } from "@/components/AttributeContent";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedAttributeId, setSelectedAttributeId] = useState(attributes[0].id);

  const selectedAttribute = attributes.find((a) => a.id === selectedAttributeId);

  const handleToggleComplete = (subattributeId: string) => {
    // In a real app, this would update the backend
    console.log("Toggle complete:", subattributeId);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary mb-4">Attributes</h1>
          <nav>
            {attributes.map((attribute) => (
              <button
                key={attribute.id}
                onClick={() => setSelectedAttributeId(attribute.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg mb-2 transition-colors",
                  selectedAttributeId === attribute.id
                    ? "bg-accent text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {attribute.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {selectedAttribute && (
          <AttributeContent
            attribute={selectedAttribute}
            onToggleComplete={handleToggleComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;