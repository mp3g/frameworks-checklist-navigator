import { Checkbox } from "@/components/ui/checkbox";
import { Subattribute } from "@/types/attributes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubattributeItemProps {
  subattribute: Subattribute;
  onToggleComplete: (id: string) => void;
}

export const SubattributeItem = ({
  subattribute,
  onToggleComplete,
}: SubattributeItemProps) => {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={subattribute.isCompleted}
          onCheckedChange={() => onToggleComplete(subattribute.id)}
          className="mt-1"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{subattribute.title}</h3>
          <p className="text-gray-600 mb-4">{subattribute.description}</p>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="remediation">
              <AccordionTrigger className="text-sm text-accent hover:text-accent/80">
                View Remediation Proposals
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 pt-2 space-y-2">
                  {subattribute.remediationProposals.map((proposal) => (
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