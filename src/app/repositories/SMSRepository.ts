import { query } from '../../database';
import { ISMS } from '../types/SMSType';
import { ISMSRepository } from './ISMSRepository';

class SMSRepository implements ISMSRepository {
  async create(phone: string, message: string, status?: string): Promise<ISMS> {
    const [row] = await query(`
      INSERT INTO sms(phone, message, status)
      VALUES($1, $2, $3)
      RETURNING *
    `, [phone, message, status]);

    return row;
  }

  async updateStatusSMS(id: string, status: string): Promise<ISMS> {
    const [row] = await query(`
      UPDATE sms
      SET status = $2
      WHERE id = $1
    `, [id, status]);

    return row;
  }

  async getSMSById(id: string): Promise<ISMS> {
    const [row] = await query('SELECT * FROM sms WHERE id = $1', [id]);

    return row;
  }

  async getAllSMSByStatus(status: string): Promise<ISMS[]> {
    const rows = await query('SELECT * FROM sms WHERE status = $1 AND updated_at >= NOW() - INTERVAL \'24 hours\'', [status]);

    return rows;
  }
}

export default new SMSRepository();
