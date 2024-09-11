import 'dotenv/config';
import twilio, { Twilio } from 'twilio';
import AppError from '../middlewares/error';
import { TStatus } from '../utils/constants/statusMessages';

interface IReturnSendSms {
  messageId: string;
  status: TStatus;
}

class TwilioService {
  private client: Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if(!accountSid || !authToken) {
      throw new AppError('Twilio credentials are missing');
    }

    this.client = twilio(accountSid, authToken);
  };


  public async sendSms(to: string, message: string): Promise<IReturnSendSms> {
    try {
      const result = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
        statusCallback: process.env.TWILIO_STATUS_CALLBACK_URL
      });

      return {
        messageId: result.sid,
        status: result.status as unknown as TStatus
      };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      throw new AppError(err.message);
    }
  }
}

export default new TwilioService();
