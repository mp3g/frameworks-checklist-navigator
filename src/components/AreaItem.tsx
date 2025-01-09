import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Area } from "@/types/attributes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AreaItemProps {
  area: Area;
  onToggleComplete: (id: string, controlId?: string) => void;
}

export const AreaItem = ({
  area,
  onToggleComplete,
}: AreaItemProps) => {
  const completedControls = area.controls.filter(p => p.isCompleted).length;
  const totalControls = area.controls.length;
  const progress = totalControls > 0 ? (completedControls / totalControls) * 100 : 0;

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={area.isCompleted}
          onCheckedChange={() => onToggleComplete(area.id)}
          className="mt-1"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
          {area.description && area.description !== "nan" && (
            <p className="text-gray-600 text-sm">{area.description}</p>
          )}
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="remediation">
              <AccordionTrigger className="text-sm text-accent hover:text-accent/80">
                View Security Controls ({completedControls}/{totalControls})
              </AccordionTrigger>
              <AccordionContent>
                <div className="border-l-2 pl-4 mb-4 space-y-4">
                  {area.controls.map((control) => (
                    <div key={control.id} className="flex items-start gap-3">
                      <Checkbox
                        checked={control.isCompleted}
                        onCheckedChange={() => onToggleComplete(area.id, control.id)}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-gray-800 font-medium">{control.title}</div>
                        {control.description && control.description !== "nan" && (
                          <div className="text-sm text-gray-600 mt-1">{control.description}</div>
                        )}
                        <div className="text-xs text-accent mt-1">Category: {control.category}</div>
                        
                        {control.mitigation_measures && control.mitigation_measures.length > 0 && (
                          <div className="mt-3">
                            <div className="text-sm font-medium mb-1">Mitigation Measures:</div>
                            <ul className="list-disc pl-4">
                              {control.mitigation_measures.map((measure, index) => (
                                <li key={index} className="text-sm text-gray-600">{measure}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};