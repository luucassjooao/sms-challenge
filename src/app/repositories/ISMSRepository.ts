import { ISMS } from '../types/SMSType';

export interface ISMSRepository {
  create(
    phone: string,
    message: string
  ): Promise<ISMS>;
  updateStatusSMSByMessageId(messageId: string, status: string): Promise<ISMS>;
  updateStatusSMSById(id: number, status: string, messageId: string): Promise<ISMS>;
  getSMSByMessageId(messageId: string): Promise<ISMS>;
  getAllSMSByStatus(status: string): Promise<ISMS[]>;
}
