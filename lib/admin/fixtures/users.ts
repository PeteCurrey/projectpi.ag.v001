// ============================================================
// USER FIXTURES
// Typed placeholder data — replace with DB queries in production.
// ============================================================

import type { User } from "@/lib/db/types";

export const FIXTURE_USERS: User[] = [
  {
    id: "usr-001",
    email: "d.mercer@tfts.co.uk",
    name: "David Mercer",
    telephone: "+44 20 7946 0100",
    role: "ADMIN",
    status: "ACTIVE",
    mfa_enabled: true,
    last_login_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    created_at: "2024-01-01T09:00:00.000Z",
    updated_at: "2025-10-06T08:00:00.000Z",
  },
  {
    id: "usr-002",
    email: "s.chen@tfts.co.uk",
    name: "Sarah Chen",
    telephone: "+44 20 7946 0101",
    role: "INVESTIGATOR",
    status: "ACTIVE",
    mfa_enabled: true,
    last_login_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    created_at: "2024-03-15T09:00:00.000Z",
    updated_at: "2025-10-06T09:15:00.000Z",
  },
  {
    id: "usr-003",
    email: "j.whitfield@tfts.co.uk",
    name: "James Whitfield",
    role: "INVESTIGATOR",
    status: "ACTIVE",
    mfa_enabled: true,
    last_login_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    created_at: "2024-06-01T09:00:00.000Z",
    updated_at: "2025-10-05T17:30:00.000Z",
  },
  {
    id: "usr-004",
    email: "e.preston@tfts.co.uk",
    name: "Emma Preston",
    role: "CASE_MANAGER",
    status: "ACTIVE",
    mfa_enabled: true,
    last_login_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    created_at: "2024-09-01T09:00:00.000Z",
    updated_at: "2025-10-06T08:45:00.000Z",
  },
  {
    id: "usr-005",
    email: "t.hardy@tfts.co.uk",
    name: "Thomas Hardy",
    role: "INVESTIGATOR",
    status: "ACTIVE",
    mfa_enabled: false,
    last_login_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    created_at: "2025-01-15T09:00:00.000Z",
    updated_at: "2025-10-05T16:00:00.000Z",
  },
];

export function getUserById(id: string): User | undefined {
  return FIXTURE_USERS.find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return FIXTURE_USERS.find((u) => u.email === email);
}
