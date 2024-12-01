import { query, mutation } from "./_generated/server";
import { v } from "convex/values";


export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();
    
    // Update existing user if user exists
    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        imageUrl: args.imageUrl,
        email: args.email,
      });
      return existingUser._id;
    }

    // Create new user if user does not exist
    const newUserId = await ctx.db.insert("users", {
      userId: args.userId,
      name: args.name,
      imageUrl: args.imageUrl,
      email: args.email,
    });
    return newUserId;
  },
});

export const getUserByClerkId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();
    return user;
  },
});
