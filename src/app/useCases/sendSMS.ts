import AppError from '../middlewares/error';
import SMSRepository from '../repositories/SMSRepository';
import TwilioService from '../service/TwilioService';
import { ISMS } from '../types/SMSType';
import { statusMessages } from '../utils/constants/statusMessages';

interface IProps {
  phone: string;
  message: string;
}

export async function SendSms({ phone, message }: IProps): Promise<ISMS> {
  if (!phone || !message) throw new AppError('phone or message is missing!', 404);

  try {
    const sms = await TwilioService.sendSms(phone, message);

    return SMSRepository.create(
      phone,
      message,
      statusMessages[sms.status],
      sms.messageId
    );
  } catch {
    return SMSRepository.create(phone, message, 'ERRO DE ENVIO');
  }
}
