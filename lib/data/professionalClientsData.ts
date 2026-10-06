// ============================================================
// PROFESSIONAL CLIENT PAGES DATA
// TFTS — Tactical Field Intelligence Service
// ============================================================

export interface ProfessionalClientPage {
  slug: string;
  clientType: string;
  headline: string;
  subheadline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  context: string;
  servicesUsed: { title: string; slug: string; body: string }[];
  howWeWork: string;
  whatYouReceive: string[];
  faqs: { q: string; a: string }[];
  cta: string;
}

export const professionalClientsHub = {
  metaTitle: "Professional Client Services | TFTS",
  metaDescription:
    "We work with law firms, insolvency practitioners, accountants, insurers, corporate clients and private capital. Discreet. Precise. Professional.",
  headline: "We Work With Professionals",
  intro:
    "Our clients are professionals with a serious problem and a professional expectation of how it will be handled. We work with solicitors, insolvency practitioners, forensic accountants, insurers, corporate legal teams, family offices and institutional investors. The work is confidential, the methodology is disciplined and the reporting is fit for purpose.",
  sectors: [
    { title: "Solicitors & Law Firms", slug: "solicitors", icon: "⚖" },
    { title: "Insolvency Practitioners", slug: "insolvency-practitioners", icon: "📋" },
    { title: "Forensic Accountants", slug: "forensic-accountants", icon: "🔍" },
    { title: "Insurers", slug: "insurers", icon: "🛡" },
    { title: "Commercial Litigation Teams", slug: "commercial-litigation", icon: "⚖" },
    { title: "Property & Real Estate", slug: "property", icon: "🏛" },
    { title: "Family Offices", slug: "family-offices", icon: "🔒" },
    { title: "Corporate Legal Teams", slug: "corporate-legal", icon: "🏢" },
    { title: "Debt Recovery", slug: "debt-recovery", icon: "📄" },
    { title: "Private Equity & Investors", slug: "private-equity", icon: "📊" },
    { title: "Banks & Lenders", slug: "banks-lenders", icon: "🏦" },
    { title: "Compliance & Risk", slug: "compliance-risk", icon: "✓" },
    { title: "Private Clients", slug: "private-clients", icon: "🔐" },
  ],
};

