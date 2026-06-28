export const prerender = false;

import type { APIRoute } from 'astro';
import { MailtrapClient } from 'mailtrap';

const MAILTRAP_TOKEN = import.meta.env.MAILTRAP_API_TOKEN;
const SENDER_EMAIL = import.meta.env.MAILTRAP_SENDER_EMAIL || 'noreply@globaltechsignal.com';
const TO_EMAIL = import.meta.env.CONTACT_EMAIL || 'hello@globaltechsignal.com';
const IS_DEV = import.meta.env.DEV === true;

const client = MAILTRAP_TOKEN ? new MailtrapClient({ token: MAILTRAP_TOKEN }) : null;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    const company = data.get('company')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const companySize = data.get('companySize')?.toString().trim();
    const industry = data.get('industry')?.toString().trim();
    const challenge = data.get('challenge')?.toString().trim();
    const timeline = data.get('timeline')?.toString().trim();
    const currentSystems = data.getAll('currentSystems').map((v) => v.toString()).filter(Boolean);
    const assessmentType = data.get('assessmentType')?.toString().trim();

    const inquiry =
      assessmentType ||
      challenge ||
      [
        data.get('checkbox1') ? 'Operational Assessment' : '',
        data.get('checkbox2') ? 'Explore Solutions' : '',
      ].filter(Boolean).join(', ') ||
      'General';

    const payload = {
      name,
      email,
      company,
      phone,
      companySize,
      industry,
      challenge,
      timeline,
      currentSystems,
      assessmentType,
      messageLength: message?.length ?? 0,
      inquiry,
    };

    console.log('[contact] received:', payload);

    if (!name || !email || !message) {
      console.warn('[contact] validation failed — missing required fields', {
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message,
      });
      return new Response(
        JSON.stringify({ error: 'Name, email and message are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const detailRows: Array<[string, string]> = [
      ['Name', name],
      ['Email', email],
      ['Company', company || ''],
      ['Phone', phone || ''],
      ['Company size', companySize || ''],
      ['Industry', industry || ''],
      ['Requested offer', assessmentType || ''],
      ['Biggest challenge', challenge || ''],
      ['Preferred timeline', timeline || ''],
      ['Current systems', currentSystems.join(', ')],
    ].filter(([, v]) => v && v.length > 0) as Array<[string, string]>;

    const detailsHtml = detailRows
      .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
      .join('\n');

    if (!client) {
      console.warn(
        '[contact] MAILTRAP_API_TOKEN not set — skipping email send. Payload was parsed successfully:',
        { ...payload, message }
      );
      return new Response(
        JSON.stringify({ success: true, dev: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await client.send({
      from: { name: 'GlobalTechSignal', email: SENDER_EMAIL },
      to: [{ email: TO_EMAIL }],
      headers: { 'Reply-To': email },
      subject: `[Contact] ${inquiry} — ${name}${company ? ' / ' + company : ''}`,
      html: `
        <h2>New contact form submission</h2>
        ${detailsHtml}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('[contact] email sent', { to: TO_EMAIL, inquiry, name });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const detail =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { message: String(error) };
    console.error('[contact] error:', detail);
    return new Response(
      JSON.stringify({
        error: 'Failed to send message. Please try again.',
        ...(IS_DEV ? { detail: detail.message } : {}),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
