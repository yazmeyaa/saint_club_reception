import { config } from "dotenv";

config();

const requiredEnvVariables = ["TELEGRAM_BOT_TOKEN"];
const defaultForwardChannelId = -1002164744261;

for (const key of requiredEnvVariables) {
  if (process.env[key] === undefined) {
    throw new Error(`[config] MISSED REQUIRED ENVIRONMENT VARIABLE ${key}`);
  }
}

export const APP_CONFIG = {
  bot: {
    token: process.env.TELEGRAM_BOT_TOKEN as string,
    forwardChannelId:
      process.env.TELEGRAM_BOT_FORWARD_CHANNEL_ID ?? defaultForwardChannelId,
  },
} as const;
