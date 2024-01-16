import { z } from "zod";

export const UserRoles = ["ADMIN", "SUPPLIER", "MERCHANT"] as const;
export const UserRole = z.enum(UserRoles);

export const StockTypes = ["UNIPIN_VOUCHER", "UNIPIN_GIFT_CARD"] as const;
export const StockType = z.enum(StockTypes);

export const SupportedGames = ["FREE_FIRE"] as const;
export const SupportedGame = z.enum(SupportedGames);
