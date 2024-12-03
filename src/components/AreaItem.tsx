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
  onToggleComplete: (id: string, proposalId?: string) => void;
}

export const AreaItem = ({
  area,
  onToggleComplete,
}: AreaItemProps) => {
  const completedProposals = area.remediationProposals.filter(p => p.isCompleted).length;
  const totalProposals = area.remediationProposals.length;
  const progress = totalProposals > 0 ? (completedProposals / totalProposals) * 100 : 0;

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
          <p className="text-gray-600 mb-4">{area.description}</p>
          
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
                View Remediation Proposals
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {area.remediationProposals.map((proposal) => (
                    <li key={proposal.id} className="flex items-center gap-3">
                      <Checkbox
                        checked={proposal.isCompleted}
                        onCheckedChange={() => onToggleComplete(area.id, proposal.id)}
                        className="mt-1"
                      />
                      <span className="text-gray-600">{proposal.text}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};