// ============================================================
// PROCESS SERVING DATA
// TFTS — Tactical Field Intelligence Service
// ============================================================

export interface ProcessServingPageData {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  documentCategory: string;
  legalBasis: string;
  intro: string;
  whatItIs: string;
  legalContext: string;
  ourApproach: { heading: string; body: string }[];
  whatYouReceive: string[];
  whoInstructs: string[];
  faqs: { q: string; a: string }[];
  relatedPages: { title: string; slug: string }[];
}

export const processServingHub = {
  metaTitle: "Process Serving Services | TFTS",
  metaDescription:
    "Professional process serving across England and Wales. Court documents, statutory demands, bankruptcy and winding-up petitions. Instructed by law firms, insolvency practitioners and creditors. Proof of service provided.",
  intro:
    "Process serving is the formal mechanism by which legal documents are delivered to parties in civil and commercial proceedings. When documents carry legal consequence — the commencement of insolvency proceedings, the initiation of litigation, or statutory deadlines — their delivery cannot be casual.",
  position: `We are instructed by solicitors, insolvency practitioners, debt recovery teams and corporate creditors. Our process serving operations are conducted with precision, documentation and a clear understanding of the procedural rules that govern valid service.`,
  trustPoints: [
    "Instructed by law firms across England and Wales",
    "Rapid response to time-critical matters",
    "Proof of service as standard",
    "Nationwide coverage; London specialists",
    "Understanding of Civil Procedure Rules",
    "Multiple attempts where required",
  ],
  documentTypes: [
    {
      title: "Court Documents",
      slug: "court-papers",
      body: "Claims, orders, injunctions and other court documents requiring formal service on named respondents.",
    },
    {
      title: "Statutory Demands",
      slug: "statutory-demand",
      body: "Section 268 and Section 123 statutory demands requiring correct service to form the basis of insolvency proceedings.",
    },
    {
      title: "Bankruptcy Petitions",
      slug: "bankruptcy-petition",
      body: "Personal insolvency petitions requiring personal service on the respondent debtor.",
    },
    {
      title: "Winding-Up Petitions",
      slug: "winding-up-petition",
      body: "Corporate insolvency petitions requiring correct service on the registered or principal address of a company.",
    },
    {
      title: "Urgent Instructions",
      slug: "urgent",
      body: "Same-day and next-day process serving for time-critical matters with deadlines imminent.",
    },
    {
      title: "Difficult Subjects",
      slug: "difficult-subject",
      body: "Subjects who are evading service, whose address is uncertain or who have previously refused to accept documents.",
    },
    {
      title: "Address Tracing",
      slug: "address-tracing",
      body: "When the address of the respondent is unknown, we conduct tracing intelligence to establish a serviceable address.",
    },
  ],
};

