export const prerender = false;

import type { APIRoute } from 'astro';
import { MailtrapClient } from 'mailtrap';

const client = new MailtrapClient({ token: import.meta.env.MAILTRAP_API_TOKEN });
const SENDER_EMAIL = import.meta.env.MAILTRAP_SENDER_EMAIL || 'noreply@globaltechsignal.com';
const TO_EMAIL = import.meta.env.CONTACT_EMAIL || 'hello@globaltechsignal.com';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    const inquiry = [
      data.get('checkbox1') ? 'Book a Demo' : '',
      data.get('checkbox2') ? 'Start a Project' : '',
    ].filter(Boolean).join(', ') || 'General';

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email and message are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await client.send({
      from: { name: 'GlobalTechSignal', email: SENDER_EMAIL },
      to: [{ email: TO_EMAIL }],
      headers: { 'Reply-To': email },
      subject: `[Contact] ${inquiry} — ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry:</strong> ${inquiry}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
