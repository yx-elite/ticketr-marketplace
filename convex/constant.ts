import { Doc } from "./_generated/dataModel";

// Time constants in milliseconds
export const DURATIONS = {
  TICKET_OFFER: 30 * 60 * 1000, // 30 minutes (Minimum Stripe checkout expiry)
} as const;

// Status type for better type safety
export const WAITING_LIST_STATUS: Record<string, Doc<"waitingList">["status"]> = {
  WAITING: "waiting",
  OFFERED: "offered",
  PURCHASED: "purchased",
  EXPIRED: "expired",
} as const;

export const TICKET_STATUS: Record<string, Doc<"tickets">["status"]> = {
  VALID: "valid",
  USED: "used",
  REFUNDED: "refunded",
  CANCELLED: "cancelled",
} as const;
