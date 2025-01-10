import { Area } from "@/types/attributes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface AreaItemProps {
  area: Area;
  onToggleComplete: (areaId: string, proposalId?: string) => void;
}

export const AreaItem = ({ area, onToggleComplete }: AreaItemProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{area.title}</CardTitle>
        {area.description && area.description !== "nan" && (
          <p className="text-sm text-gray-600 text-justify">{area.description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {area.controls.map((control) => (
          <div key={control.id} className="flex items-start gap-3">
            <Checkbox
              checked={control.isCompleted}
              onCheckedChange={() => onToggleComplete(area.id, control.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="text-gray-800 font-medium">{control.title}</div>
              {control.description && control.description !== "nan" && (
                <div className="text-sm text-gray-600 mt-1 text-justify">
                  {control.description}
                </div>
              )}
              <div className="text-xs text-accent mt-1">
                Category: {control.category}
              </div>
              {control.mitigation_measures && control.mitigation_measures.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="text-sm font-medium">Mitigation Measures:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {control.mitigation_measures.map((measure, index) => (
                      <li key={index} className="text-sm text-gray-600 text-justify">
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};