export const processServingPages: Record<string, ProcessServingPageData> = {
  "court-papers": {
    slug: "court-papers",
    title: "Court Document Service",
    subtitle: "Formal service of court proceedings on respondents across England and Wales",
    metaTitle: "Court Document Process Serving | TFTS",
    metaDescription:
      "Professional service of court documents including claims, orders, injunctions and freezing orders. Instructed by solicitors. Proof of service provided. Nationwide coverage.",
    documentCategory: "Court Documents",
    legalBasis: "Civil Procedure Rules (CPR) Part 6",
    intro:
      "The service of court documents is a procedural step that, if conducted incorrectly, can invalidate proceedings, create delay and expose practitioners to cost consequences. We serve court documents with precision, maintaining a complete record that can withstand scrutiny in subsequent hearings.",
    whatItIs:
      "Court documents requiring formal process serving include: Claims Forms (N1), Particulars of Claim, Orders (including injunctions and freezing orders), Petitions, Notices of Application, Penal Notices and ancillary court materials. Each document type carries distinct service requirements under the Civil Procedure Rules.",
    legalContext:
      "CPR Part 6 governs service of court documents within England and Wales. Where personal service is required or directed, documents must be handed to or left with the named individual. Where the court has directed alternative service, we can execute service by the method specified. We document every attempt and outcome with the level of particularity required to support a witness statement or affidavit of service.",
    ourApproach: [
      {
        heading: "Instruction Receipt",
        body: "We accept instructions from solicitors, legal executives and court officers. Instructions should include: the document(s) to be served, the name of the respondent, the address for service and any relevant deadline or procedural context.",
      },
      {
        heading: "Pre-Service Assessment",
        body: "Before attending, we review the instruction, confirm the address and assess any known complications. Where the subject has a history of evading service, we apply enhanced methodology from the outset.",
      },
      {
        heading: "Attendance and Service",
        body: "Our agents attend at the specified address and execute service in accordance with CPR requirements. Where personal service is required, we confirm the identity of the recipient before tendering documents.",
      },
      {
        heading: "Contemporaneous Record",
        body: "Every attendance is recorded: time, date, location, method, outcome and the identity of any person who received documents or who was present.",
      },
      {
        heading: "Proof of Service",
        body: "We provide a completed Proof of Service document suitable for filing. Where required, we can prepare a witness statement or affidavit of service for use in proceedings.",
      },
    ],
    whatYouReceive: [
      "Confirmation of service (or non-service) by secure communication",
      "Completed proof of service documentation",
      "Contemporaneous attendance record",
      "Witness statement / affidavit of service where required",
      "Photographic evidence of attendance where appropriate",
      "Multiple attempts where service is not achieved on first attendance",
    ],
    whoInstructs: [
      "Solicitors and legal executives",
      "Barristers' chambers",
      "Commercial litigation teams",
      "Debt recovery solicitors",
      "Family law practitioners",
      "Employment law practitioners",
    ],
    faqs: [
      {
        q: "How quickly can you serve court documents?",
        a: "Same-day service is available for urgent matters in London and major cities. Standard instructions are typically executed within 24–48 hours. Please indicate any deadline when instructing.",
      },
      {
        q: "What if service cannot be effected?",
        a: "We will provide a detailed report of attempts made, which can be used to support an application to the court for alternative service under CPR 6.15 or 6.27.",
      },
      {
        q: "Can you serve documents on companies?",
        a: "Yes. Service on a company is typically effected by delivering documents to the company's registered office or principal place of business. We confirm the correct address before attending.",
      },
      {
        q: "Can you serve injunctions and freezing orders?",
        a: "Yes. We understand the time-critical nature of injunctions and the requirement for immediate service. We are available around the clock for urgent injunctive matters.",
      },
      {
        q: "Do you provide a certificate or affidavit of service?",
        a: "We provide a proof of service document as standard. Where a formal witness statement or affidavit is required for court proceedings, we can prepare this on request.",
      },
    ],
    relatedPages: [
      { title: "Statutory Demand Service", slug: "statutory-demand" },
      { title: "Urgent Service", slug: "urgent" },
      { title: "Difficult Subjects", slug: "difficult-subject" },
    ],
  },

  "statutory-demand": {
    slug: "statutory-demand",
    title: "Statutory Demand Service",
    subtitle: "Correct service of Section 268 and Section 123 demands — the essential precursor to insolvency proceedings",
    metaTitle: "Statutory Demand Service | TFTS",
    metaDescription:
      "Professional service of statutory demands on individuals and companies. Instructed by insolvency practitioners, solicitors and creditors. Correct service is essential to valid insolvency proceedings.",
    documentCategory: "Statutory Demands",
    legalBasis: "Insolvency Act 1986, ss.123 and 268; Insolvency Rules 2016",
    intro:
      "A statutory demand is the formal gateway to insolvency proceedings. Incorrectly served, it is worth nothing. Served correctly and contemporaneously documented, it creates the presumption of inability to pay and forms the legal foundation for a bankruptcy or winding-up petition.",
    whatItIs:
      "A statutory demand is a formal written demand for payment of a debt exceeding the relevant threshold. Under the Insolvency Act 1986: Section 268 applies to individuals (the basis for a bankruptcy petition); Section 123(1)(a) applies to companies (the basis for a winding-up petition). The demand must be served in accordance with the Insolvency Rules 2016 and any applicable Practice Direction.",
    legalContext:
      "Under the Insolvency Rules 2016, a statutory demand on an individual should be served personally where practicable. Where personal service is not possible, the creditor may substitute service — but this requires an application to the court. Our practice is to attempt personal service as a priority, maintaining a detailed attendance record that can support such applications if needed. For companies, service on the registered office or principal place of business is generally sufficient, but must be documented.",
    ourApproach: [
      {
        heading: "Instruction Review",
        body: "We receive the statutory demand from the instructing party and confirm: the name of the debtor, the service address, whether it is a personal or corporate demand, and any known complications.",
      },
      {
        heading: "Address Verification",
        body: "Before attendance, we verify the address is current and associated with the named debtor. Where there is doubt, we conduct preliminary intelligence before wasting an attendance.",
      },
      {
        heading: "Personal Service Attempts",
        body: "We attend the address and attempt personal service. Our agents are trained to confirm identity before tendering documents, using professional but firm methodology.",
      },
      {
        heading: "Non-Personal Service Record",
        body: "Where personal service is not achieved, we document each attempt with sufficient particularity to support a substituted service application: dates, times, observations at the property, evidence of habitation.",
      },
      {
        heading: "Proof Documentation",
        body: "We provide a comprehensive proof of service or service report, ready for use by instructing solicitors or insolvency practitioners in subsequent proceedings.",
      },
    ],
    whatYouReceive: [
      "Contemporaneous service record for each attendance",
      "Proof of service documentation",
      "Witness statement or affidavit of service on request",
      "Photographic evidence of attendance",
      "Subject attendance/non-attendance notes",
      "Evidence to support substituted service application where required",
    ],
    whoInstructs: [
      "Insolvency practitioners",
      "Debt recovery solicitors",
      "Commercial litigation solicitors",
      "Creditors and finance companies",
      "Accountants and forensic accountants",
      "Asset recovery firms",
    ],
    faqs: [
      {
        q: "Why does correct service of a statutory demand matter?",
        a: "If a statutory demand is not served correctly, the court may set it aside. This wastes cost and time and may prevent insolvency proceedings from being commenced. Correct, documented service protects the creditor's position.",
      },
      {
        q: "What if the debtor refuses to accept the documents?",
        a: "If a debtor refuses, the demand can still be served by leaving it with them or in their presence. We document refused service carefully to ensure the service is valid.",
      },
      {
        q: "What if we cannot locate the debtor?",
        a: "We offer address tracing as part of the instruction where the current address is unknown. We can conduct intelligence to establish a current address before the service attempt.",
      },
      {
        q: "How many attempts do you make?",
        a: "We make multiple attempts at different times and days to maximise the prospect of personal service. The number of attempts and timing is agreed with the instructing party based on urgency and circumstances.",
      },
      {
        q: "Can you serve a statutory demand on a company director personally?",
        a: "Yes, where the creditor requires personal service on a director rather than (or in addition to) service on the company, we can conduct personal service on named individuals.",
      },
    ],
    relatedPages: [
      { title: "Bankruptcy Petition Service", slug: "bankruptcy-petition" },
      { title: "Winding-Up Petition Service", slug: "winding-up-petition" },
      { title: "Address Tracing", slug: "address-tracing" },
    ],
  },

  "bankruptcy-petition": {
    slug: "bankruptcy-petition",
    title: "Bankruptcy Petition Service",
    subtitle: "Personal service of bankruptcy petitions — professional, documented, defensible",
    metaTitle: "Bankruptcy Petition Process Serving | TFTS",
    metaDescription:
      "Expert personal service of bankruptcy petitions on individual debtors. Instructed by insolvency practitioners and creditors' solicitors. Correct service documentation provided.",
    documentCategory: "Bankruptcy Petitions",
    legalBasis: "Insolvency Act 1986, s.264; Insolvency Rules 2016, r.10.7",
    intro:
      "A bankruptcy petition is one of the most consequential documents that can be served on an individual. Personal service is the rule. The manner and fact of service must be capable of withstanding cross-examination. We approach every bankruptcy petition instruction with the rigour it demands.",
    whatItIs:
      "A bankruptcy petition is a formal court application to make an individual bankrupt. Under the Insolvency Rules 2016, a creditor's bankruptcy petition must generally be served personally on the debtor. Service must be effected before the hearing date and the server must be able to provide evidence of the fact of service at the hearing if required.",
    legalContext:
      "Rule 10.7 of the Insolvency Rules 2016 requires that a bankruptcy petition be served personally on the debtor. The server must be prepared to provide evidence of service in court. Where personal service cannot be effected, the petitioning creditor may apply for substituted service, but must demonstrate efforts to effect personal service. Our documentation is prepared with this standard in mind.",
    ourApproach: [
      {
        heading: "Pre-Attendance Intelligence",
        body: "We verify the debtor's address before each attendance and identify any patterns of presence or absence that may assist service.",
      },
      {
        heading: "Identity Confirmation",
        body: "Before tendering documents, our agents take steps to confirm the identity of the person at the door. We do not serve unknown persons without proper identification.",
      },
      {
        heading: "Service and Documentation",
        body: "Upon confirmed identification, documents are tendered. The time, date, location, identity confirmation method and outcome are recorded contemporaneously.",
      },
      {
        heading: "Multiple Attempts",
        body: "Where the debtor is not present on initial attendance, we make further attempts at different times — morning, afternoon, evening — to maximise the prospect of personal service.",
      },
      {
        heading: "Hearing-Ready Evidence",
        body: "Our proof of service documentation and witness statements are prepared to the standard required to support oral evidence at the bankruptcy hearing.",
      },
    ],
    whatYouReceive: [
      "Personal service (where achieved) with identity confirmation",
      "Contemporaneous service record",
      "Witness statement or affidavit of service",
      "Photographic evidence of attendance",
      "Detailed non-service report for substituted service applications",
      "Multiple attempt records with times and observations",
    ],
    whoInstructs: [
      "Insolvency practitioners",
      "Creditors' solicitors",
      "Debt recovery solicitors",
      "Litigation funding entities",
      "Corporate creditors with in-house legal teams",
    ],
    faqs: [
      {
        q: "Is personal service always required for bankruptcy petitions?",
        a: "Under the Insolvency Rules 2016, personal service is the default requirement for creditor's bankruptcy petitions. The court can order substituted service, but only where attempts at personal service have been documented.",
      },
      {
        q: "What counts as valid personal service?",
        a: "Personal service requires that the document be physically handed to the individual named, or where they refuse to accept it, left with them in their presence. We ensure this requirement is met and documented.",
      },
      {
        q: "What happens if the debtor is avoiding service?",
        a: "We apply enhanced methodology: attendance at different times, observation of patterns, intelligence regarding movements. If service remains impossible, we provide detailed documentation to support a substituted service application.",
      },
      {
        q: "Can you provide evidence for the bankruptcy hearing?",
        a: "Yes. Our agents can prepare a witness statement and, where required, attend court to provide evidence of service.",
      },
    ],
    relatedPages: [
      { title: "Statutory Demand Service", slug: "statutory-demand" },
      { title: "Difficult Subject Service", slug: "difficult-subject" },
      { title: "Address Tracing", slug: "address-tracing" },
    ],
  },

  "winding-up-petition": {
    slug: "winding-up-petition",
    title: "Winding-Up Petition Service",
    subtitle: "Correct service of compulsory winding-up petitions on companies — precision execution for insolvency proceedings",
    metaTitle: "Winding-Up Petition Process Serving | TFTS",
    metaDescription:
      "Professional service of winding-up petitions on companies. Registered office and principal place of business service. Instructed by insolvency practitioners and creditors' solicitors.",
    documentCategory: "Winding-Up Petitions",
    legalBasis: "Insolvency Act 1986, s.124; Insolvency Rules 2016, r.7.9",
    intro:
      "A winding-up petition is a mechanism to compel the compulsory liquidation of a company. Service must be on the company itself, at the correct address, and in the correct manner. Errors in service give the company grounds to challenge proceedings at the outset.",
    whatItIs:
      "A creditor's winding-up petition, filed under Section 124 of the Insolvency Act 1986, asks the court to make a winding-up order against a company. Rule 7.9 of the Insolvency Rules 2016 provides for service of the petition on the company at its registered office or principal place of business.",
    legalContext:
      "Service on a company for winding-up purposes must be at the registered office unless the company has no registered office in England and Wales (in which case, service at the principal place of business). We confirm the current registered office with Companies House before attending. Where the registered office is vacant or inaccessible, we document this carefully to support any subsequent application for alternative service.",
    ourApproach: [
      {
        heading: "Registered Office Verification",
        body: "We confirm the current registered office with Companies House immediately before attendance. Registered offices change, and service at an out-of-date address will not be valid.",
      },
      {
        heading: "Attendance and Service",
        body: "We attend the registered office and serve the petition in accordance with the Insolvency Rules. We note the name and role of any person who receives the documents.",
      },
      {
        heading: "Documentation",
        body: "We record time, date, address attended, name and role of recipient, and any other material observations. This record forms the basis of the proof of service.",
      },
      {
        heading: "Vacant Office Protocol",
        body: "Where the registered office is a letter-box address, unmanned agent, or vacant premises, we document this and advise on the options available under the Rules.",
      },
    ],
    whatYouReceive: [
      "Proof of service documentation",
      "Contemporaneous attendance record",
      "Confirmation of registered office attended",
      "Name and role of any recipient",
      "Photographic evidence of attendance",
      "Witness statement on request",
    ],
    whoInstructs: [
      "Insolvency practitioners",
      "Creditors' solicitors",
      "Commercial litigation solicitors",
      "Banks and institutional creditors",
      "HMRC legal teams (via solicitors)",
      "Corporate creditors",
    ],
    faqs: [
      {
        q: "What is the correct address for service of a winding-up petition?",
        a: "Rule 7.9 of the Insolvency Rules 2016 provides for service at the company's registered office. If the registered office is in Scotland or Northern Ireland, service is on the principal place of business in England or Wales. We verify the registered office before attendance.",
      },
      {
        q: "Can service be on a director personally?",
        a: "For a winding-up petition, service is on the company, not the directors personally. However, some petitioners also serve directors personally as a matter of practice. We can arrange both.",
      },
      {
        q: "What if the registered office is an accountant or agent's address?",
        a: "Service on an accountant's or agent's address which is the registered office is valid service on the company. We attend and confirm who we are leaving documents with.",
      },
      {
        q: "How quickly can you serve a winding-up petition?",
        a: "Winding-up petitions can be served same-day in London and major cities, and within 24 hours in other locations across England and Wales.",
      },
    ],
    relatedPages: [
      { title: "Statutory Demand Service", slug: "statutory-demand" },
      { title: "Court Document Service", slug: "court-papers" },
      { title: "Urgent Instructions", slug: "urgent" },
    ],
  },

  urgent: {
    slug: "urgent",
    title: "Urgent Process Serving",
    subtitle: "Same-day and next-day service for time-critical legal documents",
    metaTitle: "Urgent Process Serving — Same Day | TFTS",
    metaDescription:
      "Urgent same-day and next-day process serving across England and Wales. Court documents, statutory demands, petitions. Available for time-critical injunctive and insolvency matters.",
    documentCategory: "Urgent Service",
    legalBasis: "Civil Procedure Rules; Insolvency Rules 2016",
    intro:
      "Some process serving instructions cannot wait. Injunctions expire. Petition hearings approach. Deadlines under court orders are absolute. When speed and reliability are the same requirement, our urgent service capability exists to meet it.",
    whatItIs:
      "Urgent process serving is same-day or next-day execution of formal service of legal documents where a deadline, hearing or legal deadline makes standard scheduling impractical or impossible. We maintain the capacity for rapid instruction acceptance and immediate deployment.",
    legalContext:
      "Procedural deadlines under the Civil Procedure Rules and Insolvency Rules are not forgiving. A document not served before a hearing may mean an adjournment, additional cost and procedural embarrassment. Where injunctive relief has been obtained, service must often be effected before the respondent can make further decisions. We understand that urgency is not an excuse for poor documentation — every urgent instruction receives the same quality of evidence as a standard one.",
    ourApproach: [
      {
        heading: "Immediate Instruction Acceptance",
        body: "Urgent instructions are accepted around the clock. We do not require advance notice — an instruction received at 8pm for a 9am court appointment the following morning can be accommodated.",
      },
      {
        heading: "Immediate Agent Deployment",
        body: "On acceptance of the instruction, we assign and deploy the most proximate available agent to the service address. In London, this can often result in attendance within two to three hours.",
      },
      {
        heading: "Real-Time Communication",
        body: "For urgent matters, we maintain real-time contact with the instructing party — updating on departure, arrival, and outcome as it happens.",
      },
      {
        heading: "Same-Standard Documentation",
        body: "Urgency does not reduce the quality of our documentation. The proof of service produced from an urgent instruction is identical in standard to that from a standard one.",
      },
    ],
    whatYouReceive: [
      "Immediate instruction confirmation",
      "Real-time deployment and attendance updates",
      "Same-day or next-day service execution",
      "Full proof of service on completion",
      "Emergency out-of-hours availability",
      "Coverage across England and Wales",
    ],
    whoInstructs: [
      "Litigation solicitors with imminent hearings",
      "Insolvency practitioners with petition deadlines",
      "Commercial teams seeking to execute injunctions",
      "Creditors with expiring limitation windows",
      "In-house legal departments with urgent court orders",
    ],
    faqs: [
      {
        q: "How quickly can you respond to an urgent instruction?",
        a: "In central London, we can deploy within two to three hours of receiving an instruction. For other locations, we advise on realistic timescales on acceptance. We do not overcommit.",
      },
      {
        q: "Are you available outside business hours?",
        a: "Yes. Urgent instructions are accepted around the clock, including evenings and weekends. An instruction received after 9pm can typically be actioned from early the following morning.",
      },
      {
        q: "What geographic coverage do you have for urgent matters?",
        a: "We can deploy to any location across England and Wales. London and major cities carry faster response times. For remote locations, we advise on realistic timescales.",
      },
      {
        q: "What documents can you serve on an urgent basis?",
        a: "Any document: court proceedings, injunctions, freezing orders, statutory demands, bankruptcy or winding-up petitions, enforcement documents. If it needs to be served, we can serve it urgently.",
      },
    ],
    relatedPages: [
      { title: "Court Document Service", slug: "court-papers" },
      { title: "Difficult Subjects", slug: "difficult-subject" },
      { title: "Statutory Demand Service", slug: "statutory-demand" },
    ],
  },

  "difficult-subject": {
    slug: "difficult-subject",
    title: "Service on Difficult or Evasive Subjects",
    subtitle: "Where conventional service has failed or where evasion is anticipated",
    metaTitle: "Service on Evasive or Difficult Subjects | TFTS",
    metaDescription:
      "Specialist process serving on subjects who are evading service, changing addresses or refusing to accept documents. Professional, documented and legally defensible. Instructed by solicitors.",
    documentCategory: "Difficult Subjects",
    legalBasis: "Civil Procedure Rules Part 6; Insolvency Rules 2016",
    intro:
      "The more significant the legal document, the more likely the recipient is to know it is coming — and to take steps to avoid it. We specialise in service on subjects who have evaded previous agents, changed their address without warning, or who are actively refusing to accept documents.",
    whatItIs:
      "Difficult subject service refers to process serving instructions where the subject is known or suspected to be evading service, where previous attempts have failed, or where the subject's address is uncertain. It combines process serving with intelligence capability — locating, approaching and serving subjects who do not wish to be served.",
    legalContext:
      "When conventional service has failed, the courts provide mechanisms including substituted service (CPR 6.15) and service by alternative method. But these applications require evidence that genuine attempts at personal service have been made. Our role is twofold: to maximise the prospect of achieving actual service, and to create an evidence trail that supports a substituted service application if actual service proves impossible.",
    ourApproach: [
      {
        heading: "Intelligence Review",
        body: "Before each attendance, we review available intelligence on the subject's movements, patterns and likely presence. We do not waste attendances on cold addresses.",
      },
      {
        heading: "Covert Pre-Survey",
        body: "Where warranted, we conduct a covert observation of the premises before committing to a formal service attempt — confirming signs of habitation and potential presence of the subject.",
      },
      {
        heading: "Varied Attendance Pattern",
        body: "We attend at different times: early morning, late evening, weekends. Subjects who avoid daytime service are often present at other hours.",
      },
      {
        heading: "Professional Engagement",
        body: "Our agents are trained to engage with subjects professionally and without escalation. The objective is service, not confrontation.",
      },
      {
        heading: "Substituted Service Package",
        body: "If all reasonable attempts fail, we compile a full substituted service package for the instructing solicitor: attendance records, observation notes, photographs, intelligence on habitation, supporting witness statement.",
      },
    ],
    whatYouReceive: [
      "Multiple attendance records with contemporaneous notes",
      "Pre-survey intelligence reports where conducted",
      "Photographic evidence of attendance",
      "Evidence of habitation (or vacancy) at address",
      "Witness statement ready for substituted service application",
      "Advice on the merits of alternative service applications",
    ],
    whoInstructs: [
      "Solicitors whose agents have previously failed to serve",
      "Insolvency practitioners with evasive debtors",
      "Commercial litigation teams",
      "Debt recovery legal teams",
      "Asset recovery firms",
    ],
    faqs: [
      {
        q: "What makes a subject 'difficult' for service purposes?",
        a: "A subject may be difficult because they are actively evading (changing address, avoiding answering doors), because they have multiple addresses, because they work irregular hours, because they are abroad for periods, or because they have a history of refusing documents.",
      },
      {
        q: "Do you combine intelligence with service attempts?",
        a: "Yes. Our investigations capability means we can conduct address tracing, subject intelligence and covert observation alongside the process serving instruction, maximising the prospect of achieving service.",
      },
      {
        q: "What evidence do I receive to support a substituted service application?",
        a: "We provide: a detailed attendance log (time, date, observations, outcome for each attempt), evidence of habitation at the address, witness statement, and photographic evidence. This is prepared with the CPR 6.15 application in mind.",
      },
      {
        q: "Can you serve across multiple addresses simultaneously?",
        a: "Yes. Where a subject is known to have multiple potential addresses — a home, a second property, a business address — we can coordinate simultaneous or sequential attempts across all.",
      },
    ],
    relatedPages: [
      { title: "Address Tracing", slug: "address-tracing" },
      { title: "Urgent Service", slug: "urgent" },
      { title: "Court Document Service", slug: "court-papers" },
    ],
  },

  "address-tracing": {
    slug: "address-tracing",
    title: "Address Tracing for Process Serving",
    subtitle: "Locating individuals and companies to enable formal service of legal documents",
    metaTitle: "Address Tracing for Process Serving | TFTS",
    metaDescription:
      "Professional address tracing to locate individuals and companies for process serving purposes. Used by insolvency practitioners, solicitors and creditors across England and Wales.",
    documentCategory: "Address Tracing",
    legalBasis: "Data Protection Act 2018; ICO guidance on legitimate processing",
    intro:
      "Legal proceedings cannot be commenced, or cannot be progressed, if a respondent or debtor cannot be located. Address tracing is the intelligence discipline that locates individuals and companies to enable the formal legal process to continue. We trace current, serviceable addresses from which we can then execute service.",
    whatItIs:
      "Address tracing is the use of lawful intelligence and database methodology to establish the current address of an individual or the current registered or principal address of a company, for the purpose of service of legal documents or commencement of legal proceedings.",
    legalContext:
      "All tracing work is conducted in accordance with the Data Protection Act 2018 and ICO guidance. We process personal information only where there is a legitimate legal purpose — process serving and the administration of legal proceedings constitutes a lawful basis. Our methods are lawful, our sources are authorised, and our records are maintained in accordance with UK data protection standards.",
    ourApproach: [
      {
        heading: "Instruction Briefing",
        body: "We receive details of the individual or company to be traced, together with any last known information. The more information available, the more targeted our methodology.",
      },
      {
        heading: "Database Intelligence",
        body: "We access authorised tracing databases including electoral roll records, Companies House, Land Registry, county court judgments and other lawfully accessible sources.",
      },
      {
        heading: "Intelligence Validation",
        body: "Database results are validated before being presented as a service address. We do not serve a legal document on a historical or inaccurate address.",
      },
      {
        heading: "Field Confirmation",
        body: "Where the stakes are high — a bankruptcy petition, for example — we conduct field confirmation of the traced address before committing to formal service.",
      },
      {
        heading: "Service Execution",
        body: "Where we are instructed to both trace and serve, we proceed directly to service execution on confirmation of the address, minimising delay.",
      },
    ],
    whatYouReceive: [
      "Traced address with source basis (where disclosable)",
      "Confidence assessment of traced address",
      "Field verification where requested",
      "Report suitable for use in legal proceedings",
      "Direct handover to service team where instructed",
      "Data handling and retention in accordance with DPA 2018",
    ],
    whoInstructs: [
      "Insolvency practitioners",
      "Debt recovery solicitors",
      "Commercial litigation solicitors",
      "Finance and credit companies",
      "Enforcement agents (via solicitors)",
      "Corporate creditors",
    ],
    faqs: [
      {
        q: "What information do you need to trace an individual?",
        a: "As a minimum: full name and last known address. Date of birth, last known employer, vehicle registration and other identifiers improve accuracy significantly. The more you can provide, the more targeted the trace.",
      },
      {
        q: "Is address tracing legal?",
        a: "Yes. Address tracing conducted for legitimate legal purposes — process serving, debt recovery, insolvency proceedings — is lawful under the Data Protection Act 2018. All our tracing work is conducted in accordance with ICO guidance and relevant data protection standards.",
      },
      {
        q: "How long does tracing take?",
        a: "Most traces complete within 24–48 hours. More complex cases — subjects who have moved multiple times, subjects who are actively concealing their address — may require longer. We advise on timescales on instruction.",
      },
      {
        q: "Can you trace company directors?",
        a: "Yes. Directors are often traceable through Companies House, professional registrations, and other lawfully accessible records. We can trace both the company and specific named directors.",
      },
      {
        q: "What happens if you cannot trace the address?",
        a: "We report the results of our enquiries in detail, including sources consulted, records checked, and the basis for our inability to confirm a current address. This can support an application to the court.",
      },
    ],
    relatedPages: [
      { title: "Difficult Subject Service", slug: "difficult-subject" },
      { title: "Statutory Demand Service", slug: "statutory-demand" },
      { title: "Bankruptcy Petition Service", slug: "bankruptcy-petition" },
    ],
  },
};

