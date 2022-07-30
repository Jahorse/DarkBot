import * as fs from 'fs';
import DiscordWebhook, { Webhook } from 'discord-webhook-ts';

export interface NotificationField {
  name: string;
  value: string;
}

export interface Notification {
  title: string;
  description?: string;
  fields: NotificationField[];
}


export class Discord {
  private static MAX_EMBEDS = 10;
  private client;

  constructor() {
    const secretsFile = fs.readFileSync('secrets.json', 'utf-8');
    const secretsJson = JSON.parse(secretsFile);

    this.client = new DiscordWebhook(secretsJson.webhook);
  }

  public async sendMessage(notifications: Notification[]) {
    if (notifications.length > Discord.MAX_EMBEDS) {
      const splitNotifications: Notification[][] = Array(Math.ceil(notifications.length / Discord.MAX_EMBEDS))
        .fill(undefined)
        .map((_, index) => index * Discord.MAX_EMBEDS)
        .map(begin => notifications.slice(begin, begin + Discord.MAX_EMBEDS));

      for (const splitNotification of splitNotifications) {
        const requestBody: Webhook.input.POST = {
          embeds: splitNotification,
        };
        // We could get throttled if more than 5 of these send, but that would be 50+ notifications.
        this.client.execute(requestBody).catch((r: any) => console.error(r));
      }

    } else {
      const requestBody: Webhook.input.POST = {
        embeds: notifications,
      };
      this.client.execute(requestBody)
        .catch((r: any) => console.error(r));
    }
  }
}
