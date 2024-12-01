import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { WAITING_LIST_STATUS } from "./constant";


export const getQueuePosition = query({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Get entry for the specific user and event combination
    const entry = await ctx.db
      .query("waitingList")
      .withIndex("by_user_event", (q) => q.eq("userId", args.userId).eq("eventId", args.eventId))
      .filter((q) => q.eq(q.field("status"), WAITING_LIST_STATUS.WAITING))
      .first();

    if (!entry) return null;

    // Get total number of people in the queue
    const peopleAhead = await ctx.db
      .query("waitingList")
      .withIndex("by_event_status", (q) => q.eq("eventId", args.eventId))
      .filter((q) =>
        q.and(
          // Created before the current user
          q.lt(q.field("_creationTime"), entry._creationTime),
          // Status is either waiting or offered
          q.or(
            q.eq(q.field("status"), WAITING_LIST_STATUS.WAITING),
            q.eq(q.field("status"), WAITING_LIST_STATUS.OFFERED)
          )
        )
      )
      .collect()
      .then((entries) => entries.length);

    return {
      ...entry,
      position: peopleAhead + 1,
    };
  },
});
