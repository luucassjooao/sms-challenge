import AppError from '../middlewares/error';
import SMSRepository from '../repositories/SMSRepository';
import { ISMS } from '../types/SMSType';

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
    const sendSms = await SMSRepository.create(
      phone,
      message,
      '',
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
