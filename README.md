<p>This repository contains a lightweight business cybersecurity assesment tool for code development projects in the design phase of the SSDLC. </p>
<p>
  The security controls found in this webapp tool are the result of combining three different state-of-the-art cybersecurity standards.
  These security standards are OWASP's ASVS and DSOMM, and MITRE ATT&CK.
</p>
<p>
  The combination of these three standards provides an extensive overall analysis of an organization's cybersecurity objectives,
  ensuring an exhaustive and thorough examination from three different perspectives: Security of Applications (blue team/white box perspective),
  Security of Applications and Systems (red team/black box perspective), and a governance perspective of the SSDLC process,
  via a high level overview of the DevSecOps required activities to comply with Security.
</p>
<p>
  All security controls have been categorized in various groups and sub-groups, named <b>dimensions</b> and <b>areas</b>.
  A dimension reflects a high-level classification of the different areas of security that have to be considered throughout the SSDLC.
  Each dimension and area is described in detail in the corresponding page. The aim behind this classification is to organize
  all security controls in a comprehensive but flexible manner, in order to facilitate the analysis process to conduct holistic cybersecurity assessments.
</p>
<p className="font-medium">
  NOTE: All activities/controls coming from MITRE ATT&CK's framework should be considered as potential threats that could be considered when designing the  
  application or platform's cibersecurity infrastructure and defenses. The reason behind this is that the original considered approach by MITRE when creating this activity was the one of an adversary
  or attacker trying to hack into the organization's systems. Because of this, they are presented in this document only as
  possible security risks, that link to a mitigation measure or remediation strategy that can be applied as a defensive mechanism.
  It is the responsibility of the organization or the project's manager(s) to decide upon each of these risk-remediation proposals,
  regarding whether the mitigation measures or monitoring controls should be implemented or not.
</p>
<div className="mt-6">
 <h3 className="font-semibold mb-2">How to use</h3>
  <p>Simply clone or download the repository and run <code>npm run dev</code> to compile and launch the webapp locally. Import the provided JSON file in <code>/assets/output.json</code> to include all security controls of the checklist. Now you can start working on your assesment.</p><p><b>WARNING!</b>: do not refresh the webpage or all changes will be lost. Use the export button for saving your modifications.</p>  
 <p><b>For the assessment, it is recommended to mark a specific activity as "covered" only after the "audit notes" have been introduced. Changes can be exported to a JSON file. Download the file to save all modifications and import again later.</b>
</div>
</p>
<div className="mt-6">
  <h3 className="font-semibold mb-2">Assets</h3>
  <p>In the <code>/assets</code> directory, the following files are included, for further modifications and addition of new frameworks and checklists:</p>
  <ul className="space-y-1">
    <li>
        <b>Security_Controls_Checklist_DSOMM_ASVS_MITTRE.xlsx</b> - Union of the 3 frameworks (ASVS, DSOMM, MITRE) categorised into groups and subgroups (dimensions and areas)
    </li>
    <li>
      <b>output.json</b> - Translation of the above Excel to JSON format
    </li>
    <li>
      <b>excel2json_script.py</b> - Script to perform the translation
    </li>
  </ul>
</div>
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
        MITRE ATT&CK Framework
      </a>
    </li>
  </ul>
</div>
