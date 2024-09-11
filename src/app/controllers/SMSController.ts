import { Request, Response } from 'express';
import { SendSms } from '../useCases/sendSMS';
import { ReceiveNewStatusOfSMS } from '../useCases/receiveNewStatusOfSMS';
import { GetAllSMSByStatus } from '../useCases/getAllSMSByStatus';

class SMSController {
  async sendSMS(request: Request, response: Response) {
    const { phone, message } = request.body;

    const sendSMS = await SendSms({phone, message});

    return response.status(201).json({ message: sendSMS.message, sms: sendSMS.sms });
  }

  async receiveNewStatusOfSMS(request: Request, response: Response) {
    const { messageStatus, messageId } = request.body;

    await ReceiveNewStatusOfSMS({status: messageStatus, messageId: messageId});

    return response.status(200).json({ message: 'Status da mensagem atualizado' });
  }

  async getAllSMSByStatus(request: Request, response: Response) {
    const { status } = request.body;

    const get = await GetAllSMSByStatus(status);

    return response.status(200).json(get);
  }
}

export default new SMSController();
