import { z } from "zod";

export const UserRoles = ["ADMIN", "SUPPLIER", "MERCHANT"] as const;
export const UserRole = z.enum(UserRoles);

export const StockTypes = ["UNIPIN_VOUCHER", "UNIPIN_GIFT_CARD"] as const;
export const StockType = z.enum(StockTypes);

export const SupportedGames = [
  "FREE_FIRE",
  "FREE_FIRE_SHELL",
  "FREE_FIRE_SG",
  "FREE_FIRE_ID",
] as const;
export const SupportedGame = z.enum(SupportedGames);

export const SupportedRegions = ["MY", "SG", "ID"] as const;
export const SupportedRegion = z.enum(SupportedRegions);
