import { BotService } from "./services/bot";

function main() {
  const bot = BotService.getInstance();
  bot.start();
}

main();
