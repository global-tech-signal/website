import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const sorted = posts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  const articles = sorted
    .map(
      (post) =>
        `- [${post.data.title}](https://globaltechsignal.com/articles/${post.slug}): ${post.data.summary}`
    )
    .join('\n');

  const body = `# GlobalTechSignal

> GlobalTechSignal is a technology publication and engineering studio. We cover AI, SaaS, automation and startup engineering — and build production software (CRM systems, SaaS platforms, AI automations, lead management) for modern businesses.

## About

GlobalTechSignal covers the global tech landscape — AI, SaaS, automation and startup engineering — and turns those same patterns into production software for clients. We exist to help operators understand what's coming, and to ship the systems that put it to work.

- Tech Newsroom: Daily coverage of AI, SaaS, automation and the startup ecosystem — written by engineers, for builders.
- Engineering Studio: We design and ship CRM systems, SaaS platforms, AI automations and lead management software end-to-end.
- Outcome Focused: Every project is measured against real business metrics — pipeline, retention, response time, hours saved.

## Services

- AI Automation: We use LLMs, agents and workflow tooling to automate repetitive operations — lead qualification, document processing, support triage, internal copilots and back-office tasks.
- CRM Systems: Custom CRM platforms and deep integrations with HubSpot, Salesforce and Pipedrive — built around how your business actually sells.
- SaaS Development: End-to-end SaaS engineering — architecture, multi-tenant data models, billing, auth, dashboards, APIs and DevOps.
- Workflow Automation: Connect CRM, email, billing, ops into one automated workflow using Zapier, n8n, Make, custom APIs and serverless functions.
- Custom Websites: High-performance marketing sites built with Astro, Next.js, Tailwind — fast, SEO-friendly, and wired into CRM and analytics.
- Lead Management Systems: Capture, enrich, score and route leads automatically — from web form to closed deal.

## Industries Served

Roofing, Clinics, Construction, Real Estate, Legal, Insurance, Home Services, E-Commerce, Logistics, Finance, Education, Agencies

## Articles

${articles}

## Pages

- [Home](https://globaltechsignal.com/)
- [About](https://globaltechsignal.com/about)
- [Services](https://globaltechsignal.com/services)
- [Articles](https://globaltechsignal.com/articles)
- [Contact](https://globaltechsignal.com/contact)
- [Pricing](https://globaltechsignal.com/pricing)
- [Industries — Real Estate](https://globaltechsignal.com/industries/real-estate)

## Contact

For business inquiries, visit https://globaltechsignal.com/contact
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
