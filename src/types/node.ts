import { boolean, number, object, string } from "zod";

export const Node = object({
  id: number(),
  endPoint: string(),
  connectionToken: string(),
  createdAt: string(),
});

export const NodeAddDto = object({
  endPoint: string().ip(),
  connectionToken: string(),
});

export const ShardConfigDto = object({
  flowGate: boolean(),
  flowGateMode: string().refine((v) => v && ["LIMIT", "FLOW"].includes(v)),
  flowGateLimit: number(),
  flowGateRate: number(), // a percentage
  flowForceLimit: boolean(),
  newShard: boolean(),
  titanic_system: boolean(),
  solve_captcha: boolean(),
  login_system_2: boolean(),
  login_1_as_backup: boolean(),
});

export const PartialShardConfigDto = ShardConfigDto.partial();
