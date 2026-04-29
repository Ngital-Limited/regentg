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

/**
 * Fire-and-forget admin notification for new lead submissions.
 * Sends to the address fixed in the `lead-notification` template (tajul@ngital.com).
 * Errors are swallowed so form UX is never blocked.
 */
export async function notifyLead(id: string, payload: LeadPayload) {
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "lead-notification",
        recipientEmail: "tajul@ngital.com",
        idempotencyKey: `lead-${payload.formType.toLowerCase().replace(/\s+/g, "-")}-${id}`,
        templateData: {
          ...payload,
          submittedAt: new Date().toISOString(),
        },
      },
    });
  } catch (err) {
    console.warn("Lead notification failed", err);
  }
}
