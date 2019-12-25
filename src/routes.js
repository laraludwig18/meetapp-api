import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import {
  FileController,
  MeetupController,
  UserController,
  ScheduleController,
  SessionController,
  SubscriptionController,
} from './app/controllers';

import { authMiddleware } from './app/middlewares';

import {
  validateUserStore,
  validateUserUpdate,
  validateSessionStore,
  validateMeetupStore,
  validateMeetupUpdate,
} from './app/validators';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetups', validateMeetupStore, MeetupController.store);
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/:meetupId', MeetupController.find);
routes.put('/meetups/:meetupId', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetups/:meetupId', MeetupController.delete);

routes.get('/schedule', ScheduleController.index);

routes.post('/subscriptions/:meetupId', SubscriptionController.store);
routes.delete('/subscriptions/:subscriptionId', SubscriptionController.delete);
routes.get('/subscriptions', SubscriptionController.index);

export default routes;
