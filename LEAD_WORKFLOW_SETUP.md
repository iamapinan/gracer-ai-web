# Gracer AI Lead Workflow Setup

## Funnel

`Landing page → Workflow Assessment → Google Sheet → lead score → sales notification → customer confirmation → follow-up → appointment → proposal → won/lost`

## Activation

1. Create a standalone project at Google Apps Script.
2. Copy `automation/google-apps-script/Code.gs` into the project.
3. In Project Settings → Script properties, add `LINE_OA_URL` and `BOOKING_URL`.
4. Run `setup()` once and approve access. This creates the `Gracer AI Leads` spreadsheet and a 6-hour follow-up trigger.
5. Deploy as Web app: execute as yourself and allow access to anyone submitting the public form.
6. Copy `.env.example` to `.env.local`, replace all three URLs, then rebuild and deploy the website.

## Sales operating rules

- Score 75–100: contact in the preferred channel within 2 business hours.
- Score 55–74: contact within 1 business day.
- Below 55: nurture with useful workflow examples; do not cold-call.
- LINE leads: Apps Script emails the owner a follow-up task. A real automated LINE message requires a verified LINE Official Account, Messaging API channel, and explicit user add/follow event.
- Email leads: immediate confirmation plus a follow-up after 2 days; the next follow-up is scheduled 5 days later.
- Phone is used only when the lead selects “โทรตามเวลานัด”.

## Lead stages

`new → contacted → qualified → assessment_booked → proposal_sent → won / lost`

The salesperson updates `stage`, `notes`, and `next_follow_up_at` in the generated Google Sheet. Never upload sensitive customer documents through this public form.
