import AppError from '../middlewares/error';
import SMSRepository from '../repositories/SMSRepository';
import TwilioService from '../service/TwilioService';
import { ISMS } from '../types/SMSType';
import { statusMessages } from '../utils/constants/statusMessages';

interface IProps {
  phone: string;
  message: string;
}

export async function SendSms({ phone, message }: IProps): Promise<{
  message: string;
  sms: ISMS
}> {
  if (!phone || !message) throw new AppError('phone or message is missing!', 404);

  try {
    const sms = await TwilioService.sendSms(phone, message);

    const sendSms = await SMSRepository.create(
      phone,
      message,
      statusMessages[sms.status],
      sms.messageId
    );

    return {
      message: 'SMS ENVIADO',
      sms: sendSms
    };
  } catch {
    const notSendSms = await SMSRepository.create(phone, message, 'ERRO DE ENVIO');
    return {
      message: 'SMS NÃO ENVIADO',
      sms: notSendSms
    };
  }
}
