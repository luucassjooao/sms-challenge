import { ISMS } from '../types/SMSType';

export interface ISMSRepository {
  create(
    phone: string,
    message: string,
    status?: string,
  ): Promise<ISMS>;
  updateStatusSMS(id: string, status: string): Promise<ISMS>;
  getSMSById(id: string): Promise<ISMS>;
  getAllSMSByStatus(status: string): Promise<ISMS[]>;
}
