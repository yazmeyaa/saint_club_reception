export interface IBotService {
  start(): void;
  publishMessageToChanel(
    channelId: string | number,
    textMessage: string,
    md?: boolean
  ): Promise<boolean>;
}
