export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  clientSector: string;
  discipline: "CORPORATE" | "INTELLIGENCE" | "LEGAL" | "FIELD";
  question: string;
  investigation: string;
  methodology: string[];
  findings: string;
  outcome: string;
  relatedServiceSlug: string;
}

export const casesData: CaseStudy[] = [
  {
    id: "case-001",
    number: "CASE 001",
    title: "COUNTERPARTY DUE DILIGENCE & FOUNDER INTEGRITY",
    clientSector: "Private Equity Sponsor (£85M Acquisition)",
    discipline: "CORPORATE",
    question: "What were we actually dealing with behind the polished pitch book?",
    investigation: "Multi-jurisdictional integrity assessment of founders and beneficial shareholders across the UK, Cyprus, and the UAE ahead of final binding bids.",
    methodology: [
      "Corporate intelligence & beneficial ownership deconstruction",
      "Offshore registry interrogation across 4 tax havens",
      "OSINT digital infrastructure analysis",
      "Discreet human source inquiries with former commercial partners",
    ],
    findings: "Uncovered that the principal founder was the subject of undisclosed criminal insolvency proceedings in Southern Europe under an alternate passport spelling, with £14M in unresolved liability claims.",
    outcome: "Client renegotiated structural warranties and successfully reduced purchase consideration by £12.5M, preventing severe post-acquisition liability and reputational catastrophe.",
    relatedServiceSlug: "due-diligence",
  },
  {
    id: "case-002",
    number: "CASE 002",
    title: "CROSS-BORDER ASSET DIVERSIFICATION & JUDGMENT ENFORCEMENT",
    clientSector: "International Commercial Litigators (£22M High Court Award)",
    discipline: "LEGAL",
    question: "Did the judgment debtor possess realisable assets despite declaring personal bankruptcy?",
    investigation: "Global asset tracing investigation targeting an evasive high-net-worth debtor operating through complex nominee arrangements and offshore trusts.",
    methodology: [
      "Cross-border land registry and corporate filing correlation",
      "Aviation and maritime asset tracking",
      "Discreet physical surveillance across Mayfair and Monaco",
      "CPR Part 31 disclosure documentation assembly",
    ],
    findings: "Identified that the debtor retained beneficial control over a £6.8M Knightsbridge residential townhouse held through a BVI company, a 34-metre luxury motor yacht berthed in Antibes, and substantial undisclosed equity in a private Swiss logistics group.",
    outcome: "High Court granted Worldwide Freezing Orders and appointed receivers by way of equitable execution, resulting in 100% financial recovery plus full indemnity costs within 90 days.",
    relatedServiceSlug: "asset-tracing",
  },
  {
    id: "case-003",
    number: "CASE 003",
    title: "INTERNAL PROCUREMENT COLLUSION & SYSTEMIC THEFT",
    clientSector: "FTSE 250 Infrastructure & Engineering Group",
    discipline: "CORPORATE",
    question: "Why was a regional division consistently experiencing massive supply chain margin collapse?",
    investigation: "Complex corporate fraud inquiry examining five years of sub-contractor procurement data, vendor relationships, and on-site material dispatch logs.",
    methodology: [
      "Digital forensic examination of server and communication logs",
      "Forensic accounting and vendor billing discrepancy analysis",
      "Covert static observation of industrial transport hubs",
      "Whistleblower cognitive interviews",
    ],
    findings: "Proved that the senior regional procurement head had co-founded a series of ghost supplier companies with his brother-in-law, processing over £4.2M in fraudulent invoices for unsupplied raw aggregates.",
    outcome: "Immediate summary dismissal for gross misconduct, emergency ex-parte freezing injunction obtained over the perpetrators' domestic real estate portfolio, and full referral to City of London Police.",
    relatedServiceSlug: "corporate-fraud-investigations",
  },
  {
    id: "case-004",
    number: "CASE 004",
    title: "CATASTROPHIC PERSONAL INJURY CLAIMS EXPOSURE",
    clientSector: "Lloyd's of London Underwriting Syndicate",
    discipline: "FIELD",
    question: "Was the claimant's declared total quadriplegia and lifetime nursing requirement authentic?",
    investigation: "Lawful, highly proportionate multi-week covert field observation and digital intelligence audit of a £9.4M spinal injury claim.",
    methodology: [
      "Digital footprint analysis and geolocation telemetry",
      "Multi-operative covert mobile and static surveillance",
      "High-definition optical evidence capture",
      "Section 57 Criminal Justice and Courts Act witness preparation",
    ],
    findings: "Documented the claimant driving unaccompanied, carrying heavy construction materials, and actively managing a commercial landscaping firm without mobility assistance across six consecutive surveillance days.",
    outcome: "High Court dismissed the entire £9.4M claim on the grounds of Section 57 'Fundamental Dishonesty' and ordered the claimant to pay the insurer's full defense costs of £340,000.",
    relatedServiceSlug: "insurance-investigations",
  },
];
