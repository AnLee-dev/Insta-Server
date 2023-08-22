import express, { Router } from 'express';
import { WebhookEvent } from '@line/bot-sdk/dist/types';
import messageController from '../../modules/lineBot/index.controller';
// To do
// import { lineMiddleware } from '../../modules/utils/lineBot';

const router: Router = express.Router();

router.route('/').post((req, res) => {
  Promise.all(
    req.body.events.map((event: WebhookEvent) => {
      const { replyMessage } = messageController();
      return replyMessage(event);
    })
  )
    .then((result) => res.json(result))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).end();
    });
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Linebot
 *   description: Linebot web hook
 */

/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Linebot web hook
 *     description: Linebot web hook.
 *     tags: [Linebot]
 *
 */
