# Gracer AI SME AI Operations — Execution Plan

> Last updated: 5 September 2026  
> Event date: 14 September 2026  
> Primary objective: acquire qualified SME leads and close the first paid AI Workflow Pilot.

## How to use this document

- Update the **Last updated** date whenever priorities, status, or decisions change.
- Move work through `Not started → In progress → Blocked → Done`.
- Add evidence in the Notes column: file, URL, test result, or decision.
- Do not mark an item Done because code exists. Mark it Done only when its stated completion criteria pass.
- Keep the **Next three actions** accurate. They are the default work queue.

## North-star outcome

Within 90 days, validate a repeatable AI Operations service capable of reaching **500,000 THB/month**, beginning with one paid Pilot from a qualified Thai SME.

The commercial path is:

```text
Audience
  → Landing page
  → Workflow Assessment
  → Qualified lead
  → 30-minute discovery
  → Sales proposal
  → 49,000 THB Pilot
  → 149,000 THB implementation
  → 25,000 THB/month maintenance
```

## Big picture

### Phase 1 — Make the offer understandable

**Goal:** An SME owner understands the problem, outcome, risk, and next step within 30 seconds.

Success signals:

- The page speaks to the customer rather than describing our internal strategy.
- The main promise is tied to a concrete workflow and measurable time saving.
- Privacy is explained as business control, not infrastructure jargon.
- The 49,000 THB Pilot feels like a controlled test rather than a large technology purchase.

### Phase 2 — Capture and qualify demand

**Goal:** Every interested visitor has a low-friction path to become a usable lead.

Success signals:

- Assessment submission reaches a shared lead database.
- Contact consent, preferred channel, source, and lead score are recorded.
- Sales receives a notification and knows the next action.
- The customer receives confirmation without being cold-called.

### Phase 3 — Convert leads into meetings

**Goal:** Qualified leads book a 30-minute Workflow Assessment.

Success signals:

- LINE Official Account and booking page are connected.
- Hot leads receive a human response within two business hours.
- The meeting has a consistent agenda and qualification checklist.
- No lead remains without an owner, stage, or next-follow-up date.

### Phase 4 — Convert meetings into paid Pilots

**Goal:** Send a relevant proposal quickly and make the buying decision easy.

Success signals:

- Proposal uses the customer's actual workflow, baseline time, and desired result.
- Scope, exclusions, data handling, timeline, and price are explicit.
- Proposal is sent within one business day after discovery.
- Follow-up sequence continues until Won, Lost, or a future date is agreed.

### Phase 5 — Deliver proof and expand

**Goal:** Turn the Pilot into implementation and recurring maintenance.

Success signals:

- Before/after metrics are agreed before building.
- Pilot produces a usable output with human approval.
- Customer signs off on measured results.
- Implementation and maintenance proposal follows from evidence, not assumptions.

## Current status

