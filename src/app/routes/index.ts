import { Router } from 'express';
import SMSController from '../controllers/SMSController';

const routes = Router();

routes.post('/sendSms', SMSController.sendSMS);
routes.post('/status', SMSController.receiveNewStatusOfSMS);
routes.get('/getAllSMSByStatus', SMSController.getAllSMSByStatus);

export {routes};
