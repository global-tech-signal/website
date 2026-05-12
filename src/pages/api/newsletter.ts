export const prerender = false;

import type { APIRoute } from 'astro';
import { MailtrapClient } from 'mailtrap';

const client = new MailtrapClient({ token: import.meta.env.MAILTRAP_API_TOKEN });
const SENDER_EMAIL = import.meta.env.MAILTRAP_SENDER_EMAIL || 'noreply@globaltechsignal.com';
const TO_EMAIL = import.meta.env.CONTACT_EMAIL || 'hello@globaltechsignal.com';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get('email')?.toString().trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'A valid email address is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await client.send({
      from: { name: 'GlobalTechSignal', email: SENDER_EMAIL },
      to: [{ email: TO_EMAIL }],
      subject: `[Newsletter] New subscriber: ${email}`,
      html: `
        <h2>New newsletter signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p>Add this subscriber to your mailing list.</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to subscribe. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
