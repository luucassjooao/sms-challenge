import SMSRepository from '../repositories/SMSRepository';
import { ISMS } from '../types/SMSType';
import { TStatus } from '../utils/constants/statusMessages';

export async function GetAllSMSByStatus(status: TStatus): Promise<ISMS[]> {
  return SMSRepository.getAllSMSByStatus(status);
}
