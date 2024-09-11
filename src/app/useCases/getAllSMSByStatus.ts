import SMSRepository from '../repositories/SMSRepository';
import { ISMS } from '../types/SMSType';

export async function GetAllSMSByStatus(status: string): Promise<ISMS[]> {
  return SMSRepository.getAllSMSByStatus(status);
}
