import express, { Router } from 'express';
import authRoute from './auth.route';
import docsRoute from './swagger.route';
import userRoute from './user.route';
import config from '../../config/config';
import userLineRoute from './userLine.route';
import lineBot from './lineBot.route';
import chatSession from './chatSession';
import postRoute from './post.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/usersLine',
    route: userLineRoute,
  },
  {
    path: '/webhook',
    route: lineBot,
  },
  {
    path: '/session',
    route: chatSession,
  },
  {
    path: '/posts',
    route: postRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
