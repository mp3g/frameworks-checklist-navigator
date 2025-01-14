import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export const HelpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 h-8 w-8"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl mb-4">About Security Controls</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4 text-justify">
          <p>
            The security controls found in this document are the result of combining three different state-of-the-art security standards.
            These security standards are OWASP's ASVS and DSOMM, and MITRE ATT&CK.
          </p>
          <p>
            The combination of these three standards provides an extensive overall analysis of an organization's cybersecurity objectives,
            ensuring an exhaustive and thorough examination from three different perspectives: Security of Applications (blue team/white box perspective),
            Security of Applications and Systems (red team/black box perspective), and a governance perspective of the SSDLC process,
            via a high level overview of the DevSecOps required activities to comply with Security.
          </p>
          <p>
            All security controls have been categorized in various groups and sub-groups, named dimensions and areas.
            A dimension reflects a high-level classification of the different areas that have to be considered throughout the SSDLC.
            Each dimension and area is described in detail in the corresponding sheet. The aim behind this classification is to organize
            all security controls in a comprehensive but flexible manner, in order to facilitate the analysis process.
            For the assessment, it is recommended to work directly on the "Assesment" cells that can be found in sheet "Security Controls".
            All other sheets are intended to be used for reference only.
          </p>
          <p className="font-medium">
            NOTE: In the "Security Controls" sheet, all activities/controls coming from MITTRE ATT&CK's framework are marked in red.
            This means that the original approach that was considered by MITTRE when creating this activity was the one of an adversary
            or attacker trying to hack into the organization's systems. Because of this, they are presented in this document only as
            possible security risks, that link to a mitigation measure or remediation strategy that can be applied as a defensive mechanism.
            It is the responsibility of the organization or the project's manager to decide upon each of these risk-remediation proposals,
            regarding whether the mitigation or monitoring controls should be implemented or not.
          </p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Sources</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://owasp.org/www-project-application-security-verification-standard/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  OWASP Application Security Verification Standard (ASVS)
                </a>
              </li>
              <li>
                <a
                  href="https://owasp.org/www-project-devsecops-maturity-model/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  OWASP Devsecops Maturity Model (DSOMM)
                </a>
              </li>
              <li>
                <a
                  href="https://attack.mitre.org/resources/attack-data-and-tools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  MITTRE ATT&CK Framework
                </a>
              </li>
            </ul>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};