import { VouchClient } from "../client/VouchClient";

export const BaseClientConfig = (vouchClient: VouchClient) => {
  return {
    baseUrl: process.env.VOUCH_HOST || "http://localhost:8080/",
    baseHeaders: {
      "x-client-secret": process.env.VOUCH_SECRET || "",
      "x-client-key": process.env.VOUCH_KEY || "",
    },
  };
};
