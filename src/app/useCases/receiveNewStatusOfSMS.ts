import AppError from '../middlewares/error';
import SMSRepository from '../repositories/SMSRepository';

interface IProps {
  status: string;
  messageId: string
}

export async function ReceiveNewStatusOfSMS({ status, messageId }: IProps) {
  const get = await SMSRepository.getSMSById(messageId);

  if (!get) throw new AppError('Message not found', 404);

  return await SMSRepository.updateStatusSMS(messageId, status);;
}
