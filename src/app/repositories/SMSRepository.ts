import { query } from '../../database';
import { ISMS } from '../types/SMSType';
import { ISMSRepository } from './ISMSRepository';

class SMSRepository implements ISMSRepository {
  async create(phone: string, message: string, status?: string, messageId?: string): Promise<ISMS> {
    const [row] = await query(`
      INSERT INTO sms(phone, message, status, messageId)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [phone, message, status, messageId]);

    return row;
  }

  async updateStatusSMSByMessageId(messageId: string, status: string): Promise<ISMS> {
    const [row] = await query(`
      UPDATE sms
      SET status = $2
      WHERE messageId = $1
    `, [messageId, status]);

    return row;
  }

  async getSMSByMessageId(messageId: string): Promise<ISMS> {
    const [row] = await query('SELECT * FROM sms WHERE messageId = $1', [messageId]);

    return row;
  }

  async getAllSMSByStatus(status: string): Promise<ISMS[]> {
    const rows = await query('SELECT * FROM sms WHERE status = $1 AND updated_at >= NOW() - INTERVAL \'24 hours\'', [status]);

    return rows;
  }
}

export default new SMSRepository();
