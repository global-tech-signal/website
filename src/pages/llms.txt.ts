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

> GlobalTechSignal is a technology publication and engineering studio operating in the Operational Intelligence category. We design Business Systems — CRM, integrations, automation, BI and AI Operations — that move businesses up the operational maturity ladder. We also publish daily on AI, SaaS, automation and startup engineering.

## About

GlobalTechSignal covers the global tech landscape — AI, SaaS, automation and startup engineering — and turns those same patterns into production software for clients. We exist to help operators understand what's coming, and to ship the systems that put it to work.

- Tech Newsroom: Daily coverage of AI, SaaS, automation and the startup ecosystem — written by engineers, for builders.
- Engineering Studio: We design and ship CRM systems, SaaS platforms, AI automations and lead management software end-to-end.
- Outcome Focused: Every project is measured against real business metrics — pipeline, retention, response time, hours saved.

## Operational Intelligence Framework

We organize every system we ship around a 5-layer model — Capture, Connect, Automate, Intelligence, Optimize — and a 5-stage maturity ladder:

1. Patchwork Ops — disconnected systems, heavy manual work, knowledge lives with people.
2. Connected Ops — core systems communicate, processes remain partially manual.
3. Automated Ops — routine operational work runs automatically; humans focus on exceptions.
4. Intelligent Ops — AI supports decisions; insights are proactive; leaders trust real-time visibility.
5. Autonomous Ops — systems continuously optimize; AI recommends and orchestrates actions.

The Business Operations Index™ is our self-serve diagnostic that scores a company across the five layers and places them on the maturity ladder.

## Business Systems

- Operational Intelligence: The category page — how the six systems fit together into one operating model.
- Revenue Systems: CRM, sales automation, lead management and revenue operations built around how you sell.
- Operations Systems: Connected workflows that eliminate manual handoffs across the business.
- Customer Systems: One source of truth for every customer interaction across sales, support and success.
- Business Intelligence: Dashboards, reporting and decision support that leadership can actually trust.
- AI Operations: AI agents and copilots that remove operational work and embed in real workflows.
- Digital Experience: Web, product and customer-facing surfaces wired into your business systems.

## Services

- AI Automation: We use LLMs, agents and workflow tooling to automate repetitive operations — lead qualification, document processing, support triage, internal copilots and back-office tasks.
- CRM Systems: Custom CRM platforms and deep integrations with HubSpot, Salesforce and Pipedrive — built around how your business actually sells.
- SaaS Development: End-to-end SaaS engineering — architecture, multi-tenant data models, billing, auth, dashboards, APIs and DevOps.
- Workflow Automation: Connect CRM, email, billing, ops into one automated workflow using Zapier, n8n, Make, custom APIs and serverless functions.
- Custom Websites: High-performance marketing sites built with Astro, Next.js, Tailwind — fast, SEO-friendly, and wired into CRM and analytics.
- Lead Management Systems: Capture, enrich, score and route leads automatically — from web form to closed deal.

## Assessments & Diagnostics

- Business Operations Index™: 10-question, 2-minute self-serve diagnostic that returns a 0–30 score across five layers and places you on the maturity ladder.
- Operational Roadmap (60 min, free): A senior practitioner reviews your Index score, prioritizes bottlenecks and designs a 90-day roadmap.
- Workflow Audit, Revenue Systems Assessment, CRM Architecture Review, Systems Integration Review, Data Architecture Assessment, Integration Blueprint, Automation Opportunity Review, Process Engineering Session, AI Readiness Workshop, Business Intelligence Review, Decision Intelligence Assessment, Executive KPI Review, Continuous Improvement Plan, Operational Performance Workshop, Executive Strategy Session.

## Solutions (problems we solve)

- Outgrowing Spreadsheets — centralize sales & operations as you scale.
- Sales Operations Breaking Down — lost leads, poor CRM adoption, manual follow-up.
- Too Many Manual Processes — repetitive work and operational bottlenecks.
- Disconnected Business Systems — CRM, email, chat and docs that don't talk.
- Reporting Takes Days — real-time visibility for leadership decisions.
- Scaling Operations — systems that scale without adding headcount.
- Customer Info Everywhere — a unified customer record across your stack.
- AI Without ROI — operational intelligence over isolated AI demos.

## Industries Served

Real Estate, Roofing, Clinics, Construction, Legal, Insurance, Home Services, E-Commerce, Logistics, Finance, Education, Agencies.

## Articles

${articles}

## Pages

- [Home](https://globaltechsignal.com/)
- [About](https://globaltechsignal.com/about)
- [Contact](https://globaltechsignal.com/contact)
- [Pricing](https://globaltechsignal.com/pricing)
- [Case Studies](https://globaltechsignal.com/case-studies)
- [Articles](https://globaltechsignal.com/articles)
- [Assessments](https://globaltechsignal.com/assessments)
- [Business Operations Index™](https://globaltechsignal.com/scorecard)
- [Operational Intelligence](https://globaltechsignal.com/operational-intelligence)
- [Services](https://globaltechsignal.com/services)

### Business Systems

- [Revenue Systems](https://globaltechsignal.com/services/revenue-systems)
- [Operations Systems](https://globaltechsignal.com/services/operations-systems)
- [Customer Systems](https://globaltechsignal.com/services/customer-systems)
- [Business Intelligence](https://globaltechsignal.com/services/business-intelligence)
- [AI Operations](https://globaltechsignal.com/services/ai-operations)
- [Digital Experience](https://globaltechsignal.com/services/digital-experience)
- [SEO](https://globaltechsignal.com/services/seo)

### Solutions

- [Outgrowing Spreadsheets](https://globaltechsignal.com/solutions/outgrowing-spreadsheets)
- [Sales Operations Breaking Down](https://globaltechsignal.com/solutions/sales-operations)
- [Too Many Manual Processes](https://globaltechsignal.com/solutions/manual-processes)
- [Disconnected Business Systems](https://globaltechsignal.com/solutions/disconnected-systems)
- [Reporting Takes Days](https://globaltechsignal.com/solutions/reporting)
- [Scaling Operations](https://globaltechsignal.com/solutions/scaling-operations)
- [Customer Info Everywhere](https://globaltechsignal.com/solutions/customer-information)
- [AI Without ROI](https://globaltechsignal.com/solutions/ai-without-roi)

### Industries

- [All Industries](https://globaltechsignal.com/industries)
- [Real Estate](https://globaltechsignal.com/industries/real-estate)
- [Roofing](https://globaltechsignal.com/industries/roofing)
- [Clinics](https://globaltechsignal.com/industries/clinics)
- [Construction](https://globaltechsignal.com/industries/construction)
- [Legal](https://globaltechsignal.com/industries/legal)
- [Insurance](https://globaltechsignal.com/industries/insurance)
- [Home Services](https://globaltechsignal.com/industries/home-services)
- [E-Commerce](https://globaltechsignal.com/industries/ecommerce)
- [Logistics](https://globaltechsignal.com/industries/logistics)
- [Finance](https://globaltechsignal.com/industries/finance)
- [Education](https://globaltechsignal.com/industries/education)
- [Agencies](https://globaltechsignal.com/industries/agencies)

## Contact

For business inquiries, visit https://globaltechsignal.com/contact
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
