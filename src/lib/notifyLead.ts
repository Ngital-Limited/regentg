import { supabase } from "@/integrations/supabase/client";

interface LeadPayload {
  formType: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  projectName?: string;
  jobTitle?: string;
  cvUrl?: string;
}

const ADMIN_RECIPIENTS = [
  "tajul@ngital.com",
  "regentgroup1981@gmail.com",
  "regent.group2019@gmail.com",
  "afifa.rddl@gmail.com",
];

/**
 * Fire-and-forget admin notification for new lead submissions.
 * Sends to all addresses in ADMIN_RECIPIENTS.
 * Errors are swallowed so form UX is never blocked.
 */
export async function notifyLead(id: string, payload: LeadPayload) {
  const slug = payload.formType.toLowerCase().replace(/\s+/g, "-");
  const submittedAt = new Date().toISOString();

  await Promise.all(
    ADMIN_RECIPIENTS.map(async (recipient) => {
      try {
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "lead-notification",
            recipientEmail: recipient,
            idempotencyKey: `lead-${slug}-${id}-${recipient}`,
            templateData: {
              ...payload,
              submittedAt,
            },
          },
        });
      } catch (err) {
        console.warn(`Lead notification failed for ${recipient}`, err);
      }
    })
  );
}