| Workstream | Status | Completion criteria | Notes |
| --- | --- | --- | --- |
| Customer-facing landing page | Done | Responsive page communicates problem, outcome, privacy, offer, and CTA | Implemented at `/` |
| Deterministic sales demo | Done | Complete RFQ-to-quotation story runs without external AI dependency | Implemented at `/demo` |
| Workflow Assessment UI | Done | Three questions, contact preference, and consent are captured | Local fallback currently active without webhook |
| Lead scoring | Done | Frequency, team size, and channel produce a stored score | Implemented in `src/lib/leadCapture.ts` |
| Google Sheet automation code | Done | Script can create sheet, validate leads, notify sales, and schedule follow-up | `automation/google-apps-script/Code.gs` |
| Production lead database | In progress | A real form submission appears in the shared Google Sheet | Browser submissions confirmed at `Leads!A201:R202`; `appendRow()` skips to row 201 because formulas occupy earlier rows, and incoming field order does not match the dashboard columns |
| LINE Official Account connection | In progress | CTA opens the correct OA and ownership is confirmed | LINE URL configured; mobile ownership test pending |
| Appointment booking | In progress | Prospect can book an available 30-minute slot and both parties receive confirmation | Public Appointment Schedule URL verified; completed booking and confirmation test pending |
| Email deliverability | Not started | Test messages reach inbox, sender identity is correct, and unsubscribe handling is documented | Apps Script uses owner Google account initially |
| Analytics and attribution | In progress | Page view, demo start, assessment start, submission, LINE click, and booking click are measurable | UTM source is stored; event analytics not connected |
| Sales operating process | In progress | Owner, SLA, stages, qualification checklist, and follow-up rules are practiced | Rules documented; live rehearsal pending |
| Sales proposal | In progress | Customer-specific proposal can be sent within one business day | Base proposal exists; Google Docs workflow needs activation |
| Event readiness | In progress | Full 5–7 minute run succeeds on laptop, mobile hotspot, and offline fallback | Deterministic demo exists; rehearsal and recording pending |
| Production deployment | Not started | Main branch is deployed, domain works, HTTPS is valid, and forms are tested | CI exists; production verification pending |

## Next three actions

### 1. Activate the real lead pipeline — highest priority

**Owner input required:** Google account with permission to create a Sheet and deploy Apps Script.

Steps:

1. Create the Apps Script project from `automation/google-apps-script/Code.gs`.
2. Add `LINE_OA_URL` and `BOOKING_URL` in Script Properties.
3. Run `setup()` and authorize the requested scopes.
4. Deploy as a Web App and set `VITE_LEAD_WEBHOOK_URL`.
5. Submit three test leads: email, LINE, and scheduled call.
6. Verify Sheet rows, scores, sales alerts, customer email, and follow-up dates.

Done when: all three test leads complete the expected workflow without manual data copying.

### 2. Connect the customer communication channels

**Owner input required:** official LINE OA URL and Google Calendar booking page.

Steps:

1. Set `VITE_LINE_OA_URL` and confirm the OA profile looks trustworthy.
2. Create a 30-minute booking type with buffer time and a short intake question.
3. Set `VITE_BOOKING_URL`.
4. Test LINE and booking CTAs on iPhone, Android, and desktop.
5. Prepare saved LINE replies for new lead, appointment confirmation, reminder, and post-meeting summary.

Done when: a prospect can choose a channel and reach a real conversation or confirmed appointment in under two minutes.

### 3. Rehearse the event conversion path

Steps:

1. Run the 5–7 minute demo from the event laptop.
2. Ask a person unfamiliar with the project to explain the offer after watching.
3. Confirm the QR code lands on the production assessment section with event UTM tags.
4. Record a fallback demo video and store it locally.
5. Rehearse the transition from demo to the 49,000 THB Pilot offer.
6. Test the complete flow from QR scan to sales notification.

Done when: three consecutive rehearsals finish within seven minutes and create a correctly attributed lead.

## Work before the event

| Priority | Task | Status | Target | Verification |
| --- | --- | --- | --- | --- |
| P0 | Deploy Apps Script and connect Google Sheet | In progress | 7 Sep | LINE-channel test passed; email and scheduled-call submissions remain |
| P0 | Add official LINE OA and booking URLs | In progress | 7 Sep | Both URLs configured; mobile CTA and completed booking tests remain |
| P0 | Deploy current `main` to production | Not started | 8 Sep | Domain, HTTPS, `/`, and `/demo` pass smoke test |
| P0 | Add event QR code with UTM attribution | Not started | 8 Sep | Submission records `sme-connect-rayong-2026` |
| P0 | Rehearse and record offline fallback | Not started | 10 Sep | Three successful timed runs plus local video |
| P1 | Add conversion analytics | Not started | 9 Sep | Six funnel events visible in analytics |
| P1 | Prepare LINE saved replies and discovery agenda | Not started | 9 Sep | Team can handle a sample lead consistently |
| P1 | Test email sender and spam placement | Not started | 10 Sep | Gmail and business-domain inbox tests pass |
| P1 | Create customer-specific proposal template | In progress | 10 Sep | Proposal can be generated in under 30 minutes |
| P2 | Add one additional workflow example | Not started | After P0 | Only if it strengthens the target segment story |