export const professionalClientPages: Record<string, ProfessionalClientPage> = {
  solicitors: {
    slug: "solicitors",
    clientType: "Solicitors & Law Firms",
    headline: "Working With Solicitors & Law Firms",
    subheadline: "Investigations and process serving in support of litigation, insolvency and client advisory work",
    metaTitle: "Investigations for Solicitors | TFTS",
    metaDescription:
      "Private investigations and process serving for solicitors and law firms. Evidence gathering, tracing, surveillance, due diligence and expert witness support. Discreet. Precise. CPR-compliant.",
    intro:
      "We work with solicitors across litigation, insolvency, commercial disputes, family proceedings and regulatory matters. Our role is to find, verify and document — and to do so in a manner that is immediately useful to the legal process.",
    context:
      "Solicitors instruct us where evidence is needed, where a witness or defendant cannot be located, where an asset needs to be traced, or where process serving requires professional execution. We understand the Civil Procedure Rules, the requirements of disclosure, and the standard to which evidence must be prepared for court. We work within that framework, not around it.",
    servicesUsed: [
      { title: "Process Serving", slug: "/services/process-serving", body: "Court documents, statutory demands, petitions. We serve across England and Wales with full proof of service documentation." },
      { title: "Evidence Gathering", slug: "/services/evidence-gathering", body: "Covert and overt evidence collection conducted in accordance with RIPA and CPR requirements." },
      { title: "Surveillance", slug: "/services/surveillance", body: "Deployed where physical evidence of activity, location or behaviour is required to support proceedings." },
      { title: "Tracing", slug: "/services/tracing", body: "Locating individuals, companies, directors and assets for service, proceedings, and enforcement." },
      { title: "Fraud Investigation", slug: "/services/fraud-financial-investigation", body: "Financial fraud, asset concealment, and misrepresentation — structured investigation and reporting." },
      { title: "Digital Forensics", slug: "/services/digital-forensics", body: "ESI review, deleted data recovery, digital evidence preservation — conducted to evidential standards." },
    ],
    howWeWork:
      "We accept instructions via secure referral. We agree scope, methodology and reporting requirements before commencing any work. We do not take action outside the agreed scope. Reporting is structured to be directly usable in proceedings, whether as a disclosure document, an exhibit bundle or expert evidence. We operate under strict confidentiality and can execute non-disclosure undertakings.",
    whatYouReceive: [
      "Structured reports prepared for legal proceedings",
      "Witness statement preparation where required",
      "Expert evidence capabilities",
      "CPR-compliant evidence documentation",
      "Process serving with proof of service",
      "Ongoing communication at your preferred frequency",
      "Strict confidentiality and professional obligations",
    ],
    faqs: [
      {
        q: "Can your investigators produce witness statements?",
        a: "Yes. Our investigators can prepare witness statements in the appropriate form for use in civil proceedings. Where oral evidence is required, we will advise on the relevant investigator's availability.",
      },
      {
        q: "Do you work on legal aid matters?",
        a: "We primarily work on privately funded instructions. We can discuss the position on specific matters.",
      },
      {
        q: "How do you handle privilege and confidentiality?",
        a: "We understand legal professional privilege. Investigations conducted at the instruction of solicitors for the dominant purpose of litigation attract litigation privilege. We structure our work to protect that position.",
      },
      {
        q: "Can you work to court deadlines?",
        a: "Yes. We accept instructions with tight court deadlines as a matter of routine. Please advise us of any relevant hearing or service deadline at the time of instruction.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "insolvency-practitioners": {
    slug: "insolvency-practitioners",
    clientType: "Insolvency Practitioners",
    headline: "Working With Insolvency Practitioners",
    subheadline: "Process serving, asset tracing, fraud investigation and debtor intelligence for insolvency offices",
    metaTitle: "Investigations for Insolvency Practitioners | TFTS",
    metaDescription:
      "Process serving and investigations for insolvency practitioners. Statutory demands, petitions, asset tracing, director investigations, antecedent transaction analysis. Instructed by IPs across England and Wales.",
    intro:
      "Insolvency appointments frequently require investigation — of the insolvent's conduct, assets, transactions and the conduct of those connected to them. We work alongside insolvency practitioners and their solicitors to establish facts, locate assets and gather evidence in support of officeholder duties.",
    context:
      "We understand the context of insolvency work: the time pressure of petition hearings, the requirements of the Insolvency Rules, the duties of officeholders under the Insolvency Act, and the importance of documentation that can be used in misfeasance proceedings, antecedent transaction claims or criminal referrals.",
    servicesUsed: [
      { title: "Statutory Demand Service", slug: "/services/process-serving/statutory-demand", body: "Section 268 (individual) and Section 123 (company) demands, with full service documentation." },
      { title: "Bankruptcy Petition Service", slug: "/services/process-serving/bankruptcy-petition", body: "Personal service of bankruptcy petitions — the core pre-hearing requirement." },
      { title: "Winding-Up Petition Service", slug: "/services/process-serving/winding-up-petition", body: "Corporate petition service at registered office and principal place of business." },
      { title: "Address Tracing", slug: "/services/process-serving/address-tracing", body: "Locating debtors and directors whose whereabouts have not been disclosed." },
      { title: "Asset Tracing", slug: "/services/asset-tracing-financial-investigation", body: "Identifying undisclosed or concealed assets of the insolvent estate." },
      { title: "Director Conduct Investigations", slug: "/services/corporate-intelligence", body: "Director conduct, connected party transactions, disqualification evidence." },
    ],
    howWeWork:
      "We accept instructions from licensed insolvency practitioners and their solicitors. We understand the officeholder's obligations and structure our investigations accordingly. Reporting is prepared with the Insolvency Service, the courts and potential misfeasance proceedings in mind.",
    whatYouReceive: [
      "Process serving with all documentation required for insolvency proceedings",
      "Asset intelligence reports with source basis",
      "Director conduct investigation reports",
      "Antecedent transaction investigation notes",
      "Evidence prepared for Section 236 examination or court applications",
      "Strict confidentiality within officeholder obligations",
    ],
    faqs: [
      {
        q: "Can you help locate a debtor who has not engaged with insolvency proceedings?",
        a: "Yes. Address tracing and debtor location is a core capability. We can locate individuals who have not responded to statutory demands, who have failed to attend for examination, or whose whereabouts are genuinely unknown.",
      },
      {
        q: "Can you investigate asset concealment?",
        a: "Yes. Where there is reason to believe assets of the insolvent estate have been concealed, transferred to connected parties, or otherwise obscured, we conduct structured intelligence investigations to trace them.",
      },
      {
        q: "Do you work with the IP's solicitors directly?",
        a: "Yes. We work with both the officeholder directly and, where preferred, via the instructing solicitors. We adapt to the structure of the engagement.",
      },
      {
        q: "Can you provide evidence for Section 236 examination applications?",
        a: "We can structure investigation reports to support an application for private examination and, where evidence of third-party involvement exists, for third-party examination applications.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "forensic-accountants": {
    slug: "forensic-accountants",
    clientType: "Forensic Accountants",
    headline: "Working With Forensic Accountants",
    subheadline: "Field intelligence, surveillance and evidence to complement forensic financial analysis",
    metaTitle: "Investigations for Forensic Accountants | TFTS",
    metaDescription:
      "Private investigations to support forensic accounting engagements. Evidence gathering, surveillance, subject intelligence and company investigation. Instructed by forensic accountants in fraud and disputes.",
    intro:
      "Forensic accounting analysis often identifies what happened — but not always the full picture of how or by whom. We provide field-level intelligence, subject investigation and evidence gathering that complements the analytical work of forensic accountants in fraud, disputes and regulatory matters.",
    context:
      "We work with forensic accountants who are engaged on fraud investigations, financial disputes, insurance fraud, professional negligence matters, and regulatory proceedings. Our work adds the evidential dimension that financial analysis cannot always supply: what the individual or company actually does, who they associate with, and whether their account is consistent with observable facts.",
    servicesUsed: [
      { title: "Fraud & Financial Investigation", slug: "/services/fraud-financial-investigation", body: "Structured investigation of financial fraud, misrepresentation and asset concealment." },
      { title: "Corporate Intelligence", slug: "/services/corporate-intelligence", body: "Company structure, beneficial ownership, director conduct and related-party analysis." },
      { title: "Surveillance", slug: "/services/surveillance", body: "Where financial analysis suggests an inconsistency with claimed lifestyle or activity, surveillance provides objective evidence." },
      { title: "Digital Forensics", slug: "/services/digital-forensics", body: "Preservation and analysis of digital evidence to evidential standards." },
      { title: "Background Screening", slug: "/services/pre-employment-background-screening", body: "Verification of credentials, qualifications and employment history of individuals under investigation." },
    ],
    howWeWork:
      "We accept instructions at any stage of a forensic accounting engagement — prior to report completion, during analysis, or following the delivery of findings that require further corroboration. We can work confidentially alongside the forensic team or as a discrete parallel investigation.",
    whatYouReceive: [
      "Field intelligence reports complementing financial analysis",
      "Surveillance evidence where lifestyle inconsistency is identified",
      "Corporate intelligence on implicated entities",
      "Digital evidence preservation where required",
      "Reporting structured for use in litigation or regulatory proceedings",
    ],
    faqs: [
      {
        q: "Can you investigate the personal finances of an individual identified in a forensic report?",
        a: "We can investigate observable lifestyle, assets, associates and conduct by lawful means. We do not access bank accounts or private financial records by unlawful means.",
      },
      {
        q: "Can you work in parallel with a forensic investigation without creating conflict?",
        a: "Yes. We operate with strict information compartmentalisation and can work alongside other professional advisers without disclosure to third parties.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  insurers: {
    slug: "insurers",
    clientType: "Insurers",
    headline: "Working With Insurers",
    subheadline: "Claims intelligence, surveillance, fraud investigation and background investigation for underwriters and claims teams",
    metaTitle: "Insurance Fraud Investigation | TFTS",
    metaDescription:
      "Claims investigation and surveillance for insurers. Personal injury, property, employers liability and professional indemnity fraud. Instructed by claims teams, loss adjusters and legal panels.",
    intro:
      "Fraudulent and exaggerated claims represent a significant commercial cost for insurers. We conduct claims investigation with the discipline required to produce evidence that is admissible, unimpeachable and directly useful to the claims decision, litigation strategy or fraud referral.",
    context:
      "We work for claims teams, loss adjusters, TPA teams and panel solicitors across personal injury, employers' liability, public liability, professional indemnity and commercial property lines. Our investigation methodology is designed to produce evidence that can withstand cross-examination and expert scrutiny.",
    servicesUsed: [
      { title: "Surveillance", slug: "/services/surveillance", body: "Covert observation to establish the claimant's actual capability and lifestyle, relevant to exaggerated personal injury and disability claims." },
      { title: "Background Investigation", slug: "/services/pre-employment-background-screening", body: "Investigation of the claimant's background, prior claims history, and representations." },
      { title: "Social Media & OSINT", slug: "/services/osint-social-media-investigation", body: "Open source investigation of the claimant's publicly available digital footprint." },
      { title: "Fraud Investigation", slug: "/services/fraud-financial-investigation", body: "Structured fraud investigation for suspected staged accidents, organised fraud rings and exaggerated claims." },
    ],
    howWeWork:
      "We accept instructions from claims teams, appointed loss adjusters and legal panel firms. We agree surveillance parameters, legal framework and evidence requirements before deployment. All surveillance is conducted within the Human Rights Act 1998 and the Regulation of Investigatory Powers Act 2000 (as it applies to private investigators).",
    whatYouReceive: [
      "Covert surveillance with contemporaneous log and footage",
      "Photographs and video to evidential standard",
      "Written investigation report",
      "Evidence suitable for use in CPR Part 35 expert proceedings",
      "OSINT and background investigation summaries",
      "Witness statements from investigators where required",
    ],
    faqs: [
      {
        q: "Is covert surveillance legal?",
        a: "Yes. Surveillance conducted in public places, or in any place where the subject has no reasonable expectation of privacy, is lawful. Our surveillance methodology complies with the Regulation of Investigatory Powers Act 2000 and the Human Rights Act 1998.",
      },
      {
        q: "Can your surveillance evidence be used in court?",
        a: "Yes, where properly obtained. We conduct surveillance to evidential standards: contemporaneous logs, continuity of evidence, admissibility considerations, and investigator witness statement preparation.",
      },
      {
        q: "Can you investigate suspected staged or organised fraud?",
        a: "Yes. Where there are indicators of organised fraud — staged accidents, linked claimants, repeat representatives — we conduct structured investigation to establish the network and gather evidence.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "commercial-litigation": {
    slug: "commercial-litigation",
    clientType: "Commercial Litigation Teams",
    headline: "Working With Commercial Litigation Teams",
    subheadline: "Evidence, intelligence and process serving in support of commercial proceedings",
    metaTitle: "Investigations for Commercial Litigation | TFTS",
    metaDescription:
      "Evidence gathering, surveillance, process serving and intelligence for commercial litigation teams. Fraud, asset tracing, director investigations, CPR-compliant evidence.",
    intro:
      "Commercial litigation requires evidence. Whether the matter is breach of contract, fraud, misrepresentation, conspiracy or director liability, the legal framework must be supported by facts. We gather facts — lawfully, precisely and in a form that is immediately useful to proceedings.",
    context:
      "We work with commercial litigation teams in city firms, regional practices and in-house legal departments. Our work ranges from pre-litigation asset intelligence to post-judgment asset tracing, and from process serving to covert surveillance in support of injunction applications.",
    servicesUsed: [
      { title: "Process Serving", slug: "/services/process-serving", body: "Serving all forms of court document, with proof of service for use in proceedings." },
      { title: "Asset Tracing", slug: "/services/asset-tracing-financial-investigation", body: "Pre-litigation asset intelligence and post-judgment enforcement intelligence." },
      { title: "Corporate Intelligence", slug: "/services/corporate-intelligence", body: "Company structure, beneficial ownership, related entities and director conduct." },
      { title: "Surveillance", slug: "/services/surveillance", body: "Evidence of activity, location or conduct to support interim applications or merits assessment." },
      { title: "Digital Forensics", slug: "/services/digital-forensics", body: "ESI, communications records, deleted data — preserved and analysed to evidential standards." },
    ],
    howWeWork:
      "We work to the timeframe of proceedings. Where a hearing is imminent, we adapt. Where there is more time, we apply more thorough methodology. We communicate regularly, flag early indications, and report at the standard expected by CPR Part 31.",
    whatYouReceive: [
      "Evidence structured for CPR Part 31 disclosure",
      "Asset intelligence suitable for freezing order applications",
      "Corporate structure analysis for joinder decisions",
      "Process serving with full service evidence",
      "Expert evidence capability where required",
    ],
    faqs: [
      {
        q: "Can you assist with pre-action asset intelligence to support a freezing order application?",
        a: "Yes. We can conduct rapid pre-action asset intelligence to identify assets that may be at risk of dissipation, supporting a without-notice freezing order application.",
      },
      {
        q: "Can you investigate a defendant's true financial position?",
        a: "Yes. Through company intelligence, property searches, directorship history and observable lifestyle, we can build a picture of a party's actual financial position.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  property: {
    slug: "property",
    clientType: "Property & Real Estate",
    headline: "Working With Property Professionals",
    subheadline: "Due diligence, occupant investigation, process serving and fraud prevention for property transactions",
    metaTitle: "Property Investigation Services | TFTS",
    metaDescription:
      "Property due diligence, tenant investigation, fraud prevention and process serving for property professionals. Instructed by property companies, investors and landlords.",
    intro:
      "Property transactions, development projects and lease enforcement all carry investigation requirements that are distinct from other commercial contexts. We work with property companies, investors, developers, landlords and property solicitors on due diligence, tenant investigation, fraud prevention and enforcement.",
    context:
      "Property fraud costs millions annually. Tenant fraud — misrepresentation of employment, income and identity — creates credit risk on every lease. Development and investment due diligence rarely examines what is actually on site, or who the actual beneficial owners of a counterparty are. We examine these things.",
    servicesUsed: [
      { title: "Due Diligence", slug: "/services/due-diligence-partner-vetting", body: "Background investigation of vendors, buyers, counterparties and beneficial owners." },
      { title: "Corporate Intelligence", slug: "/services/corporate-intelligence", body: "Company structure, beneficial ownership and related party analysis." },
      { title: "Process Serving", slug: "/services/process-serving", body: "Service of notices, court orders and proceedings on commercial and residential occupants." },
      { title: "Fraud Investigation", slug: "/services/fraud-financial-investigation", body: "Mortgage fraud, identity fraud, tenancy fraud and investment fraud." },
    ],
    howWeWork:
      "We accept instructions from property companies directly or through their solicitors. For transaction due diligence, we agree scope before the due diligence period. For enforcement matters, we can move immediately. All investigation is conducted lawfully and with complete confidentiality.",
    whatYouReceive: [
      "Due diligence reports on counterparties and beneficial owners",
      "Occupant investigation findings",
      "Process serving with full documentation for proceedings",
      "Fraud investigation reports for law enforcement referral",
    ],
    faqs: [
      {
        q: "Can you investigate a tenant's representations before lease completion?",
        a: "Yes. Where there is concern about the accuracy of a tenant's representations — employer references, business credentials, identity — we can investigate before commitment.",
      },
      {
        q: "Can you investigate property fraud?",
        a: "Yes. Title fraud, mortgage fraud, subletting fraud and tenancy misrepresentation are all areas we investigate.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "family-offices": {
    slug: "family-offices",
    clientType: "Family Offices",
    headline: "Working With Family Offices",
    subheadline: "Discreet intelligence for high-net-worth families and their advisers",
    metaTitle: "Private Investigations for Family Offices | TFTS",
    metaDescription:
      "Discreet intelligence and investigation services for family offices and high-net-worth families. Due diligence, relationship background, asset intelligence and protection.",
    intro:
      "Family offices engage us for matters that require absolute discretion and a specific quality of intelligence. The work ranges from counterparty due diligence to relationship background investigation, from asset intelligence to private protection matters. We serve family offices directly and through their principal advisers.",
    context:
      "High-net-worth families face risks that are qualitatively different from corporate clients. Relationship fraud, investment fraud, reputational exposure and security risks are not hypothetical — they occur with regularity at this level. The correct response requires intelligence capability, not bureaucratic processes.",
    servicesUsed: [
      { title: "Due Diligence", slug: "/services/due-diligence-partner-vetting", body: "Comprehensive background investigation of investment counterparties, business partners and individuals entering family relationships." },
      { title: "Relationship Background Investigation", slug: "/services/relationship-infidelity-investigation", body: "Discreet background investigation of personal relationships at the request of family members or their advisers." },
      { title: "Asset Intelligence", slug: "/services/asset-tracing-financial-investigation", body: "Intelligence on the assets and financial position of counterparties, former spouses and partners." },
      { title: "OSINT & Reputation", slug: "/services/osint-social-media-investigation", body: "Online profile, reputation risk and social media intelligence." },
    ],
    howWeWork:
      "Family office matters are handled with the highest level of confidentiality. Instructions may be accepted through the family's principal advisers — solicitors, accountants, trustees — or directly. We do not disclose client identity or the existence of any instruction to any third party.",
    whatYouReceive: [
      "The highest standard of confidentiality",
      "Intelligence reports structured for the purpose of the instruction",
      "Absolute discretion in approach and methodology",
      "No disclosure of client identity to third parties",
      "Private client relationship management",
    ],
    faqs: [
      {
        q: "Can instructions be received through our solicitors?",
        a: "Yes. We routinely accept instructions via the family's solicitors, trustees or other advisers. The family's identity is not required to be disclosed to us unless operationally necessary.",
      },
      {
        q: "How do you protect confidentiality?",
        a: "All matters are handled on a need-to-know basis within our team. Files are maintained securely with access controls. No client information is disclosed to third parties. We can execute specific confidentiality undertakings on request.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL ENQUIRY",
  },

  "corporate-legal": {
    slug: "corporate-legal",
    clientType: "Corporate Legal Teams",
    headline: "Working With In-House Legal Teams",
    subheadline: "Intelligence, investigation and process serving for corporate legal and compliance functions",
    metaTitle: "Investigations for Corporate Legal Teams | TFTS",
    metaDescription:
      "Corporate investigation services for in-house legal and compliance teams. Due diligence, employee investigation, fraud response, counterparty intelligence and process serving.",
    intro:
      "In-house legal and compliance teams instruct us where external investigation capability is required — employee misconduct, counterparty due diligence, fraud response, supply chain intelligence or process serving. We provide a professional interface that operates alongside the company's own resources.",
    context:
      "Corporate legal teams often face situations where internal resource is insufficient, where external objectivity is required, or where the matter requires a form of investigation that cannot be conducted internally without risk of compromise or inadmissibility.",
    servicesUsed: [
      { title: "Employee Investigation", slug: "/services/employee-fraud-misconduct-investigation", body: "Misconduct, fraud, intellectual property theft, competition breaches." },
      { title: "Due Diligence", slug: "/services/due-diligence-partner-vetting", body: "Counterparty, vendor, acquisition target and senior hire background investigation." },
      { title: "Corporate Intelligence", slug: "/services/corporate-intelligence", body: "Competitor intelligence, market intelligence and counterparty structure analysis." },
      { title: "Fraud Response", slug: "/services/fraud-financial-investigation", body: "Rapid response to suspected internal fraud or external fraud targeting the company." },
      { title: "Process Serving", slug: "/services/process-serving", body: "Service of legal documents on counterparties, former employees and third parties." },
    ],
    howWeWork:
      "We work alongside general counsel, legal directors and compliance officers. We understand the corporate governance framework within which in-house teams operate and structure our work accordingly. Reporting is designed to be directly useful to internal governance, regulatory reporting or external legal proceedings.",
    whatYouReceive: [
      "Confidential investigation reports",
      "Evidence structured for employment tribunal or court proceedings",
      "Due diligence reports to corporate standard",
      "Process serving with full documentation",
      "Rapid response capability for fraud incidents",
    ],
    faqs: [
      {
        q: "Can you investigate a senior employee confidentially?",
        a: "Yes. We are experienced in conducting investigations into senior and executive employees without disclosure to the subject or to other employees. Confidentiality is maintained throughout.",
      },
      {
        q: "Can you assist with a dawn raid or document preservation scenario?",
        a: "We can advise on document preservation from an investigation perspective and assist with securing evidence during an urgent fraud response.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "debt-recovery": {
    slug: "debt-recovery",
    clientType: "Debt Recovery",
    headline: "Working With Debt Recovery Teams",
    subheadline: "Process serving, tracing and asset intelligence for commercial and consumer debt recovery",
    metaTitle: "Debt Recovery Investigation Support | TFTS",
    metaDescription:
      "Process serving and tracing for debt recovery solicitors and credit teams. Statutory demands, court document service, address tracing, asset intelligence.",
    intro:
      "Debt recovery is only as effective as the information and service capability behind it. We provide process serving, address tracing, debtor intelligence and asset investigation for debt recovery solicitors, credit management teams and enforcement professionals.",
    context:
      "The debt recovery process requires correct documentation and correct service. An incorrectly served statutory demand is worth nothing. An unlocated debtor brings the process to a halt. We address both.",
    servicesUsed: [
      { title: "Process Serving", slug: "/services/process-serving", body: "Statutory demands, court proceedings and enforcement documents." },
      { title: "Address Tracing", slug: "/services/process-serving/address-tracing", body: "Locating debtors who have moved without disclosure." },
      { title: "Asset Intelligence", slug: "/services/asset-tracing-financial-investigation", body: "Establishing the debtor's actual financial position and available assets." },
    ],
    howWeWork:
      "We accept bulk and individual instructions from debt recovery solicitors and credit teams. We maintain volume pricing structures for frequent instructors and can integrate with case management systems on request.",
    whatYouReceive: [
      "Process serving with complete service documentation",
      "Address traces with confidence grading",
      "Asset intelligence reports",
      "Multiple-attempt service records",
      "Evidence for substituted service applications",
    ],
    faqs: [
      {
        q: "Can you handle high volumes of process serving instructions?",
        a: "Yes. We have the operational capacity to handle volume instructions. We discuss volume pricing with regular instructors.",
      },
      {
        q: "Can you trace debtors who have deliberately moved to avoid service?",
        a: "Yes. Where a debtor has moved without notifying creditors, we conduct address tracing through lawful means to establish their current address.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "private-equity": {
    slug: "private-equity",
    clientType: "Private Equity & Investors",
    headline: "Working With Private Equity & Investors",
    subheadline: "Due diligence, management background investigation and portfolio intelligence",
    metaTitle: "Due Diligence for Private Equity | TFTS",
    metaDescription:
      "Investigative due diligence for private equity investors and institutional investors. Management background, counterparty integrity, acquisition target investigation.",
    intro:
      "Investment decisions carry information risk. We provide the investigative due diligence layer that commercial due diligence typically does not: the character and conduct of management, the integrity of counterparties, and the intelligence that determines whether what has been represented is true.",
    context:
      "We work with private equity houses, venture capital firms, family offices acting as investors, and institutional investors. Our due diligence work examines management teams, acquisition targets, joint venture partners and co-investors at a depth that desk research does not reach.",
    servicesUsed: [
      { title: "Investigative Due Diligence", slug: "/services/due-diligence-partner-vetting", body: "Management background, integrity assessment, hidden liabilities and adverse history." },
      { title: "Corporate Intelligence", slug: "/services/corporate-intelligence", body: "Corporate structure, beneficial ownership and related entity mapping." },
      { title: "Asset Tracing", slug: "/services/asset-tracing-financial-investigation", body: "Asset verification and financial position intelligence." },
    ],
    howWeWork:
      "We accept instructions on a deal-specific basis or on a retained basis for investors who wish to have investigation capability on standby. We work to deal timelines and can deliver within demanding time-frames where the investment team requires it.",
    whatYouReceive: [
      "Comprehensive investigative due diligence reports",
      "Management integrity assessments",
      "Corporate structure mapping",
      "Adverse media and legal history compilation",
      "Red flag identification and recommendation",
    ],
    faqs: [
      {
        q: "How does investigative due diligence differ from commercial due diligence?",
        a: "Commercial due diligence examines the business. Investigative due diligence examines the people and the truthfulness of the information presented. These are complementary but distinct.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "banks-lenders": {
    slug: "banks-lenders",
    clientType: "Banks & Lenders",
    headline: "Working With Banks & Lenders",
    subheadline: "Fraud investigation, KYC enhancement, asset intelligence and process serving for financial institutions",
    metaTitle: "Investigations for Banks & Lenders | TFTS",
    metaDescription:
      "Fraud investigation and due diligence for banks, lenders and financial institutions. KYC enhancement, application fraud, asset intelligence and enforcement support.",
    intro:
      "Financial institutions face fraud, misrepresentation and default as operational realities. We provide the investigative capability to assess applications, investigate suspected fraud, trace assets and support enforcement — working alongside in-house compliance, fraud and legal teams.",
    context:
      "We work with banks, challenger banks, asset finance providers, mortgage lenders and commercial credit providers. The work ranges from enhanced KYC investigation to post-default asset tracing.",
    servicesUsed: [
      { title: "Enhanced Due Diligence", slug: "/services/due-diligence-partner-vetting", body: "Enhanced KYC and background investigation beyond standard verification." },
      { title: "Application Fraud Investigation", slug: "/services/fraud-financial-investigation", body: "Investigating suspected misrepresentation in credit and mortgage applications." },
      { title: "Asset Tracing", slug: "/services/asset-tracing-financial-investigation", body: "Locating assets in support of default recovery and enforcement." },
      { title: "Process Serving", slug: "/services/process-serving", body: "Service of demand letters, court documents and enforcement notices." },
    ],
    howWeWork:
      "We accept instructions from fraud teams, legal teams and compliance functions. We operate under strict confidentiality and are experienced in working within the regulatory framework applicable to financial institutions.",
    whatYouReceive: [
      "Enhanced due diligence reports",
      "Application fraud investigation reports",
      "Asset intelligence for enforcement planning",
      "Process serving with full documentation",
    ],
    faqs: [
      {
        q: "Can you assist with PEP and adverse media investigations beyond standard database checks?",
        a: "Yes. We conduct enhanced background investigation of individuals and entities where standard database screening is insufficient, including source-of-wealth investigation.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "compliance-risk": {
    slug: "compliance-risk",
    clientType: "Compliance & Risk",
    headline: "Working With Compliance & Risk Functions",
    subheadline: "Intelligence and investigation to support compliance, risk management and regulatory requirements",
    metaTitle: "Compliance Investigations | TFTS",
    metaDescription:
      "Intelligence and investigation for compliance and risk functions. Enhanced due diligence, employee misconduct, regulatory investigation support, third-party risk.",
    intro:
      "Compliance and risk functions increasingly require investigative intelligence to meet regulatory standards and manage third-party risk. We provide the field intelligence that database screening cannot supply — applied to individuals, counterparties, suppliers and employees.",
    context:
      "Regulatory requirements under anti-money laundering, sanctions, bribery and data protection frameworks all have investigative dimensions. We assist compliance teams in identifying risk that structured screening does not surface.",
    servicesUsed: [
      { title: "Enhanced Due Diligence", slug: "/services/due-diligence-partner-vetting", body: "Enhanced KYC, UBO identification, source of wealth and adverse history." },
      { title: "Employee Investigation", slug: "/services/employee-fraud-misconduct-investigation", body: "Misconduct, fraud, compliance breaches and conflicts of interest." },
      { title: "Regulatory Investigation Support", slug: "/services/corporate-intelligence", body: "Intelligence to support internal investigations triggered by regulatory enquiries." },
    ],
    howWeWork:
      "We accept instructions from compliance directors, MLROs, risk officers and general counsel. We understand the regulatory framework and structure our reporting to be useful in compliance documentation and regulatory correspondence.",
    whatYouReceive: [
      "Enhanced due diligence reports structured for compliance purposes",
      "Employee investigation reports for disciplinary proceedings",
      "Third-party risk intelligence",
      "Reports structured for regulatory documentation",
    ],
    faqs: [
      {
        q: "Can you assist with source of wealth investigations?",
        a: "Yes. Where enhanced due diligence requires an assessment of an individual's claimed source of wealth, we conduct intelligence investigation to verify or challenge the account presented.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL INSTRUCTION",
  },

  "private-clients": {
    slug: "private-clients",
    clientType: "Private Clients",
    headline: "Private Client Investigations",
    subheadline: "Discreet investigations for personal and family matters",
    metaTitle: "Private Investigations | TFTS",
    metaDescription:
      "Discreet private investigations for individuals and families. Relationship matters, background investigations, tracing, fraud and personal protection.",
    intro:
      "Private clients come to us when something is wrong and they need certainty. The situation may be personal — a relationship matter, a concern about a family member, a background investigation on someone entering their life. It may be financial — fraud, misrepresentation, a dispute over assets. Whatever the matter, we handle it with complete discretion and no judgement.",
    context:
      "We work directly with private clients who have the means and the need for professional investigation. Matters are handled personally, with direct access to the individuals responsible for the work. Confidentiality is absolute.",
    servicesUsed: [
      { title: "Relationship Investigation", slug: "/services/relationship-infidelity-investigation", body: "Discreet investigation of relationship concerns." },
      { title: "Background Investigation", slug: "/services/pre-employment-background-screening", body: "Background investigation of individuals entering your life or business." },
      { title: "Tracing", slug: "/services/tracing", body: "Locating individuals whose whereabouts are unknown." },
      { title: "Due Diligence", slug: "/services/due-diligence-partner-vetting", body: "Investment and business partner background investigation." },
      { title: "Asset Intelligence", slug: "/services/asset-tracing-financial-investigation", body: "Establishing the true financial position of a counterparty or former partner." },
    ],
    howWeWork:
      "Private client matters are handled personally, not through a standard intake process. Your enquiry is received and reviewed by a senior member of the team. We advise on whether we can assist and how before any commitment is made.",
    whatYouReceive: [
      "Direct access to the investigators responsible for your matter",
      "Complete confidentiality — your identity is never disclosed",
      "Objective, factual reporting without embellishment",
      "Advice on what the evidence means and what options are available",
      "No judgement. This is our work, not our opinion of yours.",
    ],
    faqs: [
      {
        q: "Can I speak to someone before committing to anything?",
        a: "Yes. We offer a confidential initial consultation at no obligation. Please submit a confidential enquiry and a senior team member will contact you directly.",
      },
      {
        q: "How do I know my enquiry will remain confidential?",
        a: "The existence and content of every enquiry and instruction is confidential. We do not disclose client identity, the existence of an instruction, or any finding to any third party.",
      },
    ],
    cta: "BEGIN A CONFIDENTIAL ENQUIRY",
  },
};
