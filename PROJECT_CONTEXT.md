# SME AI Operations Demo — Project Context

## Project Overview

This project is being developed for **AI Builder Hub: SME CONNECT Rayong 2026**, taking place on **14 September 2026**.

The broader business objective extends beyond the event: validate an **AI Transformation / AI Operations service for Thai SMEs**.

### Business Targets

- Initial revenue target: **500,000 THB/month within approximately 90 days**
- Use the event to acquire qualified SME leads
- Ideally secure the first paid pilot at or shortly after the event

### Commercial Offers Under Validation

| Offer | Price |
| --- | ---: |
| Proof of Value | 49,000 THB |
| AI Operations Implementation | 149,000 THB |
| Maintenance / AI Ops | 25,000 THB/month |

## Positioning

### Core SME Pain Point

> Businesses already have people and data, but employees still perform repetitive manual work, the existing data is not fully utilized, and companies are concerned about confidential information leaking when using AI.

The solution must clearly communicate three benefits:

1. Reduce repetitive manual work
2. Turn existing company data into useful business actions
3. Keep sensitive company information under organizational control

### Positioning Principle

Position the product as:

> **AI that performs useful business workflows.**

Do **not** position it primarily as:

- A chatbot
- A RAG demo
- An LLM technology demo

## Target Customers

### Primary Segments

- Manufacturing SMEs
- Distributors and trading companies
- Logistics companies
- B2B service companies
- Multi-branch businesses

### High-Fit Business Characteristics

Prioritize businesses with operational workflows involving:

- Quotations
- Documents
- Product catalogs
- Price lists
- Internal knowledge
- Customer inquiries
- Repetitive reporting

## Main Demo

Build a **Private AI Sales & Document Assistant**.

The demo must communicate a clear narrative:

> **BEFORE → AI → AFTER**

### Before: Manual Workflow

Example customer request:

> ขอราคา Pump รุ่น XP-200 จำนวน 50 ตัว ส่งระยอง ขอภายในวันนี้

Normally, the salesperson must manually open and search through:

- Price list
- Product catalog
- Discount policy
- Delivery policy
- Stock and product information
- Previous quotations

The salesperson must then manually prepare a quotation and customer response.

### AI: Automated Workflow

The system should:

1. Accept the customer request
2. Detect customer intent
3. Extract product, quantity, and delivery information
4. Search internal company knowledge
5. Find relevant product information
6. Find the correct price
7. Check discount and business rules
8. Find relevant delivery terms
9. Show the information sources used
10. Prepare a quotation draft
11. Prepare a draft customer response
12. Wait for human approval

The AI must take action and produce a useful business output. It must not look like only a “chat with PDF” experience.

### After: Human Review

The salesperson's remaining workflow should be:

> **Review → Edit if required → Approve**

The demonstration must make the time saved immediately obvious.

## Privacy and Deployment

Privacy is a key differentiator. The architecture should support operating modes in which sensitive data remains under company control.

Potential deployment approaches include:

- Local LLM
- Private deployment
- Local or private vector data store
- Hybrid cloud/local architecture

During the 5–7 minute business demo, avoid over-explaining infrastructure. Communicate the business benefit simply:

> **Your company data stays under your control.**

Technical architecture can be discussed after the main demonstration.

## Demo Duration and Script

Maximum duration: **5–7 minutes**.

| Time | Segment |
| --- | --- |
| 0:00–1:00 | Explain the SME pain point |
| 1:00–2:00 | Show the manual “Before” workflow |
| 2:00–4:30 | Run the AI workflow live |
| 4:30–5:30 | Show the completed quotation and customer response |
| 5:30–6:30 | Explain privacy and private AI |
| 6:30–7:00 | Call to action |

### Call to Action

> If your business has a workflow that employees repeat every day, we would like to use one real workflow as a pilot and measure how much working time AI can actually reduce.

## User Interface

Create a polished but simple web application that a non-technical SME owner can understand within **30 seconds**.

### Suggested Layout

| Left | Center | Right |
| --- | --- | --- |
| Customer Request | AI Workflow / Processing Steps | Quotation Draft / Result |

Also display:

- Sources used
- Human approval state
- Knowledge base indicator
- Privacy and deployment indicator

## Demo Dataset

Create a fictional Thai industrial distributor:

> **Eastern Industrial Supply Co., Ltd.**

Prepare approximately **5–10 realistic documents**, including:

- Product catalog
- Price list
- Discount policy
- Delivery policy
- Product manuals
- FAQ
- Customer information
- Previous quotation samples

The dataset should be complex enough that manual searching feels inconvenient, while remaining simple and controlled enough for a deterministic live demo.

## Demo Reliability

The live demo must be highly reliable. Prepare three operating modes:

1. Live demo
2. Deterministic fallback mode
3. Offline or recorded fallback for internet or API failure

An external API outage or unstable event Wi-Fi must not prevent the presentation from succeeding.

## Engineering Principles

- Build the smallest usable demo first
- Do not build a full ERP
- Do not over-engineer authentication
- Do not add unrelated features
- Optimize for a reliable 5–7 minute live demonstration
- Keep the architecture extensible for real SME pilot projects
- Ensure every feature supports the **Before → AI → After** narrative

## Immediate Goal

The first milestone is a working end-to-end demo:

```text
Customer RFQ
  → AI understands the request
  → Retrieves internal information
  → Applies business rules
  → Produces a quotation draft
  → Displays sources
  → Requests human approval
```

### Initial Execution Sequence

1. Inspect the existing project folder
2. Propose the architecture and implementation plan
3. Begin implementation instead of stopping at documentation

## Definition of Success

The demo succeeds when a non-technical SME owner can quickly understand that the system:

- Converts a real customer request into a usable quotation draft
- Uses existing company knowledge and business rules
- Shows where its information came from
- Keeps a human in control of final approval
- Demonstrates clear time savings
- Can keep sensitive company data under organizational control
