# Gracer AI — SME AI Workflow

Gracer AI is a Thai-language landing page, sales demonstration, and lead-capture workflow for introducing practical AI automation to Thai SMEs.

The site presents AI as a tool that completes useful business work—not merely as a chatbot. Its primary demonstration turns a customer request into a quotation draft by finding company information, applying business rules, and keeping a person in control of final approval.

## What is included

- Customer-facing landing page focused on measurable business outcomes
- Interactive quotation workflow demonstration
- Three-question Workflow Assessment form
- Automatic lead scoring and source attribution
- Google Sheets lead database through Google Apps Script
- Sales notifications and scheduled email follow-ups
- LINE and appointment CTAs
- Thai privacy, terms, and cookie-policy pages
- Deterministic demo data for reliable presentations

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | SME AI Workflow landing page and lead assessment |
| `/demo` | Private AI sales and quotation demonstration |
| `/privacy-policy` | Privacy policy |
| `/terms-and-conditions` | Terms of service |
| `/cookie-policy` | Cookie policy |

## Demo story

The demo follows a simple **Before → AI → After** narrative:

1. A customer requests a quotation for an industrial product.
2. AI extracts the product, quantity, and delivery requirements.
3. The workflow checks product data, pricing, stock, discounts, and delivery rules.
4. A quotation and customer response are prepared with source references.
5. A salesperson reviews and approves the result.

The target outcome shown in the experience is reducing a quotation workflow from approximately one working day to three minutes.

## Technology

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Google Apps Script for lead automation

## Local development

Requirements:

- Node.js 18 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite prints the local URL after startup. The default is usually `http://localhost:5173`.

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Environment configuration

Copy `.env.example` to `.env.local` and replace the placeholder values:

```env
VITE_LEAD_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
VITE_LINE_OA_URL=https://line.me/R/ti/p/@YOUR_LINE_OA
VITE_BOOKING_URL=https://calendar.app.google/YOUR_BOOKING_PAGE
```

| Variable | Description |
| --- | --- |
| `VITE_LEAD_WEBHOOK_URL` | Google Apps Script Web App endpoint that receives assessment submissions |
| `VITE_LINE_OA_URL` | Gracer AI LINE Official Account URL |
| `VITE_BOOKING_URL` | Public appointment-booking page |

When `VITE_LEAD_WEBHOOK_URL` is not configured, submissions are stored only in the visitor's browser for local demonstration. This fallback must not be treated as production lead storage.

## Lead automation

The production funnel is:

```text
Landing page
  → Workflow Assessment
  → Google Sheet
  → Lead score
  → Sales notification
  → Customer confirmation
  → Follow-up
  → Appointment
  → Proposal
  → Won / Lost
```

The automation source is located at [`automation/google-apps-script/Code.gs`](automation/google-apps-script/Code.gs). It:

- creates and maintains the lead spreadsheet;
- validates and stores form submissions;
- protects the sheet from formula injection;
- classifies leads as hot, warm, or nurture;
- notifies the sales owner;
- sends an immediate confirmation to email leads; and
- runs scheduled follow-up checks every six hours.

See [`LEAD_WORKFLOW_SETUP.md`](LEAD_WORKFLOW_SETUP.md) for deployment instructions and sales operating rules.

### LINE limitation

The landing page can direct a prospect to the configured LINE Official Account. Sending automated LINE messages requires a verified LINE Official Account, a Messaging API channel, and an explicit add/follow relationship with the prospect. Until those are configured, LINE follow-up is assigned to the salesperson by email notification.

Phone follow-up is used only when the prospect explicitly selects the scheduled-call option.

## Demo data and reliability

The fictional company **Eastern Industrial Supply Co., Ltd.** is used for the demonstration. Its controlled dataset is stored in [`demo-data/`](demo-data/) and includes product information, pricing, stock, policies, customer records, FAQ, and a previous quotation.

The demo is deterministic so it remains usable during an event even when external AI services or venue Wi-Fi are unavailable.

## Supporting documents

- [`EXECUTION_PLAN.md`](EXECUTION_PLAN.md) — living roadmap, priorities, metrics, and current status
- [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md) — business objectives and product positioning
- [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md) — presentation script
- [`SALES_PROPOSAL.md`](SALES_PROPOSAL.md) — AI Workflow Pilot sales proposal
- [`LEAD_WORKFLOW_SETUP.md`](LEAD_WORKFLOW_SETUP.md) — lead automation deployment guide

## Production checklist

- Deploy the Google Apps Script Web App.
- Configure all three environment variables.
- Submit a test lead and confirm the Google Sheet row.
- Verify the sales notification and customer confirmation email.
- Connect the official LINE and booking URLs.
- Review the privacy wording and consent records.
- Test the landing page and `/demo` on mobile.
- Run `npm run build`.

## Ownership

Copyright © Gracer Corp Co., Ltd. All rights reserved.
