// ============================================================================
// VERIFIED FIRM CREDENTIALS REGISTRY
// Single Source of Truth for Compliance, Insurance, and Regulatory Claims
// ============================================================================

export type CredentialVerificationStatus = "VERIFIED" | "PENDING_VERIFICATION" | "NOT_ACTIVE";

export interface FirmCredential {
  id: string;
  claim: string;
  shortLabel: string;
  category: "REGULATORY" | "INSURANCE" | "STANDARDS" | "LEGAL";
  status: CredentialVerificationStatus;
  verificationAuthority?: string;
  referenceNumber?: string;
  publicDisplay: boolean;
  notes: string;
}

export const FIRM_CREDENTIALS: Record<string, FirmCredential> = {
  ICO_REGISTRATION: {
    id: "ICO_REGISTRATION",
    claim: "Registered Data Controller under Data Protection Act 2018",
    shortLabel: "ICO REGISTERED · DPA 2018",
    category: "REGULATORY",
    status: "VERIFIED",
    verificationAuthority: "Information Commissioner's Office (ICO)",
    publicDisplay: true,
    notes: "Mandatory compliance for lawful processing under UK GDPR / DPA 2018.",
  },
  CPR_COMPLIANCE: {
    id: "CPR_COMPLIANCE",
    claim: "Civil Procedure Rules (CPR) Part 6 and Part 31 Compliant Evidence",
    shortLabel: "CPR PART 6 & 31 COMPLIANT",
    category: "LEGAL",
    status: "VERIFIED",
    verificationAuthority: "Civil Courts Practice Standards",
    publicDisplay: true,
    notes: "Procedural integrity for evidence, disclosure, and process serving in civil courts.",
  },
  PROFESSIONAL_INDEMNITY: {
    id: "PROFESSIONAL_INDEMNITY",
    claim: "Comprehensive Professional Indemnity Coverage",
    shortLabel: "PROFESSIONAL INDEMNITY INSURED",
    category: "INSURANCE",
    status: "VERIFIED",
    verificationAuthority: "Authorised UK Insurer",
    publicDisplay: true,
    notes: "Dedicated insurance for corporate investigations and litigation support.",
  },
  SPECIFIC_5M_COVER: {
    id: "SPECIFIC_5M_COVER",
    claim: "£5,000,000 Dedicated Professional Indemnity Cover",
    shortLabel: "£5,000,000 INDEMNITY COVER",
    category: "INSURANCE",
    status: "PENDING_VERIFICATION", // Marked pending until certificate of insurance verified on file
    verificationAuthority: "UK Underwriter",
    publicDisplay: false, // DO NOT render publicly until verified
    notes: "Specific £5M tier is pending policy schedule audit; generic cover displayed instead.",
  },
  BS_102000_STANDARD: {
    id: "BS_102000_STANDARD",
    claim: "Code of practice for the provision of investigative services (BS 102000)",
    shortLabel: "BS 102000 BENCHMARK",
    category: "STANDARDS",
    status: "VERIFIED",
    verificationAuthority: "British Standards Institution Standard Principles",
    publicDisplay: true,
    notes: "Operational adherence to BS 102000 guidelines for evidence continuity.",
  },
  RIPA_COMPLIANCE: {
    id: "RIPA_COMPLIANCE",
    claim: "Regulation of Investigatory Powers Act 2000 Proportionality Standards",
    shortLabel: "RIPA PROPORTIONALITY STANDARD",
    category: "LEGAL",
    status: "VERIFIED",
    verificationAuthority: "Statutory Framework",
    publicDisplay: true,
    notes: "Strict human rights and proportionality testing for all observation.",
  },
};

/**
 * Filter and return only claims with status === 'VERIFIED' and publicDisplay === true
 */
export function getVerifiedCredentials(): FirmCredential[] {
  return Object.values(FIRM_CREDENTIALS).filter(
    (c) => c.status === "VERIFIED" && c.publicDisplay
  );
}

/**
 * Safe privilege description guidelines
 */
export const PRIVILEGE_GUIDELINES = {
  generalPublicNotice:
    "Confidential initial enquiries are handled with strict professional discretion and data protection controls under the DPA 2018. Legal Professional Privilege arises where instructions are specifically commissioned by solicitors for the dominant purpose of pending or contemplated litigation.",
  enquiryNotice:
    "Communications are treated in strict confidence. Formal Legal Professional Privilege applies when instructed directly by legal counsel in connection with legal advice or litigation.",
};
