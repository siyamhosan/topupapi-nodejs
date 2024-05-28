import { z } from "zod";

export type ShardHealth = {
  name: string;
  ip: string;
  latency: number;
  requests: number;
  ruiningRequests: number;
  pending: number;
  success: number;
  error: number;
  blocked: boolean;
};

export const ShardHealth = z.object({
  name: z.string(),
  ip: z.string(),
  latency: z.number(),
  requests: z.number(),
  ruiningRequests: z.number(),
  pending: z.number(),
  success: z.number(),
  error: z.number(),
  blocked: z.boolean(),
});
