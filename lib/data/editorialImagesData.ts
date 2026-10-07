// ============================================================================
// TFTS — EDITORIAL CURATED ARCHITECTURAL IMAGERY SPECIFICATION
// Tactical Field Intelligence Service | https://tfts.co.uk
// ============================================================================
// Curated photographic, architectural, contemporary UK/European imagery
// Strictly avoiding: trench coats, handcuffs, magnifying glasses, fake CCTV,
// hacker hoodies, glowing green code, stock detective cliches.
// ============================================================================

export interface EditorialImageItem {
  src: string;
  alt: string;
  caption: string;
}

export interface ServiceEditorialImages {
  hero: EditorialImageItem;
  secondary: EditorialImageItem;
  tertiary?: EditorialImageItem;
}

export const EDITORIAL_SERVICE_IMAGES: Record<string, ServiceEditorialImages> = {
  // ──────────────────────────────────────────────────────────────────────────
  // INVESTIGATIONS CLUSTER
  // ──────────────────────────────────────────────────────────────────────────
  "corporate-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
      alt: "Monolithic London financial district architecture in steel and stone",
      caption: "City of London commercial perimeter",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85",
      alt: "Quiet contemporary corporate interior with clean geometric lines",
      caption: "Corporate governance and internal review suite",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=2400&q=85",
      alt: "London stone facade and clean vertical architectural perspective",
      caption: "Independent fact-finding and evidence assembly",
    },
  },

  "corporate-fraud-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85",
      alt: "Clean boardroom table with structured financial review documents",
      caption: "Forensic examination of corporate accounting records",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
      alt: "Glass and steel headquarters tower in morning overcast light",
      caption: "Commercial supply chain scrutiny and vendor auditing",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Archival documentary dossiers in quiet neutral tones",
      caption: "Evidence preservation and exhibit formatting",
    },
  },

  "fraud-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2400&q=85",
      alt: "City of London financial institution architectural entrance",
      caption: "Financial crime investigation perimeter",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85",
      alt: "Structured financial audit documents in natural morning light",
      caption: "Analysis of transactional flows and counterparty representations",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=85",
      alt: "London cityscape along the River Thames",
      caption: "Cross-jurisdictional capital tracing",
    },
  },

  "employee-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=85",
      alt: "Discreet modern workplace interior with clean glass partitions",
      caption: "Workplace integrity and internal inquiry environment",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=2400&q=85",
      alt: "Quiet consultation room with minimal architectural styling",
      caption: "Neutral cognitive interviewing and statement formulation",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85",
      alt: "London commercial building exterior at dusk",
      caption: "Restrictive covenant and non-compete breach verification",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // INTELLIGENCE CLUSTER
  // ──────────────────────────────────────────────────────────────────────────
  intelligence: {
    hero: {
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=85",
      alt: "Panoramic London cityscape showing institutional and financial architecture",
      caption: "Strategic intelligence overview, London metropolitan area",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85",
      alt: "Abstract digital networks and geometric infrastructure",
      caption: "Open-source data aggregation and multi-vector cross-referencing",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2400&q=85",
      alt: "Secure server architecture in controlled climate facility",
      caption: "Data security and verification protocols",
    },
  },

  "osint-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85",
      alt: "Global network geometry and connectivity architecture",
      caption: "Open source intelligence gathering and registry mapping",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
      alt: "High-rise corporate glass facade with reflective geometric panels",
      caption: "Corporate registry and beneficial ownership correlation",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Structured documentary evidence in clean layout",
      caption: "Archival internet records and historical digital footprints",
    },
  },

  "digital-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2400&q=85",
      alt: "Secure server room with orderly geometric racks",
      caption: "Digital forensics and electronic evidence environment",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85",
      alt: "Clean network topography visual",
      caption: "Communication attribution and digital pathway tracing",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Archival exhibit documentation in neutral tone",
      caption: "Cryptographic hashing and chain of custody documentation",
    },
  },

  "background-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2400&q=85",
      alt: "Executive workspace interior with neutral stone and wood finishes",
      caption: "Executive vetting and integrity verification suite",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Civil registry records and legal documents",
      caption: "Court civil litigation registry and regulatory checks",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=2400&q=85",
      alt: "London classical colonnade in morning light",
      caption: "Governance history and professional track record auditing",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // TRACING CLUSTER
  // ──────────────────────────────────────────────────────────────────────────
  "people-tracing": {
    hero: {
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85",
      alt: "London street at dusk with ambient street lamp illumination",
      caption: "Subject location and address verification perimeter",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=85",
      alt: "London metropolitan transit and infrastructure vista",
      caption: "Cross-referenced electoral, property, and civil databases",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Physical documents and trace reports",
      caption: "Verified current residential address confirmations",
    },
  },

  "asset-tracing": {
    hero: {
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=85",
      alt: "Canary Wharf commercial and banking district skyline along the water",
      caption: "Commercial asset tracing and entity mapping",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
      alt: "High-rise institutional banking architecture",
      caption: "Real estate and commercial holding identification",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Land registry filings and corporate share registers",
      caption: "Asset schedules prepared for CPR Part 25 freezing applications",
    },
  },

  "due-diligence": {
    hero: {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
      alt: "Modern headquarters building in London business district",
      caption: "Pre-transaction integrity and counterparty scrutiny",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85",
      alt: "Corporate diligence files on conference table",
      caption: "Beneficial ownership, undisclosed liabilities, and adverse findings",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85",
      alt: "Clean executive boardroom interior",
      caption: "Material commercial risk intelligence for investment decisions",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // FIELD OPERATIONS CLUSTER
  // ──────────────────────────────────────────────────────────────────────────
  "private-surveillance": {
    hero: {
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85",
      alt: "Quiet London street at twilight with ambient architecture",
      caption: "Mobile field surveillance deployment, London area",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=2400&q=85",
      alt: "Urban street at dawn with clean morning atmosphere",
      caption: "Discreet multi-unit vehicular and foot observation",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=2400&q=85",
      alt: "London architectural colonnade and perspective",
      caption: "Contemporaneous logging and optical evidence capture",
    },
  },

  "covert-surveillance": {
    hero: {
      src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=2400&q=85",
      alt: "Sparse urban street at dawn, mist between buildings",
      caption: "Specialist covert deployment, low-footprint urban terrain",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85",
      alt: "London evening road intersection with natural lighting",
      caption: "Multi-vehicle handoff and stand-off distance observation",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2400&q=85",
      alt: "Industrial facility perimeter lines",
      caption: "Long-range optical systems in complex operating environments",
    },
  },

  "undercover-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2400&q=85",
      alt: "Industrial warehouse interior with high racking and natural light",
      caption: "Internal operational and supply chain perimeter",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=2400&q=85",
      alt: "Commercial logistics route in morning light",
      caption: "Supply chain shrinkage and collusive network exposure",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=85",
      alt: "Commercial workspace interior",
      caption: "Controlled human intelligence collection under strict legal oversight",
    },
  },

  "insurance-investigations": {
    hero: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=85",
      alt: "Claims documentation review suite in neutral tones",
      caption: "Insurance fraud and claim file analysis",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85",
      alt: "Street environment in London residential district",
      caption: "Physical capability verification and activity documentation",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=85",
      alt: "Royal Courts of Justice facade",
      caption: "Evidence files structured for Section 57 fundamental dishonesty applications",
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LEGAL & EVIDENCE CLUSTER
  // ──────────────────────────────────────────────────────────────────────────
  "litigation-support": {
    hero: {
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=85",
      alt: "Marble columns and facade of the Royal Courts of Justice, Strand, London",
      caption: "The Royal Courts of Justice, Strand, London",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Litigation case files and indexed documentation",
      caption: "Pleadings analysis and evidential void identification",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=2400&q=85",
      alt: "Historic legal quarter architectural colonnade",
      caption: "Witness proofs of evidence and trial bundle exhibits",
    },
  },

  "evidence-gathering": {
    hero: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Archival evidence files and clean indexed documentation",
      caption: "Evidence classification and chain of custody management",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=85",
      alt: "Royal Courts of Justice entrance columns",
      caption: "Physical, digital, and documentary proof procurement",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=2400&q=85",
      alt: "Contemporary architectural glass detail",
      caption: "Forensic authentication and exhibit scheduling",
    },
  },

  "witness-enquiries": {
    hero: {
      src: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?auto=format&fit=crop&w=2400&q=85",
      alt: "Quiet meeting interior with minimal design and natural window light",
      caption: "Witness engagement and cognitive interviewing suite",
    },
    secondary: {
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=85",
      alt: "London legal precinct architecture",
      caption: "CPR Part 32 witness statement drafting and Statement of Truth execution",
    },
    tertiary: {
      src: "https://images.unsplash.com/photo-1568667256549-094345857b23?auto=format&fit=crop&w=2400&q=85",
      alt: "Archival legal papers and witness proofs",
      caption: "Credibility assessment and trial cross-examination vulnerability auditing",
    },
  },
};