## Metrics dashboard

Track daily during the event campaign and weekly afterward.

| Funnel stage | Metric | Initial target |
| --- | --- | ---: |
| Attention | Landing page visitors | 200 |
| Intent | Demo starts / visitors | 30% |
| Conversion | Assessment submissions / visitors | 10% |
| Qualification | Qualified leads / submissions | 50% |
| Meeting | Meetings booked / qualified leads | 50% |
| Proposal | Proposals sent / meetings | 60% |
| Sale | Paid Pilots / proposals | 25% |
| Expansion | Implementation wins / completed Pilots | 40% |

These are planning assumptions, not proven benchmarks. Replace them with observed numbers after the first campaign.

## Discovery meeting checklist

Capture these facts before proposing a Pilot:

- What triggers the workflow?
- Who performs each step today?
- How often does it occur?
- How long does one case take?
- Which files and systems are used?
- Which business rules must never be violated?
- Which data is confidential or regulated?
- Who approves the final output?
- What measurable result would make the Pilot successful?
- Who owns the budget and final decision?

## Pilot acceptance criteria

Every Pilot must define:

- one workflow and one accountable customer owner;
- baseline time, volume, and error rate;
- input sources and allowed data boundaries;
- expected output and human approval point;
- target time saving or quality improvement;
- test cases and sign-off method;
- exclusions and change-control rules; and
- next commercial decision after the Pilot.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Form appears successful but no central webhook is configured | Production checklist requires a real Sheet row test before launch |
| Thai prospects ignore marketing email | Default to customer-selected LINE; use email for summaries and documents |
| Prospects distrust unknown calls | Never cold-call; call only after explicit selection or appointment |
| Concern about confidential data | Explain deployment choices and never collect company documents through the public form |
| Demo depends on unstable internet | Keep deterministic and recorded offline fallbacks on the event laptop |
| 49,000 THB feels expensive without proof | Anchor the price to one measurable workflow and agree acceptance criteria first |
| Leads are collected but not followed up | Every lead requires an owner, stage, SLA, and next-follow-up date |

## Decision log

| Date | Decision | Reason |
| --- | --- | --- |
| 5 Sep 2026 | Position the service as AI that completes business workflows | More concrete than chatbot or LLM positioning |
| 5 Sep 2026 | Use quotation preparation as the primary demonstration | Common, measurable SME pain with a clear business output |
| 5 Sep 2026 | Use LINE as the preferred conversation path | Better fit for Thai customer behavior than email-only outreach |
| 5 Sep 2026 | Do not use unsolicited calls | Low trust due to scam-call prevalence |
| 5 Sep 2026 | Start with a 49,000 THB controlled Pilot | Reduces buyer risk before implementation investment |

## Update log

| Date | Update |
| --- | --- |
| 5 Sep 2026 | Initial execution plan created from the implemented landing page, demo, lead workflow, and event objective. |
| 5 Sep 2026 | Added Apps Script and LINE URLs; marked lead pipeline for verification and identified that the Calendar URL is not yet a booking page. |
| 5 Sep 2026 | Replaced the Calendar URL with a verified public Appointment Schedule URL; full booking confirmation test remains. |
| 5 Sep 2026 | Investigated a missing browser lead; verified environment and endpoint, then changed browser transport to no-cors with a local recovery copy. |
| 5 Sep 2026 | Located browser leads at rows 201–202; diagnosed prefilled formulas affecting `appendRow()` and a column-schema mismatch between Apps Script and the Sheet dashboard. |
