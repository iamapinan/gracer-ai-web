# Repository Agent Instructions

## Required context

Before planning or making material changes, read:

1. `EXECUTION_PLAN.md`
2. `PROJECT_CONTEXT.md`
3. The task-specific document when relevant:
   - `DEMO_SCRIPT.md` for the sales demonstration
   - `LEAD_WORKFLOW_SETUP.md` for lead capture and follow-up
   - `SALES_PROPOSAL.md` for the commercial offer

## Keep the execution plan current

`EXECUTION_PLAN.md` is the source of truth for priorities and delivery status.

For every material task:

1. Check that the task supports the current North-star outcome or a listed workstream.
2. Set the relevant item to `In progress` before substantial implementation when it is not already active.
3. When work finishes, update its status and add concrete evidence such as a file, URL, test, or decision.
4. Update **Next three actions** whenever a priority is completed, blocked, or displaced.
5. Add important scope, pricing, channel, privacy, or architecture decisions to the Decision log.
6. Add one concise entry to the Update log for each meaningful plan revision.
7. Update the **Last updated** date. Do not change dates or statuses when no meaningful plan change occurred.

Do not mark an item `Done` when external activation or verification is still required. Use `Blocked` and name the missing account, credential, approval, or decision.

## Product principles

- Speak to SME customers in terms of their work, time, revenue, risk, and control.
- Position Gracer AI as AI that completes useful business workflows, not as a chatbot or generic LLM platform.
- Preserve the **Before → AI → After** narrative.
- Keep a human approval step for customer-facing business outputs.
- Never imply that sensitive customer data must be uploaded to a public AI service.
- Prefer customer-selected LINE or scheduled appointments over unsolicited calls.
- Do not claim the lead pipeline is production-ready until a real webhook submission is verified in the shared Google Sheet.

## Engineering principles

- Make the smallest change that satisfies a verified business need.
- Preserve the deterministic offline demo path.
- Do not add a full CRM, ERP, authentication system, or infrastructure layer without an explicit requirement.
- Treat environment URLs, account IDs, tokens, and deployment credentials as configuration; never hard-code secrets.
- Run `npm run build` after application-code changes.
- Keep unrelated user changes intact.

## Definition of done

A task is complete only when:

- the requested behavior exists;
- the relevant build or focused verification passes;
- customer-facing wording is accurate;
- production dependencies and limitations are documented; and
- `EXECUTION_PLAN.md` reflects the resulting state when the task materially changes the roadmap.
