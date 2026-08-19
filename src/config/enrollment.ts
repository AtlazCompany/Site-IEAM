/**
 * Configuração central de destino do formulário de matrícula.
 *
 * Nada aqui deve conter segredos. Chaves privadas (API keys, tokens de
 * serviços de e-mail, etc.) pertencem exclusivamente a um backend/função
 * serverless — nunca ao bundle do navegador.
 *
 * Variáveis de ambiente (arquivo .env, prefixo obrigatório VITE_ para o Vite
 * expor a variável ao frontend):
 *
 *   VITE_ENROLLMENT_CONTACT_EMAIL   destinatário das notificações por e-mail
 *   VITE_ENROLLMENT_API_ENDPOINT    endpoint HTTP (backend/serverless) que recebe o payload
 *   VITE_ENROLLMENT_WHATSAPP_NUMBER número do WhatsApp institucional (formato internacional, só dígitos)
 */

import { SITE } from '@/constants/site';

export type ContactChannel = 'whatsapp' | 'email' | 'phone';

interface EnrollmentConfig {
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  apiEnabled: boolean;
  contactEmail: string | null;
  whatsappNumber: string | null;
  apiEndpoint: string | null;
  preferredDefaultChannel: ContactChannel;
}

const contactEmail = (import.meta.env.VITE_ENROLLMENT_CONTACT_EMAIL as string | undefined)?.trim() || null;
const apiEndpoint = (import.meta.env.VITE_ENROLLMENT_API_ENDPOINT as string | undefined)?.trim() || null;
const whatsappNumber =
  (import.meta.env.VITE_ENROLLMENT_WHATSAPP_NUMBER as string | undefined)?.trim() || SITE.whatsapp;

export const ENROLLMENT_CONFIG: EnrollmentConfig = {
  emailEnabled: Boolean(contactEmail),
  whatsappEnabled: Boolean(whatsappNumber),
  apiEnabled: Boolean(apiEndpoint),
  contactEmail,
  whatsappNumber,
  apiEndpoint,
  preferredDefaultChannel: 'whatsapp',
};

export const ENROLLMENT_DRAFT_STORAGE_KEY = 'ieam:enrollment-draft:v1';
