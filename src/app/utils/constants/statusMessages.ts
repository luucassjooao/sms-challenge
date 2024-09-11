export type TStatus = 'queued' | 'sent' | 'delivered' | 'failed';
export const statusMessages: Record<TStatus, string> = {
  'queued': '',
  'sent': 'ENVIADO',
  'delivered': 'RECEBIDO',
  'failed': 'ERRO DE ENVIO',
};
