import { Client, middleware } from '@line/bot-sdk';
import config from '../../config/config';

// create LINE SDK config from env variables
const lineBot = {
  channelAccessToken: config.lineBot.accessToken,
  channelSecret: config.lineBot.channelSecret,
};

export const lineSdk = new Client(lineBot);

export const lineMiddleware = middleware(lineBot);
