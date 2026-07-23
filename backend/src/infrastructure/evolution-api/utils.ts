export const normalizeE164 = (mobile: string): string => {
  if (!mobile || mobile?.length <= 0) {
    throw new Error("Mobile must be defined");
  }

  let handledMobile: string = mobile;

  if (handledMobile.startsWith("+")) {
    handledMobile = handledMobile.slice(1);
  }

  if (!handledMobile.startsWith("244")) {
    handledMobile = `244${handledMobile}`;
  }

  return handledMobile;
};

/**
 * Normaliza um remoteJid da Evolution API / WhatsApp
 * @param remoteJid Ex: "244935785831@s.whatsapp.net"
 * @returns Objeto com número limpo e formato internacional
 */
export function normalizeJid(remoteJid: string | undefined) {
  if (!remoteJid) return { number: "", clean: "", withCode: "" };

  // Remove o sufixo @s.whatsapp.net e qualquer sufixo extra
  let clean = remoteJid.split("@")[0];

  // Remove possíveis sufixos como :XX (ex: lid)
  clean = clean.split(":")[0];

  // Remove tudo que não for número
  const onlyNumbers = clean.replace(/\D/g, "");

  return {
    raw: remoteJid, // original
    clean: onlyNumbers, // só números: 244935785831
    withCode: onlyNumbers.startsWith("244") ? onlyNumbers : `244${onlyNumbers}`, // garante código de Angola
    formatted: formatMobile(onlyNumbers), // formato legível
  };
}

/** Formata o número para exibição */
export function formatMobile(phone: string): string {
  if (phone.length === 12 && phone.startsWith("244")) {
    return `+244 ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`;
  }
  return `+${phone}`;
}
