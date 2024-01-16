require("dotenv").config();
import { BaseClientConfig } from "./api/baseUrl";
import {
  EventMap,
  EventTypes,
  ProfileCreatedEvent,
  ProfileUpdatedEvent,
  VouchCreatedEvent,
  VouchUpdatedEvent,
} from "./api/events";
import {
  ProfileInsertSchema,
  ProfileSelectSchema,
  ProfileStatusSchema,
  RoleSchema,
  VouchActivitySchema,
  VouchInsertSchema,
  VouchSelectSchema,
  VouchStatusSchema,
} from "./api/schema";

import { VouchClient } from "./client/VouchClient";

import { BaseManager } from "./managers/BaseManager";
import { VouchManager } from "./managers/VouchManager";
import { ProfileManager } from "./managers/ProfileManager";

import { Profile } from "./structure/Profile";
import { Vouch } from "./structure/Vouch";

import type {
  ProfileFetchOptions,
  ProfileRegister,
  ProfilesFetchOptions,
} from "./types";

export {
  BaseClientConfig,
  EventMap,
  EventTypes,
  ProfileCreatedEvent,
  ProfileUpdatedEvent,
  VouchCreatedEvent,
  VouchUpdatedEvent,
  VouchClient,
  BaseManager,
  VouchManager,
  ProfileManager,
  Profile,
  Vouch,
  ProfileFetchOptions,
  ProfileRegister,
  ProfilesFetchOptions,
  ProfileInsertSchema,
  ProfileSelectSchema,
  ProfileStatusSchema,
  RoleSchema,
  VouchActivitySchema,
  VouchInsertSchema,
  VouchSelectSchema,
  VouchStatusSchema,
};
export default VouchClient;
