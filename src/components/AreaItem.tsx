import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Area } from "@/types/attributes";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AreaItemProps {
  area: Area;
  onToggleComplete: (id: string, proposalTitle?: string) => void;
}

export const AreaItem = ({
  area,
  onToggleComplete,
}: AreaItemProps) => {
  const { toast } = useToast();
  const completedProposals = area.remediationProposals.filter(p => p.isCompleted).length;
  const totalProposals = area.remediationProposals.length;
  const progress = totalProposals > 0 ? (completedProposals / totalProposals) * 100 : 0;

  const handleProposalHover = (measures: string[]) => {
    toast({
      title: "Mitigation Measures",
      description: (
        <ul className="list-disc pl-4">
          {measures.map((measure, index) => (
            <li key={index} className="text-sm">{measure}</li>
          ))}
        </ul>
      ),
    });
  };

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
                {area.remediationProposals.map((proposal) => (
                  <div 
                    key={proposal.id}
                    className="border-l-2 pl-4 mb-4"
                    onMouseEnter={() => handleProposalHover(proposal.mitigation_measures)}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <Checkbox
                        checked={proposal.isCompleted}
                        onCheckedChange={() => onToggleComplete(area.id, proposal.title)}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-gray-800 font-medium">{proposal.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{proposal.description}</div>
                        <div className="text-xs text-accent mt-1">Category: {proposal.category}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};