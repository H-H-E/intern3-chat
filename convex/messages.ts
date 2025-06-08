import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { MessagePart } from "./schema/parts";
import type { Id } from "./_generated/dataModel";

export const getMessagesByThreadId = internalQuery({
  args: { threadId: v.id("threads") },
  handler: async ({ db }, { threadId }) => {
    return await db
      .query("messages")
      .withIndex("byThreadId", (q) => q.eq("threadId", threadId))
      .order("desc")
      .collect();
  },
});

export const patchMessage = internalMutation({
  args: {
    threadId: v.id("threads"),
    messageId: v.string(),
    parts: v.array(MessagePart),
    metadata: v.optional(
      v.object({
        modelId: v.optional(v.string()),
        promptTokens: v.optional(v.number()),
        completionTokens: v.optional(v.number()),
        serverDurationMs: v.optional(v.number()),
      })
    ),
  },
  handler: async ({ db }, { threadId, messageId, parts, metadata }) => {
    const msgs = await db
      .query("messages")
      .withIndex("byMessageId", (q) => q.eq("messageId", messageId))
      .collect();
    const msg = msgs[0];
    if (!msg) return;

    await db.patch(msg._id as Id<"messages">, {
      parts,
      metadata: {
        ...msg.metadata,
        ...metadata,
      },
      updatedAt: Date.now(),
    });

    return { success: true, _id: msg._id };
  },
});
