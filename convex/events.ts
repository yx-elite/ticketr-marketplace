import { query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { TICKET_STATUS, WAITING_LIST_STATUS } from "./constant";

export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("isCancelled"), undefined))
      .collect();
  },
});

export const getEventById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.eventId);
  },
});

export const getEventAvailability = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new ConvexError("Event not found");
    }

    // Get total tickets sold
    const purchasedCount = await ctx.db
      .query("tickets")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect()
      .then(
        (tickets) => tickets.filter(
          (ticket) => 
            ticket.status === TICKET_STATUS.VALID ||
            ticket.status === TICKET_STATUS.USED
        ).length
      );
    
    // Count current valid offers
    const now = Date.now();
    const activeOffers = await ctx.db
      .query("waitingList")
      .withIndex("by_event_status", (q) => 
        q.eq("eventId", args.eventId).eq("status", WAITING_LIST_STATUS.OFFERED))
      .collect()
      .then(
        (entries) => entries.filter(
          (entry) => entry.offerExpiresAt ?? 0 > now
        ).length
      );
    
    // Calculate total reserved tickets
    const totalReserved = purchasedCount + activeOffers;

    return {
      isSoldOut: totalReserved >= event.totalTickets,
      totalTickets: event.totalTickets,
      purchasedCount,
      activeOffers,
      remainingTickets: Math.max(0, event.totalTickets - totalReserved),
    };
  },
});
