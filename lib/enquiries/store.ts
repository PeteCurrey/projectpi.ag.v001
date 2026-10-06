// ============================================================
// ENQUIRY STORE — Shared in-memory store
// Used by the public enquiry API route and admin fixtures.
// TODO: Replace with DB in production.
// ============================================================

export interface StoredEnquiry {
  id: string;
  reference: string;
  submittedAt: string;
  status: string;
  urgency: string;
  matterType: string;
  documentType?: string;
  narrative: string;
  professionalClientType: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  organisationName?: string;
  location?: string;
}

const _enquiriesStore: StoredEnquiry[] = [];

export function getStoredEnquiries(): Readonly<StoredEnquiry[]> {
  return _enquiriesStore;
}

export function addStoredEnquiry(enquiry: StoredEnquiry): void {
  _enquiriesStore.push(enquiry);
}
