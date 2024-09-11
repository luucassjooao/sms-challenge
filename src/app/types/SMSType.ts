import { TStatus } from '../utils/constants/statusMessages';

export interface ISMS {
  id: number;
  phone: string;
  message: string;
  status: TStatus;
  messageId: string;
  created_at: Date;
  updated_at: Date;
}
