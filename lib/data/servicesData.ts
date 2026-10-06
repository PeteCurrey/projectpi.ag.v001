export interface ServiceDetail {
  slug: string;
  title: string;
  category: "CORPORATE" | "INTELLIGENCE" | "LEGAL" | "FIELD";
  disciplineNumber: "01" | "02" | "03" | "04";
  heroProposition: string;
  summary: string;
  theQuestion: {
    subtitle: string;
    description: string;
    scenarios: string[];
  };
  whatWeInvestigate: {
    subtitle: string;
    capabilities: {
      name: string;
      detail: string;
    }[];
  };
  ourApproach: {
    subtitle: string;
    stages: {
      step: string;
      title: string;
      description: string;
    }[];
  };
  whatYouReceive: {
    subtitle: string;
    items: string[];
  };
  whoWeWorkWith: {
    subtitle: string;
    clientTypes: {
      title: string;
      description: string;
    }[];
  };
  relatedServices: {
    title: string;
    slug: string;
    discipline: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}

export const servicesData: Record<string, ServiceDetail> = {
  "corporate-investigations": {
    slug: "corporate-investigations",
    title: "Corporate Investigations",
    category: "CORPORATE",
    disciplineNumber: "01",
    heroProposition: "Discreet corporate inquiry into material risk, internal misconduct, commercial integrity and systemic vulnerabilities.",
    summary: "Comprehensive multi-disciplinary investigations tailored to protect corporate assets, reputation, and board-level decision making in high-stakes circumstances.",
    theQuestion: {
      subtitle: "When commercial security is compromised",
      description: "Corporate entities encounter moments when internal reporting mechanisms, audits, or whistleblowing disclosures point to systemic wrongdoing. Proceeding without factual certainty risks regulatory sanction, reputational contagion, and catastrophic litigation exposure.",
      scenarios: [
        "Unexplained financial leakages across procurement chains or divisional balance sheets",
        "Breaches of director fiduciary duties, conflicts of interest, or undeclared side-letter arrangements",
        "Hostile competitor intelligence incursions, intellectual property exfiltration, or trade secret theft",
        "Whistleblower allegations concerning bribery, corruption, or regulatory malpractice",
        "Disputed joint venture governance, hostile takeover defences, and counterparty misrepresentation",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Rigorous corporate scrutiny",
      capabilities: [
        { name: "Executive & Director Conduct", detail: "Investigating breaches of fiduciary duty, undisclosed conflicts, kickbacks, and shadow directorships." },
        { name: "Procurement & Supply Chain Fraud", detail: "Uncovering collusive bidding, ghost vendor networks, inflated invoicing, and corrupt procurement rings." },
        { name: "Asset Misappropriation", detail: "Tracing unauthorized capital diversions, intellectual property theft, and company asset dilution." },
        { name: "Corporate Sabotage & IP Leakage", detail: "Forensic examination of data exfiltration pathways, departed key employees, and competitor espionage." },
      ],
    },
    ourApproach: {
      subtitle: "The investigative methodology",
      stages: [
        { step: "01", title: "Mandate Scoping", description: "Establishing exact parameters, legal boundaries, privilege structures, and discreet containment protocols." },
        { step: "02", title: "Data & Digital Intelligence", description: "Reviewing communications, transactional trails, register filings, and open-source intelligence vectors." },
        { step: "03", title: "Corroborative Field Inquiries", description: "Deploying discreet interviews, physical verification, and lawful observation where digital trails terminate." },
        { step: "04", title: "Admissible Evidentiary Deliverable", description: "Compiling a court-ready, board-level dossier containing verified facts, chronological timelines, and primary exhibits." },
      ],
    },
    whatYouReceive: {
      subtitle: "Evidentiary deliverables",
      items: [
        "Comprehensive Board-Ready Investigation Dossier with executive summary and key findings",
        "Fully cross-referenced primary evidence bundle indexed for Civil Procedure Rules (CPR) compliance",
        "Chronological forensic timeline linking suspect entities, financial flows, and communications",
        "Risk mitigation recommendations and witness statement memoranda for legal counsel",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Who instructs our corporate team",
      clientTypes: [
        { title: "General Counsel & Legal Teams", description: "Providing factual clarity and evidentiary foundations for pre-litigation and regulatory response." },
        { title: "Boards of Directors & Audit Committees", description: "Independent fact-finding for whistleblowing disclosures, executive misconduct, and special audits." },
        { title: "Insolvency Practitioners", description: "Investigating pre-insolvency asset dissipation, antecedent transactions, and director malfeasance." },
      ],
    },
    relatedServices: [
      { title: "Corporate Fraud Investigations", slug: "corporate-fraud-investigations", discipline: "Corporate" },
      { title: "Employee Investigations", slug: "employee-investigations", discipline: "Corporate" },
      { title: "Due Diligence", slug: "due-diligence", discipline: "Corporate" },
      { title: "Digital Investigations", slug: "digital-investigations", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "How is confidentiality maintained during an active corporate investigation?", answer: "Our inquiries operate under strict need-to-know protocols. Work product can be structured under legal professional privilege when instructed by legal counsel, with encrypted communication channels and compartmentalized operatives." },
      { question: "Are your findings admissible in UK civil or criminal proceedings?", answer: "Yes. All intelligence is gathered strictly in accordance with UK statutory standards including the Data Protection Act 2018, CPR Part 31, and applicable evidence rules, ensuring complete evidentiary integrity." },
      { question: "Can investigations proceed without alerting internal staff or executive suspects?", answer: "Discretion is our foundational tenet. We operate external digital intelligence, off-site analysis, and non-intrusive inquiries that preserve complete containment until formal confrontational stages are authorized." },
    ],
    metaTitle: "Corporate Investigations London & UK | TFTS",
    metaDescription: "Discreet corporate investigations into internal fraud, executive misconduct, IP leakage, and counterparty risks. Serving general counsel, boards, and institutional clients.",
  },

  "corporate-fraud-investigations": {
    slug: "corporate-fraud-investigations",
    title: "Corporate Fraud Investigations",
    category: "CORPORATE",
    disciplineNumber: "01",
    heroProposition: "Forensic and intelligence-led investigations into complex financial fraud, procurement corruption, and asset diversion.",
    summary: "Pinpointing the mechanics, beneficiaries, and asset destinations of sophisticated corporate fraud schemes with court-ready evidentiary precision.",
    theQuestion: {
      subtitle: "Uncovering deliberate financial deception",
      description: "Fraud within a corporate structure rarely leaves a direct paper confession. Perpetrators mask diversions behind legitimate vendor structures, falsified invoices, layered overseas shell companies, and compromised internal controls.",
      scenarios: [
        "Procurement directors creating shell supplier entities to redirect corporate funds",
        "Collusive invoice manipulation and inflated project billing running across multiple financial quarters",
        "Unauthorized diversion of high-value company assets or intellectual property to competing ventures",
        "Falsification of revenue, inventory reports, or work-in-progress declarations to secure executive bonuses",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Forensic scope and targets",
      capabilities: [
        { name: "Vendor & Invoice Collusion", detail: "Exposing circular invoicing, ghost suppliers, inflated billing, and kickback arrangements." },
        { name: "Beneficial Ownership Deconstruction", detail: "Unmasking corporate veils, nominee directors, and offshore shell entities receiving misappropriated funds." },
        { name: "Financial Flow & Asset Tracking", detail: "Tracing the path of diverted capital from company accounts into real property, luxury assets, and covert entities." },
        { name: "Digital Communication Attribution", detail: "Identifying covert communication channels, unauthorized access patterns, and intentional record deletions." },
      ],
    },
    ourApproach: {
      subtitle: "Multi-layered fraud deconstruction",
      stages: [
        { step: "01", title: "Forensic Data Triangulation", description: "Mapping vendor accounts, banking records, corporate filings, and communication metadata." },
        { step: "02", title: "Target & Network Profiling", description: "Establishing undisclosed familial, commercial, or residential ties between internal suspects and external vendors." },
        { step: "03", title: "Field Verification", description: "Physical verification of purported trading premises, inventory locations, and operational footprints." },
        { step: "04", title: "Restitution Evidentiary File", description: "Delivering an unassailable evidentiary brief ready for freezing injunctions (Mareva) and asset recovery litigation." },
      ],
    },
    whatYouReceive: {
      subtitle: "Fraud investigation deliverables",
      items: [
        "Forensic Investigation Report identifying exact financial loss mechanisms and culpable parties",
        "Beneficial ownership mapping charts proving common control between suspects and recipient entities",
        "Asset tracing intelligence schedule ready for proprietary injunctions and worldwide freezing orders",
        "Affidavit-ready witness statements and chain of custody documentation",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing parties",
      clientTypes: [
        { title: "Specialist Fraud Litigators", description: "Supplying urgent evidentiary proof for freezing orders, disclosure orders, and recovery claims." },
        { title: "Corporate Risk Committees & CFOs", description: "Quantifying loss, identifying internal weaknesses, and terminating fraudulent relationships." },
        { title: "Forensic Accountants & Auditors", description: "Providing real-world intelligence to bridge gaps where accounting records have been falsified." },
      ],
    },
    relatedServices: [
      { title: "Corporate Investigations", slug: "corporate-investigations", discipline: "Corporate" },
      { title: "Asset Tracing", slug: "asset-tracing", discipline: "Intelligence" },
      { title: "Employee Investigations", slug: "employee-investigations", discipline: "Corporate" },
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
    ],
    faqs: [
      { question: "What is the speed of deployment when active fraud is suspected?", answer: "We deploy immediate digital intelligence and asset preservation monitoring within hours to halt ongoing financial dissipation before overseas transfers become irreversible." },
      { question: "Can evidence support applications for Freezing Orders (Injunctions)?", answer: "Yes. Our investigative reports are structured precisely to satisfy the legal tests required by High Court judges, including demonstrating a real risk of dissipation." },
      { question: "How do you uncover ties between an employee and a supplier?", answer: "Through OSINT, corporate registry cross-referencing, shared addresses, telephone records, familial connections, and discreet field inquiries." },
    ],
    metaTitle: "Corporate Fraud Investigations UK | Financial & Asset Recovery Intelligence",
    metaDescription: "Expert corporate fraud investigations across London and the UK. Investigating procurement corruption, internal theft, supplier collusion, and financial misfeasance.",
  },

  "employee-investigations": {
    slug: "employee-investigations",
    title: "Employee Investigations",
    category: "CORPORATE",
    disciplineNumber: "01",
    heroProposition: "Lawful, proportionate investigations into serious workplace misconduct, restrictive covenant breaches, and senior executive disloyalty.",
    summary: "Delivering irrefutable, objective evidence for high-value employment disputes, gross misconduct hearings, and post-termination restrictive covenant enforcement.",
    theQuestion: {
      subtitle: "When trust dissolves within executive ranks",
      description: "Managing severe workplace wrongdoing requires absolute procedural neutrality and lawful proportionality. Ill-advised surveillance or unlawful data gathering can render evidence inadmissible in an Employment Tribunal and trigger catastrophic employment litigation.",
      scenarios: [
        "Senior directors soliciting key clients and staff in direct breach of post-termination non-compete covenants",
        "Key personnel establishing shadow competing businesses during company time using corporate resources",
        "Systemic internal theft, corporate sabotage, or falsification of regulatory compliance records",
        "Fraudulent long-term sickness claims where the individual is operating alternative commercial ventures",
        "Serious workplace harassment or discrimination allegations requiring independent factual establishment",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Scope of inquiry",
      capabilities: [
        { name: "Restrictive Covenant Violations", detail: "Evidencing active commercial trading, client solicitations, and competitor engagement." },
        { name: "Secondary Commercial Interests", detail: "Uncovering undeclared directorships, equity stakes, and consulting arrangements." },
        { name: "Gross Misconduct & Fraudulent Absence", detail: "Proportionate lawful verification of physical capabilities and undeclared activities during certified leave." },
        { name: "Intellectual Property Exfiltration", detail: "Tracking data exfiltration immediately prior to employee resignation or dismissal." },
      ],
    },
    ourApproach: {
      subtitle: "Proportionate & legally robust process",
      stages: [
        { step: "01", title: "Proportionality & Lawfulness Assessment", description: "Benchmarking the inquiry against GDPR Article 6 legitimate interest assessments and human rights standards." },
        { step: "02", title: "Digital & Commercial Footprint Analysis", description: "Examining corporate filings, digital advertising, domain records, and commercial registers." },
        { step: "03", title: "Discreet Real-World Observation", description: "Deploying lawful, proportionate static and mobile observation where physical verification is required." },
        { step: "04", title: "Tribunal-Grade Evidentiary Report", description: "Providing chronological event logs, photographic stills, and signed investigator statements." },
      ],
    },
    whatYouReceive: {
      subtitle: "Deliverables for HR & Legal Counsel",
      items: [
        "Evidentiary Report complying with the ACAS Code of Practice and Civil Evidence Act",
        "Time-stamped photographic and video evidence logs verifying commercial activities",
        "Detailed timeline of client contact, meeting locations, and competitor operations",
        "Investigator court witness availability for High Court or Employment Tribunal testimony",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Client profiles",
      clientTypes: [
        { title: "Employment Solicitors", description: "Providing admissible factual foundations for injunctions, damages claims, and tribunal defences." },
        { title: "Chief People Officers & HR Directors", description: "Discreet independent investigations for high-profile executive terminations." },
        { title: "Managing Partners & Founders", description: "Protecting goodwill, client lists, and confidential know-how from departing team members." },
      ],
    },
    relatedServices: [
      { title: "Corporate Investigations", slug: "corporate-investigations", discipline: "Corporate" },
      { title: "Covert Surveillance", slug: "covert-surveillance", discipline: "Field" },
      { title: "Digital Investigations", slug: "digital-investigations", discipline: "Intelligence" },
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
    ],
    faqs: [
      { question: "Is surveillance of an employee lawful under UK GDPR?", answer: "Yes, when conducted pursuant to a documented Legitimate Interests Assessment (LIA), strictly proportionate to the potential commercial harm, and adhering to privacy boundaries." },
      { question: "Can the report be used in Employment Tribunal hearings?", answer: "Yes. Our reports are authored to the highest evidentiary standard and our operatives are experienced in providing witness testimony." },
      { question: "How do you evidence non-solicitation breaches?", answer: "By establishing physical meetings with protected clients, competitor employment contracts, joint commercial tenders, and verifiable commercial interactions." },
    ],
    metaTitle: "Employee Investigations & Restrictive Covenants UK | TFTS",
    metaDescription: "Lawful, discreet employee investigations for UK businesses. Enforcing restrictive covenants, evidencing gross misconduct, and protecting corporate assets.",
  },

  "due-diligence": {
    slug: "due-diligence",
    title: "Corporate Due Diligence",
    category: "CORPORATE",
    disciplineNumber: "01",
    heroProposition: "Deep-source human intelligence, integrity assessments, and reputational analysis beyond conventional compliance checklists.",
    summary: "Providing investors, corporate acquirers, and family offices with the real story behind targets, counterparties, founders, and joint venture partners.",
    theQuestion: {
      subtitle: "What standard database checks miss",
      description: "Automated compliance databases and check-box KYC software provide a false sense of security. They regurgitate public filings without context and fail to uncover hidden political entanglements, off-balance-sheet liabilities, undisclosed litigation, or predatory commercial practices.",
      scenarios: [
        "Multi-million pound private equity or M&A transactions requiring founder integrity verification",
        "Cross-border joint ventures where local counterparties present opaque corporate structures",
        "Onboarding high-net-worth strategic investors or sovereign capital partners",
        "Assessing counterparty solvency, source of wealth, and potential sanctions contamination",
        "Uncovering undisclosed litigation history, regulatory censures, and toxic commercial disputes",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Comprehensive investigative dimensions",
      capabilities: [
        { name: "Source of Wealth & Financial Integrity", detail: "Tracing historical wealth generation pathways, offshore trusts, and bankruptcy track records." },
        { name: "Reputational & Regulatory History", detail: "Uncovering buried regulatory sanctions, criminal proceedings, and suppressed disputes across global jurisdictions." },
        { name: "Hidden Corporate Networks & Affiliations", detail: "Mapping complex beneficial ownership chains, nominee directors, and sanctioned entities." },
        { name: "Discreet Human Source Intelligence", detail: "Gathering peer commentary, former partner insights, and operational intelligence from trusted market networks." },
      ],
    },
    ourApproach: {
      subtitle: "Intelligence synthesis",
      stages: [
        { step: "01", title: "Global Record & Asset Screening", description: "Interrogating international corporate registries, court records, media archives, and sanctions databases." },
        { step: "02", title: "Offshore Entity Deconstruction", description: "Unravelling BVI, Cayman, Channel Islands, and European trust architectures." },
        { step: "03", title: "Targeted Source Inquiries", description: "Discreetly canvassing industry contacts, suppliers, and former associates without alerting the target." },
        { step: "04", title: "Executive Decision Briefing", description: "Delivering a comprehensive risk matrix with qualitative red flags and strategic deal counsel." },
      ],
    },
    whatYouReceive: {
      subtitle: "Intelligence deliverable",
      items: [
        "Executive Due Diligence Dossier detailing background, wealth origin, and commercial integrity",
        "Corporate genealogy charts illustrating ultimate beneficial ownership and associated entities",
        "Red-flag risk matrix categorised by legal, financial, political, and reputational exposure",
        "Verification of declared operational scale, physical assets, and key customer contracts",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Strategic clients",
      clientTypes: [
        { title: "Private Equity & Venture Capital", description: "De-risking capital deployment into founders and target companies." },
        { title: "Family Offices & HNWIs", description: "Vetting co-investors, asset managers, and high-value joint venture counterparts." },
        { title: "Corporate M&A Teams", description: "Conducting pre-transaction investigative due diligence on acquisition targets." },
      ],
    },
    relatedServices: [
      { title: "Corporate Intelligence", slug: "intelligence", discipline: "Intelligence" },
      { title: "OSINT Investigations", slug: "osint-investigations", discipline: "Intelligence" },
      { title: "Background Investigations", slug: "background-investigations", discipline: "Intelligence" },
      { title: "Asset Tracing", slug: "asset-tracing", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "How does your intelligence differ from a standard compliance check?", answer: "Standard databases only show publicly filed data and automated sanction hits. We conduct deep investigative analysis, unravelling offshore networks and conducting discreet human inquiries to uncover what is actively hidden." },
      { question: "Can due diligence be conducted without the target entity becoming aware?", answer: "Yes. All our methods are strictly passive and non-intrusive, leaving zero operational footprint on the target." },
      { question: "What jurisdictions do you cover?", answer: "While headquartered in London, we operate across the UK, Europe, the Middle East, offshore financial centres, and international jurisdictions through verified investigative networks." },
    ],
    metaTitle: "Corporate Due Diligence & Integrity Investigations UK | London Firm",
    metaDescription: "In-depth corporate due diligence, beneficial ownership tracing, and founder integrity assessments for M&A, private equity, and family offices.",
  },

  "intelligence": {
    slug: "intelligence",
    title: "Corporate & Private Intelligence",
    category: "INTELLIGENCE",
    disciplineNumber: "02",
    heroProposition: "Strategic intelligence for decisive corporate actions, commercial negotiations, and high-value disputes.",
    summary: "Bridging the critical knowledge gap where conventional research ends, empowering leaders with actionable, verified corporate intelligence.",
    theQuestion: {
      subtitle: "Operating with informational supremacy",
      description: "In major commercial disputes, hostile corporate engagements, or multi-jurisdictional acquisitions, the party with complete clarity prevails. Navigating high-stakes situations on public statements and assumptions leads to catastrophic strategic miscalculations.",
      scenarios: [
        "Uncovering competitor intentions, stealth strategic moves, and confidential expansion plans",
        "Mapping pressure points, allegiances, and vulnerabilities of hostile counterparties in high-value negotiations",
        "Assessing sovereign, political, or regulatory risks facing capital investments in complex jurisdictions",
        "Protecting high-profile families and corporate entities from reputational smear campaigns and hostile actors",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Strategic intelligence capabilities",
      capabilities: [
        { name: "Counterparty Vulnerability Mapping", detail: "Analyzing financial pressures, pending liabilities, key lender relationships, and litigation risk." },
        { name: "Competitor Market Intelligence", detail: "Ethical gathering of strategic roadmap intelligence, key departures, and customer relationship stability." },
        { name: "Reputation Attack Tracing", detail: "Identifying malicious disinformation actors, PR smear campaigns, and coordinated hostile attacks." },
        { name: "Regulatory & Political Exposure", detail: "Evaluating policy shifts, enforcement priorities, and political dependencies affecting operations." },
      ],
    },
    ourApproach: {
      subtitle: "The intelligence cycle",
      stages: [
        { step: "01", title: "Intelligence Requirement Formulation", description: "Defining the critical information requirements (CIRs) needed to answer key strategic questions." },
        { step: "02", title: "Multi-Source Collection", description: "Harvesting open-source intelligence, deep-web telemetry, registry records, and targeted human insights." },
        { step: "03", title: "Synthesis & Critical Analysis", description: "Cross-verifying raw intelligence, eliminating noise, and evaluating source reliability." },
        { step: "04", title: "Actionable Intelligence Briefing", description: "Delivering an executive intelligence briefing with clear probabilities and strategic recommendations." },
      ],
    },
    whatYouReceive: {
      subtitle: "Strategic deliverables",
      items: [
        "Confidential Intelligence Assessment containing verified facts, probability metrics, and strategic insights",
        "Relationship and influence network visualisations showing key decision-makers and leverage points",
        "Continuous monitoring updates during live commercial negotiations or hostile disputes",
        "Briefing sessions with our senior intelligence directors for board and legal advisory teams",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Client base",
      clientTypes: [
        { title: "Chief Executives & Chairpersons", description: "Providing strategic intelligence for M&A bidding, board disputes, and defense strategies." },
        { title: "Family Offices & Principals", description: "Safeguarding multi-generational capital, commercial interests, and personal reputations." },
        { title: "Special Situations Litigators", description: "Supplying leverage and intelligence for multi-jurisdictional dispute resolution." },
      ],
    },
    relatedServices: [
      { title: "OSINT Investigations", slug: "osint-investigations", discipline: "Intelligence" },
      { title: "Due Diligence", slug: "due-diligence", discipline: "Corporate" },
      { title: "Digital Investigations", slug: "digital-investigations", discipline: "Intelligence" },
      { title: "Asset Tracing", slug: "asset-tracing", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "Is corporate intelligence gathering legal in the UK?", answer: "Yes. All intelligence activities are conducted strictly within UK and international legal frameworks, adhering to data protection laws, the Bribery Act 2010, and ethical guidelines." },
      { question: "How do you protect the identity of the instructing client?", answer: "Client identity is strictly protected. Our investigations are conducted with complete operational independence, ensuring our client is never disclosed to targets or sources." },
      { question: "How quickly can an intelligence assessment be completed?", answer: "Urgent situational briefs can be delivered within 48 to 72 hours, while comprehensive multi-jurisdictional intelligence projects typically span 2 to 3 weeks." },
    ],
    metaTitle: "Private Intelligence & Corporate Advisory UK | Strategic Intelligence Firm",
    metaDescription: "Strategic corporate intelligence and advisory services in London. Uncovering counterparty motives, competitive intelligence, and high-value risk factors.",
  },

  "osint-investigations": {
    slug: "osint-investigations",
    title: "OSINT Investigations",
    category: "INTELLIGENCE",
    disciplineNumber: "02",
    heroProposition: "Advanced Open-Source Intelligence extracting critical evidence from the global surface, deep, and technical web.",
    summary: "Transforming disparate digital fragments, technical infrastructure records, and obscure public repositories into structured, admissible intelligence.",
    theQuestion: {
      subtitle: "The power and complexity of open-source data",
      description: "Over 90% of actionable intelligence exists in publicly accessible or technical data pools, yet accessing and synthesizing this information requires specialist investigative tools, linguistic capabilities, and forensic methodology. Standard search engines capture less than 5% of digital breadcrumbs.",
      scenarios: [
        "Unmasking anonymous online adversaries publishing defamatory, extortionate, or proprietary materials",
        "Locating missing individuals, evasive debtors, or covert business operations across international borders",
        "Mapping corporate footprints across obscure international registries, tax records, and technical DNS history",
        "Investigating digital assets, cryptocurrency transaction trails, and pseudonymised commercial identities",
        "Reconstructing historical activity, digital footprints, and archived content scrubbed from the internet",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Technical & digital disciplines",
      capabilities: [
        { name: "Digital Identity Attribution", detail: "Linking pseudonyms, email addresses, phone numbers, and social handles to real-world identities." },
        { name: "Domain & Infrastructure Forensics", detail: "Uncovering hosting histories, WHOIS records, SSL certificate associations, and server networks." },
        { name: "Archived & Scrubbed Record Recovery", detail: "Extracting deleted web pages, cached datasets, and historical digital footprints." },
        { name: "Social Network & Geo-Intelligence", detail: "Triangulating geolocation metadata, social circles, timeline reconstructions, and behavioral patterns." },
      ],
    },
    ourApproach: {
      subtitle: "Methodical OSINT tradecraft",
      stages: [
        { step: "01", title: "Target Footprint Scoping", description: "Cataloguing initial identifiers, phone hashes, usernames, IP ranges, and corporate entities." },
        { step: "02", title: "Automated & Manual Deep Extraction", description: "Deploying automated scraper tooling alongside manual linguistic and technical deep-web mining." },
        { step: "03", title: "Network & Entity Synthesis", description: "Structuring data points into relational graphs to reveal unadvertised connections and patterns." },
        { step: "04", title: "Evidentiary Preservation", description: "Cryptographically hashing and preserving all digital evidence in accordance with ISO/IEC 27037 standards." },
      ],
    },
    whatYouReceive: {
      subtitle: "Deliverables",
      items: [
        "Comprehensive OSINT Investigation Dossier with clear attribution findings and confidence ratings",
        "Relational intelligence charts visualizing links between individuals, entities, and web infrastructure",
        "Cryptographically hashed digital exhibits and certified archive captures suitable for court filing",
        "Actionable next-step recommendations for legal or field deployment",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing sectors",
      clientTypes: [
        { title: "Litigators & Dispute Counsel", description: "Sourcing digital proof, witness traces, and counterparty asset disclosures." },
        { title: "Corporate Security Directors", description: "Attributing cyber harassment, insider leaks, and brand impersonation campaigns." },
        { title: "Private Clients & Family Offices", description: "Discreetly investigating digital threats, stalkers, and background verification." },
      ],
    },
    relatedServices: [
      { title: "Digital Investigations", slug: "digital-investigations", discipline: "Intelligence" },
      { title: "People Tracing", slug: "people-tracing", discipline: "Intelligence" },
      { title: "Background Investigations", slug: "background-investigations", discipline: "Intelligence" },
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
    ],
    faqs: [
      { question: "What is the difference between OSINT and hacking?", answer: "OSINT relies exclusively on lawfully accessible data, public databases, open infrastructure records, and analytical tradecraft. We do not engage in unauthorized computer intrusion or illegal intercept." },
      { question: "Can online evidence gathered via OSINT be presented in court?", answer: "Yes. We preserve digital evidence following strict chain-of-custody protocols and digital forensic standards (ISO/IEC 27037), ensuring admissibility in UK courts." },
      { question: "Can you unmask anonymous website owners or forum posters?", answer: "In the vast majority of cases, technical oversights in domain registration, server setup, email handling, or linked accounts allow us to positively attribute anonymous personas." },
    ],
    metaTitle: "OSINT Investigations UK | Open Source Intelligence Experts",
    metaDescription: "Professional OSINT investigations by London private intelligence firm. Digital identity attribution, deep-web research, asset identification, and court-ready proof.",
  },

  "digital-investigations": {
    slug: "digital-investigations",
    title: "Digital Investigations",
    category: "INTELLIGENCE",
    disciplineNumber: "02",
    heroProposition: "Forensic inquiry into cyber-enabled fraud, data theft, digital extortion, and covert electronic trails.",
    summary: "Unravelling complex electronic evidence trails to establish who accessed data, where it was transferred, and how digital assets were compromised.",
    theQuestion: {
      subtitle: "When the crime leaves only bytes",
      description: "Modern commercial crime is predominantly digital. Whether dealing with an insider transferring intellectual property to a personal cloud drive or an external actor conducting business email compromise fraud, electronic traces must be identified and preserved immediately.",
      scenarios: [
        "Insider data theft where a departing executive downloads proprietary client databases onto removable media",
        "Business Email Compromise (BEC) fraud involving manipulated bank details and diverted supplier payments",
        "Digital extortion, blackmail, or anonymous defamatory campaigns targeting company leadership",
        "Unauthorized cloud access and illicit tampering with corporate enterprise records",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Investigative scope",
      capabilities: [
        { name: "Insider Exfiltration Forensics", detail: "Reconstructing USB usage, cloud uploads, email forwarding rules, and file deletion history." },
        { name: "Payment Interception & BEC Analysis", detail: "Tracking mail exchange rules, spoofed domain origins, and recipient bank account routing." },
        { name: "Digital Harassment & Defamation Attribution", detail: "Tracing anonymous sender infrastructure, proxy services, and online publication sources." },
        { name: "Cryptocurrency & Digital Asset Flow", detail: "Blockchain analysis of ransomware payments, stolen tokens, and off-ramping exchanges." },
      ],
    },
    ourApproach: {
      subtitle: "Digital forensic discipline",
      stages: [
        { step: "01", title: "Emergency Preservation", description: "Securing image backups, server logs, and mailbox audit trails without altering digital metadata." },
        { step: "02", title: "Forensic Reconstruction", description: "Parsing system event logs, registry keys, and communication artifacts to build a minute-by-minute timeline." },
        { step: "03", title: "Actor Attribution & Intelligence", description: "Combining technical forensic findings with OSINT and real-world intelligence to identity culpable actors." },
        { step: "04", title: "Evidentiary Court File", description: "Preparing formal forensic reports complying with Criminal Procedure Rules and Civil Procedure Rules." },
      ],
    },
    whatYouReceive: {
      subtitle: "Outputs",
      items: [
        "Certified Digital Forensic Report documenting methodologies, findings, and technical conclusions",
        "Chronological activity log detailing file access, device connections, and transfer destinations",
        "Chain of custody documentation satisfying UK court evidentiary admissibility requirements",
        "Technical recommendations for immediate security remediation and containment",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Clients",
      clientTypes: [
        { title: "Litigators & Legal Counsel", description: "Requiring urgent expert digital evidence for Norwich Pharmacal and search orders." },
        { title: "Managing Directors & CISOs", description: "Managing active insider threats, data compromises, and supplier payment fraud." },
        { title: "Victims of Targeted Digital Attacks", description: "Identifying anonymous adversaries conducting extortion or reputational sabotage." },
      ],
    },
    relatedServices: [
      { title: "OSINT Investigations", slug: "osint-investigations", discipline: "Intelligence" },
      { title: "Corporate Fraud Investigations", slug: "corporate-fraud-investigations", discipline: "Corporate" },
      { title: "Employee Investigations", slug: "employee-investigations", discipline: "Corporate" },
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
    ],
    faqs: [
      { question: "How fast can you respond to an active data breach or insider theft?", answer: "Our team provides urgent deployment to guide immediate evidence preservation before critical log files roll over or suspects wipe devices." },
      { question: "Do you follow ACPO principles for digital evidence?", answer: "Yes, all data handling strictly conforms to the Good Practice Guide for Digital Evidence and ISO/IEC standards to ensure unimpeachable court admissibility." },
      { question: "Can you trace cryptocurrency stolen in an investment fraud?", answer: "Yes, our blockchain analytics specialists trace funds across transactions, identify mixing service interactions, and pinpoint regulated exchange off-ramps." },
    ],
    metaTitle: "Digital Investigations & Cyber Forensics UK | Private Intelligence",
    metaDescription: "Discreet digital investigations into data exfiltration, business email compromise, online defamation, and cryptocurrency fraud. Court-compliant digital evidence.",
  },

  "asset-tracing": {
    slug: "asset-tracing",
    title: "Asset Tracing & Recovery Intelligence",
    category: "INTELLIGENCE",
    disciplineNumber: "02",
    heroProposition: "Uncovering hidden, dissipated, and layered assets across the UK and international offshore jurisdictions.",
    summary: "Locating high-value real estate, corporate holdings, luxury chattels, and financial instruments to enforce judgments and recover debts.",
    theQuestion: {
      subtitle: "When debtors and defendants conceal wealth",
      description: "Securing a multi-million-pound court judgment or arbitral award is meaningless if the debtor claims insolvency while enjoying an opulent lifestyle through opaque trusts and nominee entities. Enforcement requires unmasking their true wealth.",
      scenarios: [
        "Enforcing high-value commercial judgments against evasive corporate or individual debtors",
        "High-net-worth divorce proceedings involving concealed family wealth, offshore accounts, and hidden trusts",
        "Insolvency investigations uncovering antecedent asset transfers and preferential transactions",
        "Pre-action financial standing assessments before committing significant capital to litigation",
        "Fraud recovery where misappropriated capital has been converted into tangible assets across multiple countries",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Asset categories traced",
      capabilities: [
        { name: "Real Property & Land Holdings", detail: "Identifying commercial and residential property portfolios held directly or through offshore wrappers." },
        { name: "Corporate Equity & Shareholdings", detail: "Uncovering active businesses, subsidiary networks, and lucrative dividend revenue streams." },
        { name: "Luxury Chattels & Movables", detail: "Locating private aircraft, superyachts, collector automobile fleets, and fine art collections." },
        { name: "Offshore Trust & Nominee Structures", detail: "Deconstructing corporate veils across Jersey, Guernsey, Isle of Man, Cayman, BVI, and Switzerland." },
      ],
    },
    ourApproach: {
      subtitle: "Multi-jurisdictional tracing methodology",
      stages: [
        { step: "01", title: "Target Financial Profiling", description: "Mapping known entities, historic businesses, family offices, and commercial touchpoints." },
        { step: "02", title: "Registry & Global Data Interrogation", description: "Examining land registries, maritime shipping registries, aviation databases, and corporate archives." },
        { step: "03", title: "Discreet Physical & Source Inquiries", description: "Verifying physical asset locations, vessel moorings, and operational commercial premises." },
        { step: "04", title: "Enforcement Intelligence Dossier", description: "Presenting a clear, asset-indexed report ready for charging orders, third-party debt orders, and freezing injunctions." },
      ],
    },
    whatYouReceive: {
      subtitle: "Enforcement intelligence",
      items: [
        "Detailed Asset Schedule indexing all identified properties, corporate shares, and valuable chattels",
        "Evidence of beneficial ownership proving target control despite nominee or corporate structuring",
        "Jurisdiction analysis outlining local enforcement viability and registration requirements",
        "Affidavit-ready evidentiary brief for worldwide freezing orders and disclosure applications",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing clients",
      clientTypes: [
        { title: "Judgment Creditors & Litigators", description: "Enforcing arbitral awards, High Court judgments, and unpaid commercial debts." },
        { title: "Family Law Barristers & Solicitors", description: "Uncovering undisclosed marital assets and secret business interests in financial remedy cases." },
        { title: "Insolvency Practitioners & Liquidators", description: "Maximising asset recovery for creditor committees from bankrupts and delinquent directors." },
      ],
    },
    relatedServices: [
      { title: "People Tracing", slug: "people-tracing", discipline: "Intelligence" },
      { title: "Corporate Fraud Investigations", slug: "corporate-fraud-investigations", discipline: "Corporate" },
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
      { title: "Covert Surveillance", slug: "covert-surveillance", discipline: "Field" },
    ],
    faqs: [
      { question: "Can you access private bank accounts in the UK or offshore?", answer: "No. Accessing banking records without a court order is illegal under UK law. Instead, we locate tangible assets (property, equity, yachts, aircraft) and identify banking institutions for solicitors to serve disclosure or third-party debt orders on lawfully." },
      { question: "How do you prove beneficial ownership behind offshore companies?", answer: "Through cross-border corporate filings, historic conveyancing documents, mortgage charges, planning applications, local human intelligence, and digital footprints." },
      { question: "What is the typical timeframe for an asset tracing investigation?", answer: "UK-focused asset tracing typically takes 5 to 10 working days; complex multi-jurisdictional offshore investigations require 2 to 4 weeks." },
    ],
    metaTitle: "Asset Tracing & Recovery UK | International Private Intelligence",
    metaDescription: "Specialist asset tracing for commercial litigation, debt enforcement, and high-value divorce. Identifying hidden property, corporate shares, and offshore assets.",
  },

  "people-tracing": {
    slug: "people-tracing",
    title: "People Tracing & Subject Location",
    category: "INTELLIGENCE",
    disciplineNumber: "02",
    heroProposition: "Discreet, lawful location of evasive debtors, vital witnesses, missing beneficiaries, and key defendants.",
    summary: "Going far beyond basic electoral register lookups to locate individuals who actively seek to conceal their residential and commercial presence.",
    theQuestion: {
      subtitle: "When a subject has vanished or gone to ground",
      description: "Serving legal process, enforcing a debt, or progressing complex litigation requires establishing a confirmed, physical service address. Simple credit checks fail when a debtor intentionally uses aliases, mail drops, or temporary accommodations.",
      scenarios: [
        "Locating evasive debtors intentionally dodging statutory demands and court claims",
        "Finding critical witnesses whose testimony is essential for commercial or criminal defense trials",
        "Locating missing heirs, executors, or beneficiaries in contentious probate matters",
        "Confirming the physical residence of defendants for personal service of urgent injunctions",
        "Locating former corporate directors for insolvency examinations and antecedent claims",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Investigation capabilities",
      capabilities: [
        { name: "Evasive Debtor Location", detail: "Uncovering true residential addresses, covert business premises, and leisure patterns." },
        { name: "Key Witness Tracing", detail: "Tracing witnesses who have relocated, changed names, or departed from former employers." },
        { name: "Probate & Heir Location", detail: "Genealogical research, public record verification, and international family tracing." },
        { name: "Physical Address Verification", detail: "Conducting discreet on-site physical reconnaissance to confirm the subject is residing at the location." },
      ],
    },
    ourApproach: {
      subtitle: "Multi-layered tracing protocol",
      stages: [
        { step: "01", title: "Data Aggregation & Discrepancy Analysis", description: "Interrogating proprietary credit header databases, tenancy records, and historical directories." },
        { step: "02", title: "Commercial & Social Footprint Mapping", description: "Analyzing corporate directorships, planning applications, professional registers, and OSINT." },
        { step: "03", title: "On-Site Physical Verification", description: "Deploying discreet field operatives to confirm residency through vehicle presence, post, or direct sighting." },
        { step: "04", title: "Certified Trace Report", description: "Supplying a CPR-compliant trace report with confirmed address details ready for process servers." },
      ],
    },
    whatYouReceive: {
      subtitle: "Trace deliverable",
      items: [
        "Certified Trace Report with confirmed current residential and business addresses",
        "Summary of residency evidence (e.g. vehicle registration sightings, utility connections, verified tenancy)",
        "Process service suitability briefing detailing security gates, access codes, and daily routine patterns",
        "Affidavit of due diligence where substitute service orders are required from court",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing parties",
      clientTypes: [
        { title: "Litigation Solicitors & Paralegals", description: "Securing confirmed service addresses for originating summonses and statutory notices." },
        { title: "Probate & Trust Lawyers", description: "Locating missing beneficiaries and heirs across global jurisdictions." },
        { title: "Insolvency Practitioners", description: "Tracing bankrupts who have absconded to evade formal interviews and asset surrender." },
      ],
    },
    relatedServices: [
      { title: "Background Investigations", slug: "background-investigations", discipline: "Intelligence" },
      { title: "Asset Tracing", slug: "asset-tracing", discipline: "Intelligence" },
      { title: "Witness Enquiries", slug: "witness-enquiries", discipline: "Legal" },
      { title: "Covert Surveillance", slug: "covert-surveillance", discipline: "Field" },
    ],
    faqs: [
      { question: "Is your people tracing compliant with the UK Data Protection Act 2018?", answer: "Yes. All inquiries operate under lawful basis grounds (e.g. legitimate interest for litigation, legal claims, and debt recovery) in strict accordance with GDPR and DPA 2018 standards." },
      { question: "What success rate do you achieve on evasive subjects?", answer: "Our advanced intelligence and field verification methodology achieves an industry-leading success rate exceeding 93% even on hardened, evasive targets." },
      { question: "Can you provide personal service of documents once located?", answer: "Yes. We coordinate directly with professional process servers or can effect personal service directly where instructed." },
    ],
    metaTitle: "People Tracing & Debtor Location UK | Private Investigators London",
    metaDescription: "Professional people tracing services in the UK. Locating evasive debtors, vital witnesses, and missing beneficiaries with verified physical address confirmation.",
  },

  "background-investigations": {
    slug: "background-investigations",
    title: "Executive Background Investigations",
    category: "INTELLIGENCE",
    disciplineNumber: "02",
    heroProposition: "Rigorous, discreet verification of executive credentials, personal integrity, financial history, and reputation.",
    summary: "Providing comprehensive, granular background intelligence for C-suite appointments, significant financial partnerships, and sensitive appointments.",
    theQuestion: {
      subtitle: "Beyond the polished resume and references",
      description: "Standard pre-employment screening agencies run superficial automated checks that verify stated education and criminal convictions, but fail to examine deep character flaws, concealed financial failures, hostile litigation histories, and toxic personal disputes.",
      scenarios: [
        "Appointing a new CEO, CFO, or non-executive director to a public or private board",
        "Vetting prospective co-founders, hedge fund managers, or private equity operating partners",
        "Evaluating high-value business brokers, intermediaries, or sovereign advisors",
        "Discreetly vetting prospective partners or marriages within high-net-worth families",
        "Assessing individuals in sensitive national security or critical commercial infrastructure roles",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Investigation elements",
      capabilities: [
        { name: "Academic & Professional Credential Verification", detail: "Primary source verification of degrees, certifications, directorship tenures, and achievements." },
        { name: "Litigation & Dispute History", detail: "Searching County Court Judgments (CCJs), High Court claims, employment tribunal records, and insolvency filings." },
        { name: "Corporate Track Record & Governance", detail: "Examining dissolved companies, director disqualifications, liquidation histories, and regulatory reprimands." },
        { name: "Reputational & Integrity Scrutiny", detail: "Interrogating open-source footprints, adverse media archives, and discreet peer commentary." },
      ],
    },
    ourApproach: {
      subtitle: "Multi-vector vetting methodology",
      stages: [
        { step: "01", title: "Public Record & Civil Registry Audit", description: "Verifying identity, historical residential addresses, corporate registers, and electoral history." },
        { step: "02", title: "Financial & Regulatory Search", description: "Screening insolvency registers, sanctions lists, PEP databases, and regulatory registries (FCA, SRA, GMC)." },
        { step: "03", title: "OSINT & Digital Archaeology", description: "Deep mining of historical web archives, forum footprints, deleted posts, and media associations." },
        { step: "04", title: "Comprehensive Executive Dossier", description: "Compiling an objective, categorized risk profile highlighting verified facts and discrepancy indicators." },
      ],
    },
    whatYouReceive: {
      subtitle: "Executive vetting deliverable",
      items: [
        "In-depth Executive Background Report detailing full career history, corporate records, and financial standing",
        "Discrepancy matrix highlighting any embellishments, omissions, or misrepresentations",
        "Adverse media and litigation dossier with primary court documents and filings",
        "Discreet reputation summary synthesizing industry feedback and professional integrity indicators",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing clients",
      clientTypes: [
        { title: "Nomination & Renumeration Committees", description: "Performing discreet pre-appointment vetting on C-suite and board candidates." },
        { title: "Private Equity Sponsors", description: "Vetting management teams in pre-acquisition and turnaround situations." },
        { title: "Family Office Principals", description: "Protecting high-net-worth families from sophisticated social and financial predators." },
      ],
    },
    relatedServices: [
      { title: "Due Diligence", slug: "due-diligence", discipline: "Corporate" },
      { title: "OSINT Investigations", slug: "osint-investigations", discipline: "Intelligence" },
      { title: "People Tracing", slug: "people-tracing", discipline: "Intelligence" },
      { title: "Corporate Investigations", slug: "corporate-investigations", discipline: "Corporate" },
    ],
    faqs: [
      { question: "Is the subject notified that a background investigation is taking place?", answer: "Not unless required by specific statutory frameworks. In private commercial instructions, we conduct passive, non-intrusive public-source and registry inquiries leaving zero footprint." },
      { question: "How does this compare to standard HR background screening?", answer: "Standard HR checks use automated software that ticks boxes. Our investigations are led by experienced intelligence analysts who cross-examine records, uncover hidden entities, and detect deliberate concealment." },
      { question: "Can you investigate international candidates?", answer: "Yes, we regularly investigate individuals across Europe, North America, the Middle East, Asia, and offshore jurisdictions." },
    ],
    metaTitle: "Executive Background Investigations UK | Private Intelligence London",
    metaDescription: "Comprehensive executive background checks and integrity vetting for board appointments, private equity partners, and family offices.",
  },

  "legal": {
    slug: "legal",
    title: "Legal Investigations & Litigation Support",
    category: "LEGAL",
    disciplineNumber: "03",
    heroProposition: "Evidence, intelligence and investigative support for high-stakes commercial disputes and criminal defense.",
    summary: "Partnering with leading law firms, barristers, and corporate counsel to transform contested assertions into unassailable evidentiary truth.",
    theQuestion: {
      subtitle: "When legal strategy demands factual certainty",
      description: "Legal arguments are only as powerful as the underlying evidence supporting them. In complex commercial litigation, international arbitration, and criminal proceedings, key facts are frequently obscured, witnesses absent, and counterparties deceitful.",
      scenarios: [
        "High Court commercial disputes requiring primary factual evidence to substantiate breach of contract claims",
        "Pre-action investigations to evaluate defendant financial strength and viability before issuing proceedings",
        "Evidencing deceit, fraudulent misrepresentation, and civil conspiracy in commercial transactions",
        "Locating and interviewing reluctant third-party witnesses whose testimony can tip the balance of trial",
        "Supporting urgent applications for Norwich Pharmacal, Bankers Trust, and Search Orders",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Core litigation support capabilities",
      capabilities: [
        { name: "Pre-Action Due Diligence", detail: "Assessing opponent solvency, asset structures, and underlying commercial pressure points." },
        { name: "Evidentiary Gathering for Trial", detail: "Procuring admissible documentation, photographic evidence, and physical records." },
        { name: "Witness Tracing & Proofs of Evidence", detail: "Locating witnesses, conducting preliminary interviews, and securing signed proofs." },
        { name: "Counter-Party Attack Dissection", detail: "Analyzing opposing claims to identify factual inconsistencies, fabricated evidence, or witness collusion." },
      ],
    },
    ourApproach: {
      subtitle: "Court-ready standards",
      stages: [
        { step: "01", title: "Legal Privilege & Case Scoping", description: "Structuring investigative instructions under legal professional privilege with litigation counsel." },
        { step: "02", title: "Targeted Evidence Gathering", description: "Deploying multi-disciplinary digital, corporate, and field intelligence vectors tailored to the pleadings." },
        { step: "03", title: "Cross-Examination Testing", description: "Stress-testing every finding, document, and timeline against potential opponent objections." },
        { step: "04", title: "CPR-Compliant Deliverable", description: "Drafting witness statements, exhibit bundles, and forensic summaries indexed for court filing." },
      ],
    },
    whatYouReceive: {
      subtitle: "Litigation support outputs",
      items: [
        "CPR Part 31 and Part 32 compliant witness statements and documentary exhibit schedules",
        "Chronological factual dossiers linking commercial interactions, electronic evidence, and physical events",
        "Asset schedules for freezing injunctions (Civil Procedure Rules Part 25)",
        "Investigator court witness attendance for cross-examination testimony",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing counsel",
      clientTypes: [
        { title: "Commercial Litigation Partners", description: "Providing factual firepower for High Court and Court of Appeal litigation." },
        { title: "Chambers & Barristers", description: "Supplying verified proofs of evidence, witness statements, and forensic timelines." },
        { title: "General Counsel & Corporate Legal Teams", description: "Conducting pre-action viability assessments and regulatory dispute inquiries." },
      ],
    },
    relatedServices: [
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
      { title: "Evidence Gathering", slug: "evidence-gathering", discipline: "Legal" },
      { title: "Witness Enquiries", slug: "witness-enquiries", discipline: "Legal" },
      { title: "Asset Tracing", slug: "asset-tracing", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "Is your work product protected under Legal Professional Privilege?", answer: "When instructed directly by solicitors or barristers in contemplation of litigation, our work product falls under litigation privilege, safeguarding our work from disclosure." },
      { question: "How do you ensure evidence is admissible in court?", answer: "All operations are carried out strictly within UK statutory guidelines, ensuring full compliance with CPR rules, PACE where relevant, and data protection legislation." },
      { question: "Do you assist with emergency injunctions?", answer: "Yes, our team can be mobilized on short notice to gather evidence required for ex-parte freezing injunctions and search orders." },
    ],
    metaTitle: "Legal Investigations & Litigation Support UK | London Private Intelligence",
    metaDescription: "Discreet legal investigations for solicitors, barristers, and corporate counsel. Civil evidence gathering, witness tracing, and litigation support in London.",
  },

  "litigation-support": {
    slug: "litigation-support",
    title: "Litigation Support Services",
    category: "LEGAL",
    disciplineNumber: "03",
    heroProposition: "Tactical, factual and evidentiary support throughout the civil litigation lifecycle.",
    summary: "Empowering dispute resolution solicitors and advocates with the verifiable facts, asset intelligence, and witness testimony needed to win in court.",
    theQuestion: {
      subtitle: "Building an unassailable factual foundation",
      description: "Cases are won on the strength of evidence, not the elegance of legal prose. When an adversary conceals evidence, misrepresents transactions, or intimidates witnesses, our litigation support team provides the investigative machinery to rebalance the scales.",
      scenarios: [
        "Uncovering undisclosed documentary evidence and electronic trails before disclosure exchange",
        "Evaluating whether an opposing party has the financial capacity to satisfy a substantial cost order or judgment",
        "Gathering corroborative evidence to rebut fabricated witness statements and spurious counterclaims",
        "Tracing and interviewing former employees who hold critical internal documents regarding the dispute",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Litigation support scope",
      capabilities: [
        { name: "Opponent Asset Tracing & Solvency", detail: "Assessing defendant wealth to ensure litigation is economically viable and to underpin freezing orders." },
        { name: "Electronic & Physical Evidence Discovery", detail: "Sourcing external documentary proof to corroborate pleaded claims." },
        { name: "Witness Location & Statement Taking", detail: "Tracing elusive witnesses and obtaining admissible proofs of evidence." },
        { name: "Jury & Witness Intimidation Inquiries", detail: "Investigating interference, covert coaching, or improper inducement in sensitive trials." },
      ],
    },
    ourApproach: {
      subtitle: "Case integration",
      stages: [
        { step: "01", title: "Pleadings Analysis", description: "Reviewing Particulars of Claim, Defences, and witness statements to identify critical evidentiary voids." },
        { step: "02", title: "Targeted Field & Open-Source Research", description: "Executing focused searches across international registries, digital archives, and field sources." },
        { step: "03", title: "Evidentiary Synthesis", description: "Constructing objective comparative matrices contrasting opposing statements against verified facts." },
        { step: "04", title: "Delivery for Counsel", description: "Submitting exhibits, affidavits, and briefing notes directly to the instructing legal team." },
      ],
    },
    whatYouReceive: {
      subtitle: "Litigation assets",
      items: [
        "Court-compliant witness statements sworn or signed with Statement of Truth",
        "Indexed evidence bundles matching trial bundle formatting specifications",
        "Comparative inconsistency reports highlighting contradictions in opposing evidence",
        "Asset schedules supporting freezing injunctions under CPR Part 25",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Legal professionals",
      clientTypes: [
        { title: "Dispute Resolution Partners", description: "High-value commercial disputes in the Chancery, Commercial, and Technology Courts." },
        { title: "Insolvency Litigators", description: "Investigating misfeasance, fraudulent trading, and transaction at an undervalue claims." },
        { title: "Specialist Defamation & Privacy Lawyers", description: "Attributing anonymous publishers, cyber-libel, and privacy invasions." },
      ],
    },
    relatedServices: [
      { title: "Legal Investigations", slug: "legal", discipline: "Legal" },
      { title: "Evidence Gathering", slug: "evidence-gathering", discipline: "Legal" },
      { title: "Witness Enquiries", slug: "witness-enquiries", discipline: "Legal" },
      { title: "Asset Tracing", slug: "asset-tracing", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "Can you assist during ongoing trial proceedings?", answer: "Yes, we regularly support trial teams during active court hearings by verifying witness credibility, checking surprise assertions, and conducting urgent field inquiries overnight." },
      { question: "How do you handle sensitive cross-border dispute matters?", answer: "Through established international partnerships and secure communication frameworks, we obtain evidence lawfully in overseas jurisdictions for use in UK proceedings." },
      { question: "What standards govern your investigators' conduct?", answer: "Our investigators abide by the highest standards of professional conduct, ensuring our methods never jeopardize our clients' case or reputations." },
    ],
    metaTitle: "Litigation Support Services UK | Evidence for Law Firms London",
    metaDescription: "Professional litigation support for UK law firms, barristers, and corporate counsel. Asset checks, witness proofs, disclosure support, and trial evidence.",
  },

  "evidence-gathering": {
    slug: "evidence-gathering",
    title: "Civil Evidence Gathering",
    category: "LEGAL",
    disciplineNumber: "03",
    heroProposition: "Procuring admissible, unassailable evidence to prove civil claims and commercial torts.",
    summary: "Operating to the highest standards of legal admissibility to uncover, document, and authenticate vital physical, digital, and documentary evidence.",
    theQuestion: {
      subtitle: "Transforming suspicion into legal proof",
      description: "In the English legal system, the burden of proof rests on the claimant. Possessing strong instincts or second-hand rumors is insufficient; success requires contemporaneous records, verifiable documentation, and unimpeachable witness statements.",
      scenarios: [
        "Proving breaches of commercial contracts, delivery failures, or substandard industrial performance",
        "Documenting intellectual property infringement, counterfeit distribution networks, and trademark dilution",
        "Establishing tortious interference, induce breach of contract, and commercial slander",
        "Evidencing boundary disputes, right-of-way violations, and unauthorized land occupation",
        "Proving environmental contamination, illegal dumping, and breaches of planning regulations",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Evidence collection capabilities",
      capabilities: [
        { name: "Physical & Environmental Verification", detail: "Contemporaneous photographic evidence, site inspections, and sample procurement." },
        { name: "Commercial & Transactional Proof", detail: "Securing test purchases, delivery receipts, and supplier documentation." },
        { name: "Digital & Communications Evidence", detail: "Forensic capture of online infringement, defamatory postings, and communications." },
        { name: "Chain of Custody Management", detail: "Securing physical and digital exhibits to prevent any claim of tampering or spoliation." },
      ],
    },
    ourApproach: {
      subtitle: "Evidentiary rigor",
      stages: [
        { step: "01", title: "Legal Parameter Verification", description: "Confirming evidential requirements, relevant tort elements, and statutory boundaries." },
        { step: "02", title: "Systematic Procurement", description: "Deploying lawful collection techniques, time-stamped capture systems, and test purchases." },
        { step: "03", title: "Forensic Authentication", description: "Validating provenance, metadata, and physical chain of custody." },
        { step: "04", title: "Court-Ready Exhibit File", description: "Compiling indexed exhibit schedules cross-referenced with formal statements of truth." },
      ],
    },
    whatYouReceive: {
      subtitle: "Evidence file",
      items: [
        "Certified Exhibit Dossier containing all physical and digital evidence properly indexed",
        "Investigator Witness Statements detailing exact times, dates, methods, and observations",
        "Complete chain of custody logs ensuring complete integrity against spoliation challenges",
        "High-definition video and photographic evidence with verified timestamps and geographic metadata",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Clients",
      clientTypes: [
        { title: "IP & Brand Protection Solicitors", description: "Evidencing trademark infringement, counterfeiting, and passing off." },
        { title: "Property & Commercial Litigators", description: "Documenting lease breaches, boundary infringements, and commercial trespass." },
        { title: "Corporate Risk Directors", description: "Establishing proof of contract breach before issuing formal default notices." },
      ],
    },
    relatedServices: [
      { title: "Legal Investigations", slug: "legal", discipline: "Legal" },
      { title: "Witness Enquiries", slug: "witness-enquiries", discipline: "Legal" },
      { title: "Covert Surveillance", slug: "covert-surveillance", discipline: "Field" },
      { title: "Digital Investigations", slug: "digital-investigations", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "What makes evidence admissible in UK civil courts?", answer: "Evidence must be relevant, lawfully obtained, and accompanied by verifiable provenance and chain of custody, ensuring that no improper entrapment or statutory violations occurred." },
      { question: "Can you perform test purchases for IP infringement cases?", answer: "Yes. We execute mystery shopping and test purchases adhering strictly to trading standards guidelines to establish counterfeit supply channels without inducing illegal acts." },
      { question: "Do you supply photographic and video evidence?", answer: "Yes, all visual evidence is captured with verified time, date, and geolocation stamps and preserved in uncompressed master formats." },
    ],
    metaTitle: "Civil Evidence Gathering UK | Admissible Court Proof London",
    metaDescription: "Professional evidence gathering for UK civil litigation, IP infringement, and contract breaches. Certified chain of custody and court-ready exhibits.",
  },

  "witness-enquiries": {
    slug: "witness-enquiries",
    title: "Witness Enquiries & Statement Taking",
    category: "LEGAL",
    disciplineNumber: "03",
    heroProposition: "Ethical, skilled tracing, interviewing, and formal statement taking from critical witnesses.",
    summary: "Securing vital, credible witness testimony for complex litigation, commercial arbitration, and contentious proceedings.",
    theQuestion: {
      subtitle: "The human element of every dispute",
      description: "Witness testimony frequently tips the balance in high-stakes civil and commercial disputes. Yet witnesses move, lose touch, fear involvement, or refuse to engage. Sourcing, approaching, and interviewing them requires tact, neutrality, and investigative tradecraft.",
      scenarios: [
        "Locating former corporate employees who observed internal misconduct, fraud, or safety failures",
        "Approaching third-party eyewitnesses to catastrophic commercial, transport, or industrial incidents",
        "Taking formal proofs of evidence from reluctant or vulnerable witnesses in contentious proceedings",
        "Evaluating the credibility, demeanour, and potential cross-examination vulnerabilities of key witnesses",
        "Securing statements under urgent time constraints before memories fade or counterparties attempt improper contact",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Capabilities",
      capabilities: [
        { name: "Witness Tracing & Location", detail: "Finding witnesses across the UK and internationally when historical contact information is expired." },
        { name: "Sensitive Approach & Engagement", detail: "Overcoming reluctance through professional, ethical engagement without coercion or improper incentive." },
        { name: "Cognitive Interviewing & Statement Drafting", detail: "Extracting detailed, accurate chronological recollections adhering to CPR standards." },
        { name: "Credibility & Vulnerability Assessment", detail: "Vetting potential witness bias, undisclosed relationships, and credibility risks." },
      ],
    },
    ourApproach: {
      subtitle: "Interviewing methodology",
      stages: [
        { step: "01", title: "Witness Mapping & Pre-Interview Profiling", description: "Reviewing known facts and conducting background checks on witnesses to evaluate independence." },
        { step: "02", title: "Discreet Approach", description: "Making contact at appropriate times and locations to ensure comfort and open communication." },
        { step: "03", title: "Neutral Cognitive Interview", description: "Employing non-leading questions to record comprehensive, unvarnished factual recollections." },
        { step: "04", title: "Statement Formulation & Execution", description: "Drafting the formal statement in the witness's own words with signed Statement of Truth." },
      ],
    },
    whatYouReceive: {
      subtitle: "Deliverables",
      items: [
        "CPR-compliant signed Witness Statements with Statement of Truth",
        "Comprehensive Interview Memoranda detailing witness demeanour, reliability, and potential trial weaknesses",
        "Recorded audio files and verbatim transcripts where authorized by the witness and instructing counsel",
        "Witness availability coordination and support through trial listing dates",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing counsel",
      clientTypes: [
        { title: "Litigation Solicitors & Barristers", description: "Conducting field witness interviews and securing formal proofs of evidence." },
        { title: "Insurers & Claims Counsel", description: "Investigating liability disputes and large-loss commercial claims." },
        { title: "Public Inquiries & Special Committees", description: "Gathering widespread witness testimony across complex institutional reviews." },
      ],
    },
    relatedServices: [
      { title: "Legal Investigations", slug: "legal", discipline: "Legal" },
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
      { title: "People Tracing", slug: "people-tracing", discipline: "Intelligence" },
      { title: "Evidence Gathering", slug: "evidence-gathering", discipline: "Legal" },
    ],
    faqs: [
      { question: "How do you ensure a witness statement cannot be challenged for coaching?", answer: "Our interviewers strictly use non-leading, open-ended cognitive questioning techniques and document the entire engagement to maintain complete evidentiary purity." },
      { question: "What if a witness is hostile or refuses to speak?", answer: "We document the approach and refusal in detail. Where appropriate, this allows instructing solicitors to apply for witness summonses or prepare alternative evidence." },
      { question: "Can you interview non-English speaking witnesses?", answer: "Yes, we deploy certified interpreters or multilingual investigators to ensure total precision and legal compliance." },
    ],
    metaTitle: "Witness Enquiries & Statement Taking UK | Litigation Investigators",
    metaDescription: "Professional witness tracing, interviewing, and CPR-compliant statement taking for UK solicitors, barristers, and corporate legal teams.",
  },

  "field": {
    slug: "field",
    title: "Field Investigations & Surveillance Operations",
    category: "FIELD",
    disciplineNumber: "04",
    heroProposition: "Discreet real-world intelligence, physical observation, and mobile surveillance deployed with precision.",
    summary: "When digital trails run out and truth exists only in the physical world, our elite field teams deliver definitive factual verification.",
    theQuestion: {
      subtitle: "When reality must be verified on the ground",
      description: "Desktop research, corporate registers, and digital analytics provide crucial intelligence, but they cannot show who enters a private meeting, what goods are loaded onto an unmarked lorry, or whether an executive is actively working for a competitor.",
      scenarios: [
        "Verifying whether a former director is secretly operating from a competitor's headquarters",
        "Documenting physical theft, unauthorized sub-letting, or industrial contamination",
        "Confirming the day-to-day physical capabilities of individuals claiming debilitating long-term disability",
        "Tracking high-value assets, luxury vehicles, and commercial plant equipment prior to repossession",
        "Conducting covert undercover inquiries within compromised industrial or distribution facilities",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Field capabilities",
      capabilities: [
        { name: "Mobile & Static Covert Surveillance", detail: "Operating vehicle and foot surveillance teams trained in counter-surveillance awareness." },
        { name: "Undercover Infiltration Operations", detail: "Placing experienced operatives within operational environments to uncover systemic theft and fraud." },
        { name: "Physical Site Reconnaissance", detail: "Inspecting commercial yards, factories, distribution centres, and residential premises." },
        { name: "Activity & Capability Verification", detail: "Objective observation of physical routines, work habits, and commercial operations." },
      ],
    },
    ourApproach: {
      subtitle: "Operational deployment",
      stages: [
        { step: "01", title: "Target Reconnaissance & Risk Assessment", description: "Mapping locations, ingress/egress routes, security presence, and camera positions." },
        { step: "02", title: "Proportionality & Operational Authorization", description: "Ensuring operations meet strict RIPA principles, Article 8 ECHR compliance, and GDPR legitimacy." },
        { step: "03", title: "Field Execution", description: "Deploying multi-operative teams using broadcast-grade optics and low-light equipment." },
        { step: "04", title: "Evidentiary File Assembly", description: "Compiling time-stamped logs, high-definition video, and sworn investigator statements." },
      ],
    },
    whatYouReceive: {
      subtitle: "Field deliverables",
      items: [
        "Chronological Daily Operational Log detailing every movement, arrival, and departure",
        "High-definition video and photographic footage with verified embedded timestamps",
        "Maps and route tracking overlays illustrating target movements and meeting locations",
        "Formal court-ready investigator witness statements ready for disclosure",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Client base",
      clientTypes: [
        { title: "Corporate Risk & Security Directors", description: "Uncovering internal theft rings, sabotage, and illicit competitor meetings." },
        { title: "Specialist Insurance Claims Units", description: "Verifying high-exposure personal injury, disability, and property loss claims." },
        { title: "High-Net-Worth Individuals & Family Offices", description: "Discreetly verifying personal integrity, security threats, and sensitive domestic matters." },
      ],
    },
    relatedServices: [
      { title: "Covert Surveillance", slug: "covert-surveillance", discipline: "Field" },
      { title: "Private Surveillance", slug: "private-surveillance", discipline: "Field" },
      { title: "Undercover Investigations", slug: "undercover-investigations", discipline: "Field" },
      { title: "Insurance Investigations", slug: "insurance-investigations", discipline: "Field" },
    ],
    faqs: [
      { question: "Is private surveillance legal in the United Kingdom?", answer: "Yes, when conducted lawfully in public places for a legitimate interest, without trespassing, harassment, or breaching privacy expectations under UK law." },
      { question: "How many operatives are deployed on a surveillance operation?", answer: "Depending on target mobility and terrain complexity, we deploy balanced teams of two to four operatives with multiple discreet vehicles to ensure continuous coverage without burn." },
      { question: "What happens if a subject detects surveillance?", answer: "Our operatives adhere to strict abort protocols. If counter-surveillance is detected, operatives break contact immediately to protect client confidentiality." },
    ],
    metaTitle: "Field Investigations & Covert Surveillance UK | London Firm",
    metaDescription: "Professional field investigations and covert surveillance operations across the UK. Evidence-led physical observation, undercover inquiries, and activity checks.",
  },

  "private-surveillance": {
    slug: "private-surveillance",
    title: "Private Surveillance Operations",
    category: "FIELD",
    disciplineNumber: "04",
    heroProposition: "Discreet, high-integrity physical surveillance conducted by former military and police specialists.",
    summary: "Providing unequivocal, time-stamped visual evidence of real-world activities, meetings, and movements with absolute discretion.",
    theQuestion: {
      subtitle: "Certainty where uncertainty is intolerable",
      description: "When serious personal, financial, or commercial stakes hinge on what is actually taking place in private, speculation is dangerous. Professional surveillance provides objective visual verification that stands up to the most demanding scrutiny.",
      scenarios: [
        "Verifying whether a business partner is secretly meeting with hostile takeover rivals",
        "Documenting breaches of court non-molestation or restraining orders",
        "Investigating high-value asset dissipation and concealed lifestyle spending during divorce proceedings",
        "Verifying the lifestyle, associations, and safety of vulnerable family members or heirs",
        "Protecting high-profile principals against stalking, corporate espionage, and unwanted observation",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Surveillance operations",
      capabilities: [
        { name: "Mobile Foot & Vehicle Surveillance", detail: "Tracking vehicular journeys across London, the UK, and international transport hubs." },
        { name: "Static Observation Points", detail: "Long-range optical monitoring of specific premises, private residences, and commercial facilities." },
        { name: "Discreet Meeting & Association Verification", detail: "Documenting attendees, interaction dynamics, and exchanges at hotels, restaurants, and clubs." },
        { name: "Counter-Surveillance Auditing", detail: "Establishing whether a client or executive is currently under hostile foreign or competitor observation." },
      ],
    },
    ourApproach: {
      subtitle: "Professional tradecraft",
      stages: [
        { step: "01", title: "Operational Briefing & Route Reconnaissance", description: "Analyzing target routines, vehicle details, exit avenues, and risk parameters." },
        { step: "02", title: "Discreet Multi-Unit Deployment", description: "Positioning mobile units, motorcycle couriers, and foot operatives for seamless handoffs." },
        { step: "03", title: "Real-Time Operational Logging", description: "Recording minute-by-minute movements with encrypted communications between units." },
        { step: "04", title: "Evidentiary Post-Production", description: "Synthesizing raw footage into an unassailable chronological report with high-res stills." },
      ],
    },
    whatYouReceive: {
      subtitle: "Outputs",
      items: [
        "Detailed Surveillance Log featuring minute-by-minute entries and movement mapping",
        "High-definition video footage delivered via encrypted physical drives or secure client portal",
        "High-resolution still photographs capturing faces, number plates, and meeting handovers",
        "Formal court witness statements signed under Statement of Truth",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Clients",
      clientTypes: [
        { title: "Private Clients & Family Offices", description: "Discreet inquiries into sensitive personal, matrimonial, and family governance matters." },
        { title: "High-Profile Individuals & Executives", description: "Protecting personal reputations and verifying counter-surveillance safety." },
        { title: "Specialist Family & Civil Lawyers", description: "Supplying objective evidence for high-value court hearings." },
      ],
    },
    relatedServices: [
      { title: "Covert Surveillance", slug: "covert-surveillance", discipline: "Field" },
      { title: "Field Investigations", slug: "field", discipline: "Field" },
      { title: "Employee Investigations", slug: "employee-investigations", discipline: "Corporate" },
      { title: "People Tracing", slug: "people-tracing", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "How do you ensure surveillance remains completely undetected?", answer: "By deploying multiple operatives in rotating discreet vehicles with continuous changeovers. Operatives never compromise distance or security thresholds." },
      { question: "How much does a professional surveillance operation cost?", answer: "Deployments are structured based on team size, duration, and vehicle requirements. Professional operations typically range from £1,200 to £2,500+ per day." },
      { question: "Can surveillance footage be used in UK family courts?", answer: "Yes, when lawfully obtained without breach of privacy or trespass, surveillance evidence is admissible in family and civil courts." },
    ],
    metaTitle: "Private Surveillance London & UK | Discreet Private Investigators",
    metaDescription: "Discreet private surveillance operations across London and the UK. Elite surveillance teams, time-stamped video evidence, and complete confidentiality.",
  },

  "covert-surveillance": {
    slug: "covert-surveillance",
    title: "Covert Surveillance Services",
    category: "FIELD",
    disciplineNumber: "04",
    heroProposition: "Specialist covert surveillance operations designed for the most challenging, hostile, or sensitive environments.",
    summary: "Deploying advanced tradecraft, low-profile vehicles, and ultra-long-range optical systems where discovery is unacceptable.",
    theQuestion: {
      subtitle: "When absolute discretion is the only option",
      description: "Certain environments—hyper-vigilant targets, rural estates, secure commercial complexes, or foreign jurisdictions—require extraordinary covert discipline. Standard surveillance methods will be burned within minutes.",
      scenarios: [
        "Monitoring targets who actively check their mirrors, change routes, or employ counter-surveillance",
        "Rural and semi-rural operations where unfamiliar vehicles are immediately noticed by local communities",
        "High-security corporate premises requiring technical concealment and specialized surveillance platforms",
        "Investigating organized theft rings operating with lookouts, encrypted radios, and counter-tactics",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Specialist covert capabilities",
      capabilities: [
        { name: "Urban & Rural Technical Handoffs", detail: "Operating across dynamic city centres and sparse rural terrain without raising suspicion." },
        { name: "Counter-Surveillance Detection", detail: "Identifying whether targets are being protected by third-party security details or counter-teams." },
        { name: "Discreet Close-Target Reconnaissance", detail: "Operating in high-end private clubs, luxury hotels, and conference environments." },
        { name: "Long-Range Thermal & Low-Light Optics", detail: "Gathering high-clarity evidence in complete darkness and adverse weather conditions." },
      ],
    },
    ourApproach: {
      subtitle: "Tactical methodology",
      stages: [
        { step: "01", title: "Target Vulnerability Analysis", description: "Mapping schedule unpredictability, counter-surveillance awareness, and vehicle habits." },
        { step: "02", title: "Bespoke Asset Allocation", description: "Selecting operatives, covert vehicle types, and optics tailored specifically to the operational area." },
        { step: "03", title: "Dynamic Phased Deployment", description: "Employing parallel observation lanes and stand-off distances to maintain unbroken coverage." },
        { step: "04", title: "Secure Cryptographic Deliverable", description: "Processing evidence on air-gapped systems and delivering directly to counsel or principals." },
      ],
    },
    whatYouReceive: {
      subtitle: "Deliverables",
      items: [
        "Forensic-grade covert surveillance footage with synchronized timestamps and GPS logs",
        "Full operational deployment summary detailing environmental conditions and target behaviors",
        "Evidentiary statement prepared for high-stakes criminal, civil, or regulatory proceedings",
        "Tactical risk recommendations for ongoing security and legal positioning",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Specialist clients",
      clientTypes: [
        { title: "Specialist Fraud & Criminal Barristers", description: "Securing definitive evidence in complex multi-million pound conspiracies." },
        { title: "High-Net-Worth Family Offices", description: "Protecting family assets, reputations, and security against sophisticated threats." },
        { title: "Corporate Fraud & Whistleblowing Teams", description: "Gathering incontrovertible proof of internal collusion and theft." },
      ],
    },
    relatedServices: [
      { title: "Private Surveillance", slug: "private-surveillance", discipline: "Field" },
      { title: "Field Investigations", slug: "field", discipline: "Field" },
      { title: "Undercover Investigations", slug: "undercover-investigations", discipline: "Field" },
      { title: "Insurance Investigations", slug: "insurance-investigations", discipline: "Field" },
    ],
    faqs: [
      { question: "What separates covert surveillance from standard private detection?", answer: "Covert surveillance employs military and intelligence-grade tradecraft, multiple rotating operatives, custom-fitted observation vehicles, and rigorous operational security." },
      { question: "How do you manage operations in ultra-secure private members' clubs or hotels?", answer: "Our operatives possess the profile, demeanor, and resources to integrate seamlessly into exclusive London and international environments without attracting scrutiny." },
      { question: "Is covert surveillance permitted under UK human rights laws?", answer: "Yes, provided the surveillance is necessary, proportionate, and balances legitimate commercial or legal interests against the subject's reasonable expectation of privacy." },
    ],
    metaTitle: "Covert Surveillance UK | High-Discretion Private Intelligence",
    metaDescription: "Elite covert surveillance operations in London and the UK. Former military and intelligence personnel delivering court-grade visual evidence.",
  },

  "undercover-investigations": {
    slug: "undercover-investigations",
    title: "Undercover & Infiltration Investigations",
    category: "FIELD",
    disciplineNumber: "04",
    heroProposition: "Lawful, highly controlled human infiltration to uncover internal theft, sabotage, and systemic corruption.",
    summary: "Placing trained investigative operatives directly inside commercial environments to expose illicit networks that external audits cannot detect.",
    theQuestion: {
      subtitle: "When the problem is hidden on the inside",
      description: "Sophisticated internal theft rings, industrial espionage, drug distribution, and safety violations flourish in blind spots beyond CCTV cameras and management oversight. External audits and interviews often trigger immediate cover-ups.",
      scenarios: [
        "Massive, unexplained inventory shrinkage across manufacturing plants or regional distribution hubs",
        "Internal collusion between warehouse staff, drivers, and external organized criminal receivers",
        "Industrial sabotage, intentional machine damage, or contamination of commercial products",
        "Widespread workplace narcotics distribution affecting industrial safety and corporate liability",
        "Trade secret leakage, customer poaching, and illicit side-businesses operated during company shifts",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Infiltration targets",
      capabilities: [
        { name: "Organized Internal Theft Rings", detail: "Identifying ringleaders, logistical methods, concealed hiding spots, and off-site buyers." },
        { name: "Collusive Supply Chain Leakage", detail: "Documenting unmanifested stock loading, falsified weighbridge tickets, and driver kickbacks." },
        { name: "Health, Safety & Regulatory Violations", detail: "Gathering firsthand evidence of systemic compliance breaches and fraudulent log keeping." },
        { name: "Trade Secret Exfiltration", detail: "Uncovering internal moles copying design schematics, client rosters, and proprietary software." },
      ],
    },
    ourApproach: {
      subtitle: "Controlled operational design",
      stages: [
        { step: "01", title: "Legend Creation & Placement Strategy", description: "Developing an airtight commercial cover identity, employment documentation, and placement channel." },
        { step: "02", title: "Controlled Infiltration", description: "Deploying our operative under deep cover, reporting through an encrypted off-site handler." },
        { step: "03", title: "Intelligence Collection & Verification", description: "Securing audio, visual, and documentary proof while maintaining complete cover separation." },
        { step: "04", title: "Lawful Extraction & Resolution", description: "Safely withdrawing the operative before coordinated management or police interventions." },
      ],
    },
    whatYouReceive: {
      subtitle: "Undercover deliverables",
      items: [
        "Comprehensive Undercover Operational Log documenting daily observations and admissions",
        "Corroborative covert audio and visual recordings documenting illegal transactions",
        "Culpability roster identifying all involved staff, suppliers, and third-party receivers",
        "Action plan for lawful employment dismissals, civil recovery, and police liaison",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Client profiles",
      clientTypes: [
        { title: "Supply Chain & Logistics Directors", description: "Eliminating multi-million pound inventory shrinkage across distribution networks." },
        { title: "Chief Executive Officers & General Counsel", description: "Neutralizing existential internal threats, IP exfiltration, and sabotage." },
        { title: "Manufacturing & Industrial Plant Operators", description: "Restoring operational integrity, safety compliance, and workforce trust." },
      ],
    },
    relatedServices: [
      { title: "Corporate Fraud Investigations", slug: "corporate-fraud-investigations", discipline: "Corporate" },
      { title: "Employee Investigations", slug: "employee-investigations", discipline: "Corporate" },
      { title: "Field Investigations", slug: "field", discipline: "Field" },
      { title: "Evidence Gathering", slug: "evidence-gathering", discipline: "Legal" },
    ],
    faqs: [
      { question: "Is undercover infiltration lawful in the UK workplace?", answer: "Yes, when conducted lawfully with strict oversight to investigate serious criminal offenses, gross misconduct, or substantial financial harm, avoiding any entrapment." },
      { question: "How do you avoid entrapment during an undercover operation?", answer: "Our operatives act purely as passive observers. They never encourage, induce, or facilitate any criminal activity that would not otherwise have occurred spontaneously." },
      { question: "Who within our company needs to know about the operation?", answer: "Only the absolute minimum required executive decision-makers (typically the CEO and General Counsel) to preserve total operational containment." },
    ],
    metaTitle: "Undercover Investigations UK | Workplace Infiltration Specialists",
    metaDescription: "Professional undercover corporate investigations across the UK. Exposing internal theft, supply chain fraud, sabotage, and illicit workplace activities.",
  },

  "insurance-investigations": {
    slug: "insurance-investigations",
    title: "Insurance Fraud Investigations",
    category: "FIELD",
    disciplineNumber: "04",
    heroProposition: "Evidence-led investigation of suspicious claims, exaggerated injuries, and staged losses.",
    summary: "Protecting insurers, syndicates, and self-insured corporate entities against multi-million-pound fraudulent and exaggerated claims.",
    theQuestion: {
      subtitle: "Protecting insurers against fabricated loss",
      description: "Insurance fraud in the UK accounts for billions of pounds in annual losses. In catastrophic personal injury claims, total temporary disability cases, and complex commercial property losses, opportunistic exaggeration and organized fraud are widespread.",
      scenarios: [
        "Claimants asserting catastrophic mobility loss or permanent disability while engaging in strenuous physical activity",
        "Staged commercial fires, deliberate water damage, or orchestrated property damage claims",
        "High-value transit, marine, and cargo losses where declared items were never dispatched",
        "Exaggerated business interruption claims presenting manipulated accounting statements",
        "Organized 'crash-for-cash' syndicates and coordinated staged motor incidents",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Investigative dimensions",
      capabilities: [
        { name: "Activity & Physical Capability Verification", detail: "Lawful covert surveillance documenting true functional physical capacity and mobility." },
        { name: "Circumstance & Locus Inquiries", detail: "Reconstructing accident scenes, vehicle trajectories, weather conditions, and visibility." },
        { name: "Financial & Background Profiling", detail: "Investigating claimant indebtedness, previous insurance claims, and concealed business activities." },
        { name: "Secondary Commercial Employment", detail: "Uncovering undeclared employment and physical labor during periods of declared total incapacity." },
      ],
    },
    ourApproach: {
      subtitle: "Fraud deconstruction protocol",
      stages: [
        { step: "01", title: "Claim File & Medical Analysis", description: "Benchmarking declared medical restrictions and expert reports against investigative parameters." },
        { step: "02", title: "Desktop Intelligence & Social OSINT", description: "Extracting social media footprints, sporting participation, and commercial listings." },
        { step: "03", title: "Targeted Field Surveillance", description: "Deploying multi-day covert observation across routine domestic, leisure, and commercial activities." },
        { step: "04", title: "Evidentiary Claims Pack", description: "Delivering a comprehensive report ready for the Insurance Fraud Enforcement Department (IFED) and Section 57 applications." },
      ],
    },
    whatYouReceive: {
      subtitle: "Claims defense deliverable",
      items: [
        "Comprehensive Claims Investigation Dossier detailing inconsistencies between medical claims and physical reality",
        "High-definition video surveillance footage showing unrestricted physical capabilities and movements",
        "Certified Investigator Witness Statement ready for High Court strike-out hearings (Section 57 CJCA 2015)",
        "Social media and OSINT digital evidence exhibit pack",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Instructing insurers",
      clientTypes: [
        { title: "Special Investigation Units (SIU)", description: "Major UK and international composite insurance underwriters." },
        { title: "Lloyd's Syndicates & Reinsurers", description: "Investigating high-exposure marine, aviation, and specialty risk losses." },
        { title: "Defendant Insurance Litigators", description: "Supplying Section 57 fundamental dishonesty evidence to strike out fraudulent claims." },
      ],
    },
    relatedServices: [
      { title: "Covert Surveillance", slug: "covert-surveillance", discipline: "Field" },
      { title: "Private Surveillance", slug: "private-surveillance", discipline: "Field" },
      { title: "Field Investigations", slug: "field", discipline: "Field" },
      { title: "Corporate Fraud Investigations", slug: "corporate-fraud-investigations", discipline: "Corporate" },
    ],
    faqs: [
      { question: "Can surveillance evidence support a Section 57 'Fundamental Dishonesty' ruling?", answer: "Yes. Our surveillance files are prepared specifically to satisfy Section 57 of the Criminal Justice and Courts Act 2015, enabling courts to dismiss claims entirely." },
      { question: "How do you ensure surveillance doesn't breach the claimant's Article 8 privacy rights?", answer: "Operations are strictly confined to public areas or visible exteriors without trespass, governed by an ironclad Legitimate Interests Assessment." },
      { question: "Do your operatives testify in court?", answer: "Yes, our operatives regularly provide witness testimony in High Court and County Court hearings, defending their methodologies under cross-examination." },
    ],
    metaTitle: "Insurance Fraud Investigations UK | Surveillance for Insurers London",
    metaDescription: "Evidence-led insurance fraud investigations for UK insurers, syndicates, and solicitors. Exposing fundamental dishonesty, exaggerated personal injury, and staged loss.",
  },

  "fraud-investigations": {
    slug: "fraud-investigations",
    title: "Financial & Fraud Investigations",
    category: "CORPORATE",
    disciplineNumber: "01",
    heroProposition: "Comprehensive multi-jurisdictional investigation of financial crime, investment schemes, and civil deceit.",
    summary: "Reconstructing fraudulent schemes, unmasking key perpetrators, and tracing diverted capital across borders for asset recovery.",
    theQuestion: {
      subtitle: "Unmasking sophisticated financial deception",
      description: "Financial fraud is inherently predatory, layered across shell companies, false prospectuses, and complex banking architectures. Victims face devastating financial losses, while law enforcement agencies are often overwhelmed and unable to prioritize civil recovery.",
      scenarios: [
        "High-net-worth investors falling victim to sophisticated pre-IPO, cryptocurrency, or property investment scams",
        "Commercial partners fabricating financial health, assets, or trading history to secure significant loans",
        "Directors executing unlawful dividend stripping and asset diversion prior to planned corporate administration",
        "Cross-border civil conspiracy to defraud involving escrow fraud and fraudulent letters of credit",
      ],
    },
    whatWeInvestigate: {
      subtitle: "Fraud categories",
      capabilities: [
        { name: "Investment & Securities Fraud", detail: "Exposing boiler rooms, phantom funds, unregulated schemes, and fabricated yields." },
        { name: "Corporate Loan & Credit Fraud", detail: "Investigating falsified balance sheets, fraudulent collateral, and bogus personal guarantees." },
        { name: "Asset Stripping & Insolvency Fraud", detail: "Uncovering antecedent transactions, undervalue transfers, and phoenix company formations." },
        { name: "Complex Civil Deceit & Conspiracy", detail: "Unravelling conspiracies between multiple actors executing deceptive commercial transactions." },
      ],
    },
    ourApproach: {
      subtitle: "Forensic roadmap",
      stages: [
        { step: "01", title: "Scheme Anatomy Deconstruction", description: "Reviewing contracts, banking flows, prospectuses, and representations to map the deception." },
        { step: "02", title: "Target & Asset Tracing", description: "Locating the principal fraudsters, unmasking alias identities, and identifying recipient entities." },
        { step: "03", title: "Field Corroboration", description: "Inspecting purported assets, development sites, and overseas corporate addresses." },
        { step: "04", title: "Recovery Brief Assembly", description: "Delivering an actionable evidence brief for freezing injunctions and asset recovery litigation." },
      ],
    },
    whatYouReceive: {
      subtitle: "Fraud investigation pack",
      items: [
        "Exhaustive Financial Crime Dossier setting out the mechanics, chronology, and key conspirators",
        "Trace schedule of stolen funds and identified counterpart real estate or bank holdings",
        "Admissible evidence dossier ready for High Court proceedings or criminal prosecution referrals",
        "Strategic advice on recovery enforcement channels across multiple jurisdictions",
      ],
    },
    whoWeWorkWith: {
      subtitle: "Clients",
      clientTypes: [
        { title: "Victims of High-Value Financial Crime", description: "Providing rapid investigative response to locate perpetrators and recover funds." },
        { title: "Civil Fraud & Asset Recovery Litigators", description: "Supplying urgent evidentiary foundations for freezing and proprietary injunctions." },
        { title: "Family Offices & Institutional Investors", description: "Investigating suspicious investment vehicles and mitigating potential exposures." },
      ],
    },
    relatedServices: [
      { title: "Corporate Fraud Investigations", slug: "corporate-fraud-investigations", discipline: "Corporate" },
      { title: "Asset Tracing", slug: "asset-tracing", discipline: "Intelligence" },
      { title: "Litigation Support", slug: "litigation-support", discipline: "Legal" },
      { title: "Digital Investigations", slug: "digital-investigations", discipline: "Intelligence" },
    ],
    faqs: [
      { question: "Can private investigators recover stolen funds directly?", answer: "Investigators do not seize funds directly. We locate the assets, unmask the fraudsters, and provide the unassailable evidence that enables solicitors to obtain Freezing Orders and enforcement judgments." },
      { question: "What should I do immediately after discovering a major fraud?", answer: "Preserve all communications, transaction slips, and emails. Engage specialized investigators and legal counsel immediately before funds are transferred to uncooperative jurisdictions." },
      { question: "Can you coordinate with law enforcement (Action Fraud, Serious Fraud Office)?", answer: "Yes, we regularly assemble formal prosecution evidentiary files that can be submitted directly to the SFO, City of London Police, or National Crime Agency." },
    ],
    metaTitle: "Financial & Fraud Investigations UK | Private Intelligence Firm",
    metaDescription: "Specialist financial and fraud investigations in London. Unmasking investment scams, asset stripping, civil deceit, and international financial crime.",
  },
};
