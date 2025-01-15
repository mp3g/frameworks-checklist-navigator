import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Area } from "@/types/attributes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardEdit } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AreaItemProps {
  area: Area;
  onToggleComplete: (id: string, controlId?: string) => void;
  onUpdateAudit: (areaId: string, controlId: string, audit: string) => void;
}

export const AreaItem = ({
  area,
  onToggleComplete,
  onUpdateAudit,
}: AreaItemProps) => {
  const { toast } = useToast();
  const [auditText, setAuditText] = useState("");
  const [selectedControlId, setSelectedControlId] = useState<string | null>(null);
  const [selectedControlTitle, setSelectedControlTitle] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const completedControls = area.controls.filter(p => p.isCompleted).length;
  const totalControls = area.controls.length;
  const progress = totalControls > 0 ? (completedControls / totalControls) * 100 : 0;

  const handleSaveAudit = () => {
    if (selectedControlId) {
      onUpdateAudit(area.id, selectedControlId, auditText);
      setDialogOpen(false);
      toast({
        title: "Audit Saved",
        description: "Your audit notes have been saved successfully.",
      });
    }
  };

  return (
    <div className="border rounded-lg p-6 mb-4 bg-white shadow-sm">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={area.isCompleted}
          onCheckedChange={() => onToggleComplete(area.id)}
          className="mt-1"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{area.title}</h3>
          {area.description && area.description !== "nan" && (
            <p className="text-gray-600 text-sm text-justify">{area.description}</p>
          )}
          
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="text-gray-600 mt-1 text-xs">Progress</span>
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
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-base font-medium">{control.title}</div>
                          <Dialog open={dialogOpen && selectedControlId === control.id} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6"
                                onClick={() => {
                                  setSelectedControlId(control.id);
                                  setSelectedControlTitle(control.title);
                                  setAuditText(control.audit || "");
                                }}
                              >
                                <ClipboardEdit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Audit Notes - {selectedControlTitle}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <Textarea
                                  placeholder="Enter your audit notes here..."
                                  value={auditText}
                                  onChange={(e) => setAuditText(e.target.value)}
                                  className="min-h-[200px]"
                                />
                                <Button onClick={handleSaveAudit} className="w-full">
                                  Save Audit Notes
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                        {control.description && control.description !== "nan" && (
                          <div className="text-sm text-gray-600 mt-1 text-justify">{control.description}</div>
                        )}
                        
                        {control.mitigation_measures && control.mitigation_measures.length > 0 && (
                          <div className="mt-2">
                            <div className="text-accent mb-1 font-medium">Mitigation Measures:</div>
                            <ul className="list-disc pl-4 mr-3">
                              {control.mitigation_measures.map((measure, index) => (
                                <li key={index} className="text-sm text-gray-600 text-justify">{measure}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {control.audit && (
                          <div className="mt-3 bg-gray-50 p-3 rounded-md">
                            <div className="text-sm font-medium mb-1">Audit Notes:</div>
                            <p className="text-sm text-gray-600 text-justify">{control.audit}</p>
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