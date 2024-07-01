import { Telegraf } from "telegraf";
import { IBotService } from "./types";
import { APP_CONFIG } from "../../config/config";
import { welcomeMessage } from "./consts";
import { markAsUntransferable } from "worker_threads";
import { normalizeString } from "./helpers";

export class BotService implements IBotService {
  private static instance: IBotService | null = null;
  private bot: Telegraf;

  private constructor() {
    this.bot = new Telegraf(APP_CONFIG.bot.token);
  }

  static getInstance(): IBotService {
    if (BotService.instance === null) {
      BotService.instance = new BotService();
    }
    return BotService.instance;
  }

  public async publishMessageToChanel(
    channelId: string | number,
    textMessage: string,
    md = false
  ): Promise<boolean> {
    try {
      await this.bot.telegram.sendMessage(channelId, textMessage, {
        parse_mode: md ? "Markdown" : undefined,
      });
      return true;
    } catch (error) {
      const textMessage =
        error instanceof Error ? error.message : "Unexpected error.";
      console.error(`[BotService.PublishMessageToChannel] ${textMessage}`);
      return false;
    }
  }

  public start(): void {
    this.bot.start((ctx) => {
      ctx.reply(welcomeMessage, {
        parse_mode: "MarkdownV2",
      });
    });

    this.bot.on("message", async (ctx) => {
      const tag = ctx.text?.split("\n")[0];
      if (!tag) {
        return await ctx.reply('Ты не указал поле "Тег" в обращении.');
      }
      const validTagRegex = /^\s?(тег:?\s?)?\#[a-zA-Z0-9]+$/;
      if (!validTagRegex.test(tag.toLowerCase())) {
        return await ctx.reply("Указан неверный тег. Проверь ещё раз.");
      }

      await ctx.forwardMessage(APP_CONFIG.bot.forwardChannelId);

      const infoMsg = `ID: ${ctx.from.id}\n${
        ctx.from.username
          ? `Username: @${normalizeString(ctx.from.username)}`
          : ""
      }${
        !ctx.from.username
          ? `\n[Ссылка на пользователя](tg://user?id=${ctx.from.id})\n`
          : ""
      }`;

      await this.publishMessageToChanel(
        APP_CONFIG.bot.forwardChannelId,
        infoMsg,
        true
      );

      await ctx.reply(
        "Твоё сообщение было отправлено, с тобой скоро свяжутся!"
      );
    });

    this.bot.catch(async (err) => {
      const errMsg = err instanceof Error ? err.message : "Неизвестная ошибка.";
      await this.publishMessageToChanel(
        APP_CONFIG.bot.forwardChannelId,
        "Произошла ошибка в боте! Более подробная информация: " + errMsg
      );
    });

    this.bot.launch(() => {
      console.log("[BotService.start] Bot started successfully");
    });
  }
}
