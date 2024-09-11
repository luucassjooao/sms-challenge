import { Request, Response } from 'express';
import { SendSms } from '../useCases/sendSMS';
import { ReceiveNewStatusOfSMS } from '../useCases/receiveNewStatusOfSMS';
import { GetAllSMSByStatus } from '../useCases/getAllSMSByStatus';

class SMSController {
  async sendSMS(request: Request, response: Response) {
    const { phone, message } = request.body;

    const sendSMS = await SendSms({phone, message});

    return response.status(201).json({ message: 'SMS Enviado!', sendSMS });
  }

  async receiveNewStatusOfSMS(request: Request, response: Response) {
    const { MessageStatus, MessageSid } = request.body;

    await ReceiveNewStatusOfSMS({status: MessageStatus, messageId: MessageSid});

    return response.status(204);
  }

  async getAllSMSByStatus(request: Request, response: Response) {
    const { status } = request.body;

    const get = await GetAllSMSByStatus(status);

    return response.status(200).json(get);
  }
}

export default new SMSController();
