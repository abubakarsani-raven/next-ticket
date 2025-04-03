import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { userId, name, email }) => {
    //  if user exist
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name,
        email,
      });
      return existingUser?._id;
    }

    const newUserId = await ctx.db.insert("users", {
      name,
      email,
      userId,
      stripeConnectId: undefined,
    });
    return newUserId;
  },
  
});
