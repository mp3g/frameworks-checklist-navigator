import { Checkbox } from "@/components/ui/checkbox";
import { Area } from "@/types/attributes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AreaItemProps {
  area: Area;
  onToggleComplete: (id: string) => void;
}

export const AreaItem = ({
  area,
  onToggleComplete,
}: AreaItemProps) => {
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
          
          <Accordion type="single" collapsible>
            <AccordionItem value="remediation">
              <AccordionTrigger className="text-sm text-accent hover:text-accent/80">
                View Remediation Proposals
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 pt-2 space-y-2">
                  {area.remediationProposals.map((proposal) => (
                    <li key={proposal.id} className="text-gray-600">
                      {proposal.text}
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