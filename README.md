## Introduction
This repository contains a lightweight business cybersecurity assesment tool for code development projects in the design phase of the SSDLC.

The security controls found in this webapp tool are the result of combining three different state-of-the-art cybersecurity standards. These security standards are **OWASP's ASVS**, **DSOMM**, and **MITRE ATT&CK**.

The combination of these three standards provides an extensive overall analysis of an organization's cybersecurity objectives, ensuring an exhaustive and thorough examination from three different perspectives: Security of Applications (blue team/white box perspective), Security of Applications and Systems (red team/black box perspective), and a governance perspective of the SSDLC process, via a high level overview of the DevSecOps required activities to comply with Security.

All security controls have been categorized in various groups and sub-groups, named **dimensions** and **areas**. A dimension reflects a high-level classification of the different areas of security that have to be considered throughout the SSDLC. Each dimension and area is described in detail in the corresponding page. The aim behind this classification is to organize all security controls in a comprehensive but flexible manner, in order to facilitate the analysis process to conduct holistic cybersecurity assessments.
> NOTE: All activities/controls coming from MITRE ATT&CK's framework should be considered as potential threats that could be considered when designing the application or platform's cibersecurity infrastructure and defenses. The reason behind this is that the original considered approach by MITRE when creating this activity was the one of an adversary or attacker trying to hack into the organization's systems. Because of this, they are presented in this document only as possible security risks, that link to a mitigation measure or remediation strategy that can be applied as a defensive mechanism. It is the responsibility of the organization or the project's manager(s) to decide upon each of these risk-remediation proposals, regarding whether the mitigation measures or monitoring controls should be implemented or not.

## How to use
Simply clone or download the repository and run `npm run dev` to compile and launch the webapp locally. Import the provided JSON file in `/assets/output.json` to include all security controls of the checklist. Now you can start working on your assesment.

**WARNING!**: do not refresh the webpage or all changes will be lost. Use the export button for saving your modifications.
>**For the assessment, it is recommended to mark a specific activity as "covered" only after the "audit notes" have been introduced. Changes can be exported to a JSON file. Download the file to save all modifications and import again later.**

## Assets
In the `/assets` directory, the following files are included, for further modifications and addition of new frameworks and checklists:
+ **Security_Controls_Checklist_DSOMM_ASVS_MITTRE.xlsx** - Union of the 3 frameworks (ASVS, DSOMM, MITRE) categorised into groups and subgroups (dimensions and areas)
+ **output.json** - Translation of the above Excel to JSON format
+ **excel2json_script.py** - Script to perform the translation

## Sources
+ [OWASP Application Security Verification Standard (ASVS)](https://owasp.org/www-project-application-security-verification-standard/#) - v4.0.3
+ [OWASP Devsecops Maturity Model (DSOMM)](https://owasp.org/www-project-devsecops-maturity-model/)
+ [MITRE ATT&CK Framework](https://attack.mitre.org/resources/attack-data-and-tools/) - v16.1