// Location pages data
export const processServerLocations = {
  london: {
    slug: "london",
    cityName: "London",
    regionName: "Greater London & South East",
    metaTitle: "Process Server London | TFTS",
    metaDescription:
      "Professional process serving in London and Greater London. Court documents, statutory demands, bankruptcy and winding-up petitions. Instructed by law firms and insolvency practitioners. Same-day service available.",
    headline: "London Process Server",
    subheadline: "Professional process serving across Greater London — from the Royal Courts of Justice to the M25",
    coverageAreas: [
      "City of London", "Westminster", "Canary Wharf", "Mayfair", "Kensington & Chelsea",
      "Southwark", "Tower Hamlets", "Islington", "Camden", "Hackney",
      "Lambeth", "Wandsworth", "Greenwich", "Bromley", "Croydon",
      "Kingston", "Richmond", "Hammersmith", "Ealing", "Brent",
      "Barnet", "Enfield", "Haringey", "Waltham Forest", "Redbridge",
      "Havering", "Barking", "Newham", "Lewisham", "Sutton", "Harrow"
    ],
    intro: `London is the hub of England's commercial and legal system. The majority of high-value insolvency proceedings, commercial litigation and corporate disputes are issued from London courts. Our London process serving operation is designed to meet the demands of the City's solicitors, insolvency practitioners and corporate legal teams — fast, professional and fully documented.`,
    context: `London's legal geography presents specific challenges: the density of commercial addresses, the prevalence of registered office agent services, gated residential buildings, and the frequency of urgent instructions tied to Chancery Lane, the Rolls Building and the Business and Property Courts. We are accustomed to all of these.`,
    capabilities: [
      { title: "Same-Day London Service", body: "For urgent instructions, we can deploy to most central London postcodes within two to three hours of instruction acceptance." },
      { title: "Royal Courts of Justice Matters", body: "We serve documents tied to all divisions of the High Court, including the Business and Property Courts, the Chancery Division and the King's Bench Division." },
      { title: "Corporate Registered Offices", body: "London's concentration of company registered offices, letter-box addresses and agent addresses requires particular care. We confirm current registered status before every attendance." },
      { title: "Out-of-Hours Availability", body: "Injunctions, emergency orders and same-day insolvency matters are not confined to business hours. We are available around the clock for urgent London instructions." },
    ],
    schema: {
      "@type": "LocalBusiness",
      name: "TFTS — London Process Server",
      addressLocality: "London",
      addressRegion: "Greater London",
      addressCountry: "GB",
      areaServed: "Greater London",
    },
  },
  manchester: {
    slug: "manchester",
    cityName: "Manchester",
    regionName: "Greater Manchester & North West",
    metaTitle: "Process Server Manchester | TFTS",
    metaDescription:
      "Professional process serving in Manchester and Greater Manchester. Court documents, statutory demands, bankruptcy and winding-up petitions. Instructed by solicitors and insolvency practitioners. Business and Property Courts Manchester.",
    headline: "Manchester Process Server",
    subheadline: "Professional process serving across Greater Manchester and the North West",
    coverageAreas: [
      "Manchester City Centre", "Salford", "Trafford", "Stockport",
      "Bolton", "Bury", "Rochdale", "Oldham", "Tameside",
      "Wigan", "Warrington", "Chester", "Macclesfield", "Altrincham",
      "Didsbury", "Chorlton", "Hulme", "Longsight", "Ardwick",
    ],
    intro: `Manchester is home to the Business and Property Courts (BPC) Manchester — one of the major regional commercial court centres outside London. We serve solicitors, insolvency practitioners and corporate legal teams operating from the North West, with a particular understanding of the Manchester legal market and its geography.`,
    context: `The North West has significant concentrations of insolvency practice, commercial litigation and debt recovery. Our Manchester capability covers both the urban core and the wider Greater Manchester conurbation, with reach into Lancashire, Cheshire and the broader North West.`,
    capabilities: [
      { title: "BPC Manchester Proceedings", body: "We are experienced in serving documents tied to the Business and Property Courts Manchester, including insolvency proceedings issued from Manchester." },
      { title: "North West Coverage", body: "Our service extends beyond Greater Manchester into Lancashire, Cheshire, and across the North West. We advise on timescales for outlying locations." },
      { title: "Insolvency Practice", body: "Manchester has a significant concentration of licensed insolvency practitioners. We understand the specific documentation requirements for insolvency proceedings in this jurisdiction." },
      { title: "Same-Day Capability", body: "Urgent instructions in central Manchester and Greater Manchester can be executed same-day." },
    ],
    schema: {
      "@type": "LocalBusiness",
      name: "TFTS — Manchester Process Server",
      addressLocality: "Manchester",
      addressRegion: "Greater Manchester",
      addressCountry: "GB",
      areaServed: "Greater Manchester",
    },
  },
  birmingham: {
    slug: "birmingham",
    cityName: "Birmingham",
    regionName: "West Midlands",
    metaTitle: "Process Server Birmingham | TFTS",
    metaDescription:
      "Professional process serving in Birmingham and the West Midlands. Court documents, statutory demands, bankruptcy and winding-up petitions. Business and Property Courts Birmingham.",
    headline: "Birmingham Process Server",
    subheadline: "Professional process serving across Birmingham and the West Midlands",
    coverageAreas: [
      "Birmingham City Centre", "Edgbaston", "Solihull", "Wolverhampton",
      "Coventry", "Dudley", "Walsall", "West Bromwich", "Sandwell",
      "Bromsgrove", "Redditch", "Tamworth", "Cannock", "Lichfield",
      "Sutton Coldfield", "Erdington", "Jewellery Quarter", "Digbeth",
    ],
    intro: `Birmingham and the West Midlands form the second largest legal and commercial centre in England. The Business and Property Courts Birmingham handles substantial commercial litigation, insolvency proceedings and corporate disputes. We provide professional process serving across the West Midlands, with a clear understanding of the local court landscape.`,
    context: `The Midlands has significant insolvency, manufacturing, property and commercial litigation activity. We serve law firms, insolvency practitioners and corporate clients across the region, from Birmingham's city centre solicitors to Coventry, Wolverhampton and the broader West Midlands conurbation.`,
    capabilities: [
      { title: "BPC Birmingham", body: "We serve documents for proceedings issued from the Birmingham Business and Property Courts, the Chancery list and insolvency proceedings." },
      { title: "West Midlands Network", body: "Coverage across the full West Midlands region including Coventry, Wolverhampton, Dudley, Walsall and Sandwell." },
      { title: "Industrial and Commercial Addresses", body: "The Midlands has significant industrial and commercial estates. We are experienced in serving both conventional and non-standard commercial addresses." },
      { title: "Same-Day Availability", body: "Urgent instructions in Birmingham and the West Midlands conurbation can be executed same-day." },
    ],
    schema: {
      "@type": "LocalBusiness",
      name: "TFTS — Birmingham Process Server",
      addressLocality: "Birmingham",
      addressRegion: "West Midlands",
      addressCountry: "GB",
      areaServed: "West Midlands",
    },
  },
  leeds: {
    slug: "leeds",
    cityName: "Leeds",
    regionName: "West Yorkshire",
    metaTitle: "Process Server Leeds | TFTS",
    metaDescription:
      "Professional process serving in Leeds and West Yorkshire. Court documents, statutory demands, bankruptcy and winding-up petitions. Business and Property Courts Leeds. Instructed by solicitors and insolvency practitioners.",
    headline: "Leeds Process Server",
    subheadline: "Professional process serving across Leeds and West Yorkshire",
    coverageAreas: [
      "Leeds City Centre", "Headingley", "Roundhay", "Harrogate",
      "Bradford", "Wakefield", "Huddersfield", "Halifax", "Calderdale",
      "Kirklees", "York", "Selby", "Wetherby", "Otley", "Pudsey",
      "Morley", "Garforth", "Horsforth",
    ],
    intro: `Leeds is the legal capital of the North East of England, home to one of the largest concentrations of solicitors outside London and the Business and Property Courts (BPC) Leeds. We provide professional process serving for solicitors, insolvency practitioners and corporate clients across Yorkshire and the North East.`,
    context: `Yorkshire has significant financial services, manufacturing, retail and property sectors, generating substantial commercial litigation and insolvency work. Our Leeds capability provides same-day execution in the city and broader West Yorkshire coverage.`,
    capabilities: [
      { title: "BPC Leeds", body: "We serve documents for proceedings issued from the Business and Property Courts Leeds, including insolvency, commercial and property litigation." },
      { title: "Yorkshire Coverage", body: "Our coverage extends from Leeds into Bradford, Wakefield, Huddersfield, Halifax, Harrogate and across West and North Yorkshire." },
      { title: "Legal Market Knowledge", body: "Leeds has one of the largest concentrations of law firms outside London. We understand the local legal market and the specific requirements of Yorkshire practitioners." },
      { title: "Same-Day Service", body: "Urgent instructions in Leeds and West Yorkshire can be executed same-day where time allows." },
    ],
    schema: {
      "@type": "LocalBusiness",
      name: "TFTS — Leeds Process Server",
      addressLocality: "Leeds",
      addressRegion: "West Yorkshire",
      addressCountry: "GB",
      areaServed: "West Yorkshire",
    },
  },
};
