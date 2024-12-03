import { Attribute } from "@/types/attributes";
import { SubattributeItem } from "./SubattributeItem";

interface AttributeContentProps {
  attribute: Attribute;
  onToggleComplete: (subattributeId: string) => void;
}

export const AttributeContent = ({
  attribute,
  onToggleComplete,
}: AttributeContentProps) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{attribute.title}</h2>
      <p className="text-gray-600 mb-6">{attribute.description}</p>
      
      <div className="space-y-4">
        {attribute.subattributes.map((subattribute) => (
          <SubattributeItem
            key={subattribute.id}
            subattribute={subattribute}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};