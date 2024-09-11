import AppError from '../middlewares/error';
import SMSRepository from '../repositories/SMSRepository';
import { statusMessages, TStatus } from '../utils/constants/statusMessages';

interface IProps {
  status: TStatus;
  messageId: string
}

export async function ReceiveNewStatusOfSMS({ status, messageId }: IProps) {
  const get = await SMSRepository.getSMSByMessageId(messageId);

  if (!get) throw new AppError('Message not found', 404);

  return await SMSRepository.updateStatusSMSByMessageId(messageId, statusMessages[status]);;
}
