export type Language = 'th' | 'en';

export type LocalText = Record<Language, string>;

export type ProductDetail = {
  name: string;
  category: LocalText;
  type: 'service' | 'product' | 'course' | 'platform';
  accent: 'violet' | 'teal' | 'coral' | 'indigo';
  promise: LocalText;
  description: LocalText;
  highlights: Array<{ value: LocalText; label: LocalText }>;
  features: Array<{ title: LocalText; description: LocalText }>;
  steps: Array<{ title: LocalText; description: LocalText }>;
  audiences: LocalText[];
  deliverables: LocalText[];
  source?: { label: LocalText; url: string };
};

const t = (th: string, en: string): LocalText => ({ th, en });

export const productDetails: Record<string, ProductDetail> = {
  'ai-integration': {
    name: 'AI Integration', category: t('AI Transformation', 'AI Transformation'), type: 'service', accent: 'violet',
    promise: t('เชื่อม AI เข้ากับระบบเดิม ให้ทีมทำงานได้เร็วขึ้นโดยไม่ต้องรื้อใหม่ทั้งหมด', 'Connect AI to the systems you already use—without rebuilding everything.'),
    description: t('เราออกแบบและพัฒนาการเชื่อมต่อ AI กับเว็บไซต์ แอป CRM, ERP, LINE, เอกสาร และฐานข้อมูลขององค์กร ตั้งแต่การหา use case ที่คุ้มค่าไปจนถึงระบบ production ที่วัดผลและดูแลต่อได้', 'We design and build production-ready AI integrations across websites, apps, CRM, ERP, LINE, documents and enterprise data—from use-case selection to measurable operations.'),
    highlights: [
      { value: t('เชื่อมระบบเดิม', 'Keep your stack'), label: t('ลดการเปลี่ยนเครื่องมือของทีม', 'Minimise tool switching') },
      { value: t('Human-in-the-loop', 'Human-in-the-loop'), label: t('กำหนดจุดตรวจสอบก่อนลงมือจริง', 'Approval at critical steps') },
      { value: t('วัดผลได้', 'Measurable'), label: t('ตั้ง KPI และ telemetry ตั้งแต่ต้น', 'KPIs and telemetry by design') },
    ],
    features: [
      { title: t('API & Data Integration', 'API & data integration'), description: t('เชื่อมโมเดล AI กับระบบภายใน ฐานข้อมูล และบริการภายนอกอย่างเป็นระบบ', 'Connect models with internal systems, databases and third-party services.') },
      { title: t('AI Assistant ในจุดทำงาน', 'AI at the point of work'), description: t('ฝังผู้ช่วยในเว็บ แอป LINE หรือ back office โดยไม่เพิ่มขั้นตอนเกินจำเป็น', 'Embed assistants in web, LINE and back-office workflows.') },
      { title: t('สิทธิ์และการตรวจสอบ', 'Access and audit'), description: t('ออกแบบสิทธิ์ ขอบเขตข้อมูล บันทึกกิจกรรม และจุดอนุมัติให้เหมาะกับความเสี่ยง', 'Design permissions, data boundaries, logs and approvals around risk.') },
      { title: t('Production Readiness', 'Production readiness'), description: t('ทดสอบคุณภาพ ความเร็ว ต้นทุน และ fallback ก่อนนำไปใช้กับผู้ใช้จริง', 'Test quality, latency, cost and fallbacks before launch.') },
    ],
    steps: [
      { title: t('ค้นหา use case', 'Find the use case'), description: t('เลือกงานที่มีผลกระทบสูงและวัด baseline ปัจจุบัน', 'Prioritise high-impact work and measure the current baseline.') },
      { title: t('ทำ prototype', 'Prototype'), description: t('เชื่อมข้อมูลจริงในขอบเขตเล็กเพื่อพิสูจน์คุณค่าและความเสี่ยง', 'Prove value and risk on a contained slice of real data.') },
      { title: t('นำขึ้น production', 'Ship and improve'), description: t('เพิ่มความปลอดภัย monitoring และรอบปรับปรุงจากผลใช้งาน', 'Add safeguards, monitoring and an improvement loop.') },
    ],
    audiences: [t('องค์กรที่มีระบบเดิมและต้องการเพิ่ม AI', 'Organisations adding AI to existing systems'), t('ทีมปฏิบัติการที่ทำงานซ้ำหลายระบบ', 'Operations teams working across fragmented tools'), t('เจ้าของผลิตภัณฑ์ที่ต้องการ AI feature ที่ใช้งานจริง', 'Product teams shipping practical AI features')],
    deliverables: [t('แผนสถาปัตยกรรมและ data flow', 'Architecture and data-flow plan'), t('ระบบ integration พร้อมสิทธิ์และ audit log', 'Integration with permissions and audit logs'), t('ชุดทดสอบและ dashboard วัดผล', 'Evaluation suite and outcome dashboard')],
  },
  'ai-workflow-consulting': {
    name: 'AI Workflow Consulting', category: t('AI Transformation', 'AI Transformation'), type: 'service', accent: 'violet',
    promise: t('เปลี่ยนงานที่กระจัดกระจายให้เป็น workflow ที่ AI และคนทำงานร่วมกันได้จริง', 'Turn fragmented work into a reliable human-and-AI operating flow.'),
    description: t('บริการวิเคราะห์กระบวนการ ออกแบบ workflow และจัดลำดับการนำ AI มาใช้ โดยเริ่มจากปัญหาธุรกิจ ความพร้อมของข้อมูล และผลลัพธ์ที่ต้องการ ไม่ได้เริ่มจากเครื่องมือ', 'We map operations, design workflows and sequence AI adoption around business outcomes, data readiness and risk—not around a particular tool.'),
    highlights: [
      { value: t('Workflow Map', 'Workflow map'), label: t('เห็นงาน คน ข้อมูล และคอขวดในภาพเดียว', 'People, data and bottlenecks in one view') },
      { value: t('ROI Priority', 'ROI priority'), label: t('จัดลำดับ use case ด้วยคุณค่าและ effort', 'Rank use cases by value and effort') },
      { value: t('Adoption Plan', 'Adoption plan'), label: t('วางเจ้าของงาน การอบรม และการวัดผล', 'Ownership, enablement and measurement') },
    ],
    features: [
      { title: t('Process Discovery', 'Process discovery'), description: t('สัมภาษณ์ผู้เกี่ยวข้องและตามรอยงานจริงเพื่อหางานซ้ำ จุดรอ และความเสี่ยง', 'Trace real work to uncover repetition, delay and operational risk.') },
      { title: t('AI Opportunity Matrix', 'AI opportunity matrix'), description: t('แยกงานที่ควรช่วยคิด ช่วยทำ ทำอัตโนมัติ หรือยังไม่ควรใช้ AI', 'Classify work as assist, automate, augment—or not suitable for AI.') },
      { title: t('Future-state Design', 'Future-state design'), description: t('ออกแบบ flow ใหม่พร้อมบทบาทของคน ระบบ ข้อมูล และขั้นตอนอนุมัติ', 'Define the future flow across people, systems, data and approvals.') },
      { title: t('Pilot Roadmap', 'Pilot roadmap'), description: t('กำหนด scope, KPI, owner, guardrail และแผนขยายผลที่ตัดสินใจได้', 'Set pilot scope, KPIs, owners, guardrails and scale criteria.') },
    ],
    steps: [
      { title: t('Understand', 'Understand'), description: t('ทำความเข้าใจเป้าหมายและ workflow ปัจจุบัน', 'Align on goals and the current workflow.') },
      { title: t('Redesign', 'Redesign'), description: t('เลือกโอกาสและออกแบบวิธีทำงานใหม่', 'Select opportunities and design the new operating model.') },
      { title: t('Pilot', 'Pilot'), description: t('ทดลอง วัดผล และสร้าง playbook สำหรับขยายผล', 'Pilot, measure and produce a scale-up playbook.') },
    ],
    audiences: [t('ผู้บริหารที่ต้องการ AI roadmap ที่ลงมือได้', 'Leaders who need an actionable AI roadmap'), t('ทีม Operations, Finance, Sales และ Customer Service', 'Operations, finance, sales and service teams'), t('องค์กรที่ลองหลายเครื่องมือแล้วแต่ยังไม่เกิด adoption', 'Teams with tools but limited adoption')],
    deliverables: [t('Current/Future workflow map', 'Current/future workflow maps'), t('Prioritised use-case backlog', 'Prioritised use-case backlog'), t('90-day pilot plan และ KPI', '90-day pilot plan and KPIs')],
  },
  'ai-erp': {
    name: 'AI ERP', category: t('AI Transformation', 'AI Transformation'), type: 'product', accent: 'violet',
    promise: t('ระบบหลังบ้านธุรกิจที่เชื่อมหน้าร้าน สมาชิก สต็อก และบัญชีไว้ในข้อมูลชุดเดียว', 'One operating system for storefront, members, inventory and finance.'),
    description: t('แพลตฟอร์มบริหารธุรกิจที่ต่อยอดจากระบบ LINE LIFF Member เชื่อมประสบการณ์ลูกค้า POS งานหลังบ้าน และบัญชี เหมาะกับร้านอาหารและ SME ที่ต้องการลดข้อมูลซ้ำและเห็นภาพธุรกิจครบขึ้น', 'A business operations platform evolved from the LINE LIFF Member system, connecting customer experience, POS, back office and accounting for restaurants and SMEs.'),
    highlights: [
      { value: t('LINE + POS', 'LINE + POS'), label: t('สมาชิก ออเดอร์ แต้ม และหน้าร้าน', 'Members, orders, loyalty and storefront') },
      { value: t('บัญชีคู่', 'Double-entry'), label: t('Journal, ledger และงบการเงิน', 'Journal, ledger and statements') },
      { value: t('Audit-ready', 'Audit-ready'), label: t('ประวัติรายการ เอกสาร และสิทธิ์ผู้ใช้', 'Transactions, documents and permissions') },
    ],
    features: [
      { title: t('สมาชิกและ Loyalty บน LINE', 'LINE membership & loyalty'), description: t('บัตรสมาชิกดิจิทัล แต้ม ระดับสมาชิก รางวัล และการสั่งซื้อผ่าน LINE LIFF', 'Digital member cards, points, tiers, rewards and ordering through LINE LIFF.') },
      { title: t('POS และงานหน้าร้าน', 'POS & store operations'), description: t('ขายหน้าร้าน โต๊ะ ใบเสร็จ ใบครัว เมนู modifier และโปรโมชั่น', 'Sales, tables, receipts, kitchen tickets, menus, modifiers and promotions.') },
      { title: t('บัญชีและการเงิน', 'Finance & accounting'), description: t('ผังบัญชี สมุดรายวัน บัญชีแยกประเภท งบทดลอง กำไรขาดทุน งบดุล และกระทบยอด', 'Chart of accounts, journals, ledgers, trial balance, P&L, balance sheet and reconciliation.') },
      { title: t('สต็อก ทรัพย์สิน และภาษี', 'Inventory, assets & tax'), description: t('ดูแลสต็อก ทะเบียนทรัพย์สิน ค่าเสื่อมราคา และรายงาน VAT/WHT ตามการตั้งค่า', 'Manage stock, assets, depreciation and configurable VAT/WHT reporting.') },
    ],
    steps: [
      { title: t('ตั้งโครงสร้างธุรกิจ', 'Set up operations'), description: t('กำหนดสาขา สินค้า สมาชิก พนักงาน และสิทธิ์', 'Configure branches, catalogues, members, staff and roles.') },
      { title: t('รวมธุรกรรม', 'Unify transactions'), description: t('เชื่อมการขาย ลูกค้า สต็อก และเอกสารเข้าสู่ระบบเดียว', 'Connect sales, customers, stock and documents.') },
      { title: t('อ่านภาพรวม', 'See the business'), description: t('ติดตามตัวเลข ประวัติ และรายการที่ต้องจัดการจากข้อมูลเดียวกัน', 'Track performance, history and exceptions from one source.') },
    ],
    audiences: [t('ร้านอาหารและธุรกิจบริการหลายช่องทาง', 'Restaurants and omnichannel service businesses'), t('SME ที่ต้องการรวม POS, CRM และบัญชี', 'SMEs consolidating POS, CRM and accounting'), t('ทีมที่ต้องการ workflow และ audit trail ชัดเจน', 'Teams that need clear workflows and audit trails')],
    deliverables: [t('ระบบสมาชิกและหน้าร้าน', 'Member and storefront operations'), t('โมดูลบัญชี สต็อก และเอกสาร', 'Accounting, inventory and document modules'), t('รายงานผู้บริหารและ audit log', 'Management reporting and audit logs')],
    source: { label: t('เปิดระบบสมาชิก', 'Visit member platform'), url: 'https://members.farmaroi.net/' },
  },
  'bull-docs': {
    name: 'Bull Docs: AI Business Accounting', category: t('AI Transformation', 'AI Transformation'), type: 'product', accent: 'violet',
    promise: t('เอกสารบัญชีธุรกิจไทยครบ flow พร้อมระบบอัตโนมัติและ AI ที่ตรวจสอบย้อนหลังได้', 'Thai business documents, automation and auditable AI in one workflow.'),
    description: t('ระบบเอกสารบัญชีแบบโอเพนซอร์สสำหรับใบเสนอราคา ใบวางบิล ใบแจ้งหนี้ ใบเสร็จ และใบกำกับภาษี รองรับหลายองค์กร VAT, WHT และการทำงานร่วมกันของทีม', 'An open-source document platform for quotations, billing notes, invoices, receipts and tax invoices, with multi-organisation support, VAT, WHT and team workflows.'),
    highlights: [
      { value: t('เอกสารครบ Flow', 'Full document flow'), label: t('จากใบเสนอราคาถึงใบเสร็จและภาษี', 'From quotation to receipt and tax') },
      { value: t('VAT / WHT', 'VAT / WHT'), label: t('รองรับบริบทธุรกิจไทย', 'Built for Thai business requirements') },
      { value: t('Open Source', 'Open source'), label: t('MIT และ PostgreSQL', 'MIT licensed with PostgreSQL') },
    ],
    features: [
      { title: t('สร้างเอกสารต่อเนื่อง', 'Connected documents'), description: t('แปลงเอกสารตาม workflow ลดการคีย์ซ้ำ พร้อมเลขเอกสารอัตโนมัติและ PDF', 'Convert documents through the workflow with automatic numbering and PDF output.') },
      { title: t('หลายองค์กรและทีม', 'Multi-organisation teams'), description: t('แยกหัวเอกสาร โลโก้ ธนาคาร ลายเซ็น ตราประทับ และสิทธิ์ของแต่ละองค์กร', 'Separate branding, banking, signatures, stamps and permissions per organisation.') },
      { title: t('Automation & Alerts', 'Automation & alerts'), description: t('เอกสารประจำ ส่งอีเมล PDF และแจ้งเตือนผ่าน Discord ตามเหตุการณ์สำคัญ', 'Recurring documents, emailed PDFs and event-based Discord alerts.') },
      { title: t('AI ผ่าน MCP', 'AI through MCP'), description: t('ให้ AI ค้นหาบริษัท นำเข้าลูกค้า และช่วยสร้างเอกสารภายใต้สิทธิ์และ log', 'Let AI find companies, import customers and prepare documents within permissions and logs.') },
    ],
    steps: [
      { title: t('ตั้งค่าองค์กร', 'Configure'), description: t('เพิ่มข้อมูลบริษัท ภาษี ธนาคาร และรูปแบบเลขเอกสาร', 'Add company, tax, banking and numbering settings.') },
      { title: t('ทำเอกสาร', 'Create'), description: t('สร้าง ส่ง และแปลงเอกสารตามสถานะงานจริง', 'Create, send and convert documents as work progresses.') },
      { title: t('ติดตามย้อนหลัง', 'Trace'), description: t('ดูการชำระเงิน ประวัติการทำงาน และ audit log ได้ครบ', 'Review payments, activity history and audit logs.') },
    ],
    audiences: [t('SME และสำนักงานบัญชี', 'SMEs and accounting practices'), t('ทีมขายและการเงินที่ทำเอกสารซ้ำ', 'Sales and finance teams with repetitive paperwork'), t('องค์กรที่ต้องการ self-host หรือปรับแต่งระบบ', 'Organisations that need self-hosting or customisation')],
    deliverables: [t('ชุดเอกสารธุรกิจและภาษี', 'Business and tax document suite'), t('Workflow การชำระและเอกสารประจำ', 'Payment and recurring-document workflows'), t('AI/MCP พร้อมสิทธิ์และบันทึกกิจกรรม', 'Permissioned AI/MCP with activity logs')],
    source: { label: t('เปิด Bull Docs', 'Visit Bull Docs'), url: 'https://bulldocs.gracer.ai/' },
  },
  'beok-boq': {
    name: 'beOK: AI-Powered BOQ', category: t('AI Transformation', 'AI Transformation'), type: 'product', accent: 'violet',
    promise: t('ถอดแบบ จัดทำ BOQ และประมาณราคา โดยเก็บหลักฐานให้ตรวจย้อนกลับได้', 'Turn construction drawings into auditable quantities, BOQs and estimates.'),
    description: t('Workspace สำหรับงานก่อสร้างไทยที่ให้ทีมอัปโหลดแบบ ระบุขอบเขตงาน แล้วใช้ AI ช่วยแยกรายการและปริมาณ ก่อนตรวจแก้สูตร ราคา และส่งออก Excel', 'A Thai construction workspace where teams upload drawings, define scope and use AI to prepare quantities before reviewing formulas, costs and Excel output.'),
    highlights: [
      { value: t('Drawing → BOQ', 'Drawing → BOQ'), label: t('เปลี่ยนแบบเป็นรายการงานที่แก้ไขต่อได้', 'Editable work items from drawings') },
      { value: t('วัสดุ + แรงงาน', 'Material + labour'), label: t('แยกต้นทุนและสรุปราคารวม', 'Split costs and total estimates') },
      { value: t('ตรวจย้อนกลับ', 'Auditable'), label: t('สูตร หน้า และตำแหน่งอ้างอิง', 'Formula, page and location evidence') },
    ],
    features: [
      { title: t('AI ช่วยถอดแบบ', 'AI-assisted takeoff'), description: t('วิเคราะห์แบบและคำอธิบายงานเพื่อจัดหมวดรายการและปริมาณเบื้องต้น', 'Analyse drawings and scope notes into preliminary categorised quantities.') },
      { title: t('หลักฐานประกอบทุกการคำนวณ', 'Evidence with calculations'), description: t('ผูกสูตรกับหน้าและตำแหน่งอ้างอิง พร้อมชี้ประเด็นที่ข้อมูลยังขาด', 'Link formulas to drawing locations and flag missing information.') },
      { title: t('แก้ไขร่วมกับผู้เชี่ยวชาญ', 'Expert review workspace'), description: t('ทีมปรับรายการ ปริมาณ ราคาวัสดุ ค่าแรง และสูตรได้ก่อนยืนยัน', 'Review and adjust items, quantities, material, labour and formulas.') },
      { title: t('สรุปและส่งออก', 'Estimate and export'), description: t('ดูงบประมาณรวมและส่งออก Excel เพื่อนำไปทำงานต่อ', 'Review the total estimate and export to Excel for downstream work.') },
    ],
    steps: [
      { title: t('แนบแบบ', 'Upload'), description: t('อัปโหลดแบบก่อสร้างและอธิบายขอบเขตงาน', 'Upload construction drawings and define the scope.') },
      { title: t('ถอดพร้อมหลักฐาน', 'Analyse'), description: t('AI เตรียมรายการ ปริมาณ สูตร และจุดอ้างอิง', 'AI prepares items, quantities, formulas and references.') },
      { title: t('ตรวจแล้วนำไปใช้', 'Review & export'), description: t('ผู้เชี่ยวชาญตรวจแก้และส่งออก BOQ', 'Experts review, adjust and export the BOQ.') },
    ],
    audiences: [t('ผู้รับเหมาและบริษัทก่อสร้าง', 'Contractors and construction firms'), t('Quantity Surveyor และทีมประมาณราคา', 'Quantity surveyors and estimating teams'), t('เจ้าของโครงการที่ต้องการหลักฐานตรวจสอบ', 'Project owners who need traceable evidence')],
    deliverables: [t('รายการ BOQ แยกหมวด', 'Categorised BOQ'), t('ต้นทุนวัสดุ ค่าแรง และสูตรคำนวณ', 'Material, labour and calculation details'), t('หลักฐานอ้างอิงและไฟล์ Excel', 'Evidence trail and Excel export')],
    source: { label: t('ทดลอง beOK BOQ', 'Explore beOK BOQ'), url: 'https://beok-boq.iamapinan.chatgpt.site/' },
  },
  'food-cost-profit-dna': {
    name: 'Food Cost & Profit DNA', category: t('AI Transformation', 'AI Transformation'), type: 'product', accent: 'violet',
    promise: t('รู้ว่าเมนูไหนทำเงินและเมนูไหนดูดกำไร โดยไม่ต้องกรอกสูตรทุกจาน', 'Find profitable and at-risk menu items without costing every recipe by hand.'),
    description: t('Profit Intelligence สำหรับร้านอาหารที่ประมาณต้นทุนจากข้อมูลไม่ครบ เรียนรู้รูปแบบเฉพาะของร้าน และถามเฉพาะข้อมูลที่ช่วยเพิ่มความแม่นยำ ก่อนสรุป Margin, Risk และคำแนะนำที่นำไปตัดสินใจได้', 'Restaurant profit intelligence that estimates incomplete costs, learns store-specific patterns and asks only high-value questions before surfacing margin, risk and recommendations.'),
    highlights: [
      { value: t('3–5 คำถาม', '3–5 questions'), label: t('เป้าหมายก่อนเห็น insight แรก', 'Target before the first insight') },
      { value: t('Cost Range', 'Cost range'), label: t('แสดงช่วงต้นทุนและ confidence', 'Estimated range with confidence') },
      { value: t('Store DNA', 'Store DNA'), label: t('เรียนรู้ portion ราคา และ waste ของร้าน', 'Learns portions, pricing and waste patterns') },
    ],
    features: [
      { title: t('Recipe Archetype', 'Recipe archetypes'), description: t('จัดกลุ่มอาหาร เครื่องดื่ม และสินค้าขายต่อด้วยโครงต้นทุนที่เหมาะกับแต่ละแบบ', 'Model food, made-to-order drinks and resale items with appropriate cost structures.') },
      { title: t('Question Minimizer', 'Question minimiser'), description: t('เลือกถามจาก uncertainty, financial impact และ effort เพื่อลดภาระการกรอกข้อมูล', 'Prioritise questions by uncertainty, financial impact and user effort.') },
      { title: t('Deterministic Cost Engine', 'Deterministic cost engine'), description: t('คำนวณต้นทุนแบบทำซ้ำได้ ส่วน LLM ใช้จำแนก สกัดข้อมูล และอธิบายผล', 'Keep calculations reproducible; use LLMs for classification, extraction and explanation.') },
      { title: t('Profit Map', 'Profit map'), description: t('แยกเมนู Healthy, Watch และ Risk พร้อม sensitivity และคำแนะนำ', 'Group items into Healthy, Watch and Risk with sensitivity and recommendations.') },
    ],
    steps: [
      { title: t('วางรายการเมนู', 'Add your menu'), description: t('ใส่ชื่อและราคา หรือเตรียมนำเข้าจากภาพและ POS', 'Paste names and prices, with image/POS import planned.') },
      { title: t('ตอบเฉพาะเรื่องสำคัญ', 'Answer what matters'), description: t('ระบบถามข้อมูลที่ลดความไม่แน่นอนได้มากที่สุด', 'The system asks for the highest-value missing inputs.') },
      { title: t('อ่าน Profit Map', 'Read the profit map'), description: t('เห็น margin ความเสี่ยง และลำดับสิ่งที่ควรแก้', 'See margin, risk and prioritised actions.') },
    ],
    audiences: [t('เจ้าของร้านอาหารและคาเฟ่', 'Restaurant and café owners'), t('ธุรกิจหลายสาขาที่ต้นทุนและ portion ต่างกัน', 'Multi-branch operators with varying costs'), t('ทีมที่ต้องการตรวจความคุ้มค่าของ delivery', 'Teams reviewing delivery profitability')],
    deliverables: [t('Cost range และ confidence ต่อเมนู', 'Cost range and confidence per item'), t('Store DNA calibration', 'Store DNA calibration'), t('Profit Health Report และคำแนะนำ', 'Profit health report and recommendations')],
    source: { label: t('ทดลอง Profit DNA', 'Explore Profit DNA'), url: 'https://profit-dna-engine.iamapinan.chatgpt.site/' },
  },
  homeplace: {
    name: 'HomePlace', category: t('AI Transformation', 'AI Transformation'), type: 'product', accent: 'violet',
    promise: t('ซื้อง่าย ขายไว ใกล้บ้านคุณ—ตลาดชุมชนผ่าน LINE ที่ร้านไม่ต้องเฝ้าแอป', 'A LINE-native community marketplace that keeps local buying and selling simple.'),
    description: t('ระบบสั่งซื้อภายในหมู่บ้านและคอนโดผ่าน LINE MINI App ลูกบ้านซื้อจากร้านในโครงการ ชำระตรงถึงร้าน ติดตามสถานะใน LINE และลงประกาศของใช้ได้โดยไม่ต้องติดตั้งแอปเพิ่ม', 'A LINE MINI App for neighbourhood and condominium commerce, with direct-to-store payments, order tracking and free community listings—without another app install.'),
    highlights: [
      { value: t('LINE MINI App', 'LINE MINI App'), label: t('เข้าใช้งานจากช่องทางที่คุ้นเคย', 'Open from a familiar channel') },
      { value: t('0% Platform GP', '0% platform GP'), label: t('ลูกค้าชำระตรงถึงร้าน', 'Customers pay stores directly') },
      { value: t('3 บทบาท', '3 roles'), label: t('ลูกบ้าน ร้านค้า และผู้ดูแลโครงการ', 'Residents, merchants and administrators') },
    ],
    features: [
      { title: t('ร้านค้าในโครงการ', 'Local storefronts'), description: t('เลือกร้านและสินค้า สั่งส่งถึงบ้านหรือรับเอง พร้อมราคาและค่าส่งจากระบบ', 'Browse stores, order delivery or pickup, with server-calculated totals.') },
      { title: t('รับออเดอร์โดยไม่เฝ้าแอป', 'Orders without app watching'), description: t('แจ้งเตือนผ่าน LINE และใช้สถานะงานที่เรียบง่ายตั้งแต่รับจนเสร็จ', 'Receive LINE alerts and manage a simple accept-to-done flow.') },
      { title: t('PromptPay และหลักฐาน', 'PromptPay & proof'), description: t('สแกนจ่าย แนบสลิป และเก็บประวัติรายการไว้ใน HomePlace', 'Pay by PromptPay, attach slips and retain order history.') },
      { title: t('ตลาดของใช้เพื่อนบ้าน', 'Community listings'), description: t('ลูกบ้านลงประกาศขาย ส่งต่อ หรือแจกฟรีได้โดยไม่ต้องเปิดร้าน', 'Residents can sell, pass on or give away household items without a merchant account.') },
    ],
    steps: [
      { title: t('เปิดจาก LINE', 'Open in LINE'), description: t('เข้าสู่ระบบและผูกข้อมูลโครงการหรือเลขห้องครั้งแรก', 'Sign in and connect to a property or room once.') },
      { title: t('เลือกและชำระ', 'Order & pay'), description: t('เลือกร้าน สินค้า วิธีรับ และชำระตรงถึงร้าน', 'Choose a store, fulfilment method and pay the merchant.') },
      { title: t('ติดตามในที่เดียว', 'Track in one place'), description: t('ร้านอัปเดตสถานะ ลูกบ้านติดตามผ่าน LINE และประวัติออเดอร์', 'Merchants update status; residents track it in LINE and order history.') },
    ],
    audiences: [t('หมู่บ้าน คอนโด และชุมชนปิด', 'Villages, condominiums and gated communities'), t('ร้านอาหาร ร้านของชำ และบริการใกล้บ้าน', 'Local food, retail and service merchants'), t('นิติบุคคลที่ต้องการช่วยเศรษฐกิจในชุมชน', 'Property managers supporting community commerce')],
    deliverables: [t('หน้าลูกบ้าน ร้านค้า และผู้ดูแล', 'Resident, merchant and administrator experiences'), t('ระบบออเดอร์ ชำระเงิน และแจ้งเตือน', 'Ordering, payment and notification flows'), t('ประกาศของใช้และข้อมูลภาพรวมโครงการ', 'Community listings and property overview')],
    source: { label: t('เปิด HomePlace', 'Visit HomePlace'), url: 'https://homeplace.gracer.ai/' },
  },
  gvents: {
    name: 'Gvents Event Platform', category: t('AI Transformation', 'AI Transformation'), type: 'product', accent: 'violet',
    promise: t('แพลตฟอร์มอีเวนต์ครบวงจร ตั้งแต่ค้นหาและขายบัตรจนถึงเช็กอินและดูแลหลังงาน', 'An end-to-end event platform from discovery and ticketing to check-in and follow-up.'),
    description: t('Gvents ช่วยผู้จัดสร้างและบริหารอีเวนต์ ขณะที่ผู้เข้าร่วมค้นหา ลงทะเบียน เลือกบัตรหรือที่นั่ง ชำระเงิน และเก็บบัตรดิจิทัลได้ใน flow เดียว', 'Gvents helps organisers run events while attendees discover, register, select tickets or seats, pay and keep digital tickets in one flow.'),
    highlights: [
      { value: t('Discover → Attend', 'Discover → attend'), label: t('เส้นทางผู้ร่วมงานครบในแพลตฟอร์ม', 'One attendee journey') },
      { value: t('Ticket + Seat', 'Ticket + seat'), label: t('บัตรหลายประเภทและผังที่นั่งแบบโต้ตอบ', 'Multiple passes and interactive seating') },
      { value: t('Thai Payments', 'Thai payments'), label: t('บัตรและ PromptPay/สลิป', 'Cards and PromptPay/slip flows') },
    ],
    features: [
      { title: t('ค้นหาและหน้าอีเวนต์', 'Discovery & event pages'), description: t('ค้นหาตามหมวด แท็ก วันที่ สถานที่ พร้อมกำหนดการ วิทยากร ผู้สนับสนุน และแผนที่', 'Search by category, tag, date and location with schedules, speakers, sponsors and maps.') },
      { title: t('ขายบัตรและที่นั่ง', 'Ticketing & seating'), description: t('รองรับบัตรหลายระดับ add-on ผังที่นั่ง inventory lock คูปอง และ waitlist', 'Support ticket tiers, add-ons, seating, inventory locks, coupons and waitlists.') },
      { title: t('ชำระเงินและบัตรดิจิทัล', 'Payments & ticket vault'), description: t('Checkout ผ่านบัตรหรือ PromptPay พร้อม QR แบบ dynamic, offline และไฟล์ PDF', 'Checkout by card or PromptPay with dynamic/offline QR and PDF tickets.') },
      { title: t('บริหารผู้เข้าร่วม', 'Attendee operations'), description: t('เช็กอิน โอนบัตร แจ้งเตือน วิดีโอหลังงาน และแบบประเมินในระบบเดียว', 'Handle check-in, transfers, notifications, post-event video and surveys.') },
    ],
    steps: [
      { title: t('สร้างงาน', 'Publish'), description: t('กำหนดรายละเอียด กำหนดการ สถานที่ และประเภทบัตร', 'Set details, programme, venue and ticket types.') },
      { title: t('เปิดขาย', 'Sell'), description: t('จัดการ inventory โปรโมชัน การชำระ และรายชื่อผู้ร่วมงาน', 'Manage inventory, promotions, payments and attendees.') },
      { title: t('หน้างานถึงหลังงาน', 'Operate'), description: t('เช็กอิน ส่งข้อมูล และต่อยอดประสบการณ์หลังจบงาน', 'Check in attendees and continue the experience after the event.') },
    ],
    audiences: [t('ผู้จัดสัมมนา เวิร์กช็อป และคอนเฟอเรนซ์', 'Seminar, workshop and conference organisers'), t('คอนเสิร์ต การแสดง และกิจกรรมมีที่นั่ง', 'Concerts, performances and seated events'), t('องค์กรที่ต้องการข้อมูลผู้เข้าร่วมครบวงจร', 'Organisations needing end-to-end attendee data')],
    deliverables: [t('หน้าขายบัตรและ event discovery', 'Ticket storefront and event discovery'), t('ระบบบัตร ที่นั่ง ชำระเงิน และเช็กอิน', 'Ticketing, seating, payment and check-in'), t('Organizer dashboard และข้อมูลหลังงาน', 'Organiser dashboard and post-event data')],
    source: { label: t('เปิด Gvents', 'Visit Gvents'), url: 'https://events.gracer.co.th/' },
  },
  gegi: {
    name: 'GeGi AI Control Plan', category: t('AI Governance', 'AI Governance'), type: 'product', accent: 'teal',
    promise: t('วางรางควบคุม AI ให้ทุกทีมใช้โมเดลได้อย่างมีนโยบาย หลักฐาน และการอนุมัติที่ชัดเจน', 'Give every AI workflow policy, evidence and accountable approval paths.'),
    description: t('Control plane สำหรับรวมการเข้าถึงโมเดล กำหนดนโยบาย ปกป้องข้อมูล และติดตามการใช้งาน รองรับ workflow แบบหลาย agent พร้อม Human-in-the-loop และ telemetry แบบเรียลไทม์', 'A control plane for model access, policy enforcement, data protection and observability, with multi-agent workflows, human approvals and real-time telemetry.'),
    highlights: [
      { value: t('Policy by Design', 'Policy by design'), label: t('กำหนดข้อห้าม สิทธิ์ และ approval', 'Rules, permissions and approvals') },
      { value: t('PII Protection', 'PII protection'), label: t('ปิดบังข้อมูลก่อนออกจากระบบและคืนค่าได้', 'Reversible masking before provider calls') },
      { value: t('Evidence Trail', 'Evidence trail'), label: t('ติดตามโมเดล token latency และการตัดสินใจ', 'Trace models, tokens, latency and decisions') },
    ],
    features: [
      { title: t('Unified Model Governance', 'Unified model governance'), description: t('ควบคุมการใช้หลาย provider ผ่านจุดเดียว พร้อม routing, fallback และโควตา', 'Control multiple providers through one gateway with routing, fallbacks and quotas.') },
      { title: t('Data Guardrails', 'Data guardrails'), description: t('ทำ masking ข้อมูลส่วนบุคคลและความลับองค์กรตาม policy ก่อนเรียกโมเดลภายนอก', 'Mask personal and corporate-sensitive data before external model calls.') },
      { title: t('Agent & Workflow Control', 'Agent & workflow control'), description: t('กำหนดบทบาท เครื่องมือ โมเดล และจุดอนุมัติของทีม agent แต่ละงาน', 'Set roles, tools, models and approval gates for agent teams.') },
      { title: t('Telemetry & Alerts', 'Telemetry & alerts'), description: t('ติดตาม latency, token, compression และงาน พร้อมแจ้งเตือน LINE/Discord', 'Monitor latency, tokens, compression and jobs with LINE/Discord alerts.') },
    ],
    steps: [
      { title: t('กำหนดขอบเขต', 'Define'), description: t('ระบุข้อมูล โมเดล เครื่องมือ และความเสี่ยงของแต่ละ use case', 'Map data, models, tools and risks per use case.') },
      { title: t('บังคับใช้นโยบาย', 'Enforce'), description: t('ใช้ policy, masking, access control และ approval ใน runtime', 'Apply policy, masking, access control and approvals at runtime.') },
      { title: t('ตรวจและปรับ', 'Observe'), description: t('อ่าน telemetry หลักฐาน และผลทดสอบเพื่อปรับระบบต่อเนื่อง', 'Use telemetry, evidence and evaluations to improve continuously.') },
    ],
    audiences: [t('องค์กรที่ใช้โมเดล AI หลายค่าย', 'Organisations using multiple AI providers'), t('ทีม Security, Risk, Legal และ IT', 'Security, risk, legal and IT teams'), t('ทีมที่สร้าง workflow หรือ agent ใน production', 'Teams operating workflows or agents in production')],
    deliverables: [t('Policy และ approval matrix', 'Policy and approval matrix'), t('Gateway พร้อม masking และ access control', 'Gateway with masking and access controls'), t('Telemetry, alerts และ evidence dashboard', 'Telemetry, alerts and evidence dashboard')],
  },
  'ai-gateway': {
    name: 'AI Gateway & Optimization', category: t('AI Governance', 'AI Governance'), type: 'service', accent: 'teal',
    promise: t('ใช้หลายโมเดลผ่านจุดเดียว พร้อมคุมคุณภาพ ความเร็ว ต้นทุน และความต่อเนื่อง', 'One governed endpoint for quality, speed, cost and resilience across models.'),
    description: t('เราออกแบบ AI Gateway ให้ระบบเลือกโมเดลตามประเภทงาน ควบคุมโควตา cache และ fallback พร้อมข้อมูลการใช้จริง เพื่อไม่ให้ผลิตภัณฑ์ผูกกับ provider เดียวหรือปรับต้นทุนแบบเดาสุ่ม', 'We build AI gateways that route by task, manage quotas, caching and fallbacks, and expose real usage data—reducing provider lock-in and guesswork.'),
    highlights: [
      { value: t('Multi-model', 'Multi-model'), label: t('เลือกโมเดลตามงาน ไม่ใช่ใช้ตัวเดียวทุกอย่าง', 'Fit models to tasks') },
      { value: t('Fallback', 'Fallback'), label: t('รองรับ provider error และ rate limit', 'Handle provider errors and rate limits') },
      { value: t('Cost Visibility', 'Cost visibility'), label: t('ติดตาม token latency และค่าใช้จ่าย', 'Track tokens, latency and spend') },
    ],
    features: [
      { title: t('Smart Routing', 'Smart routing'), description: t('ส่งงานไปยังโมเดลที่เหมาะตามคุณภาพ latency ราคา ความพร้อม และข้อกำหนดข้อมูล', 'Route by quality, latency, cost, availability and data requirements.') },
      { title: t('Resilience', 'Resilience'), description: t('เพิ่ม retry, timeout, circuit breaker และ fallback เพื่อให้บริการต่อเนื่อง', 'Add retries, timeouts, circuit breakers and fallbacks for continuity.') },
      { title: t('Cost Optimisation', 'Cost optimisation'), description: t('ใช้ cache, model tiers, context compression และ budget guardrails ตาม workload', 'Use caching, model tiers, context compression and budget guardrails.') },
      { title: t('Observability', 'Observability'), description: t('รวม log, trace, token, latency, error และ feedback สำหรับตรวจคุณภาพ', 'Unify logs, traces, tokens, latency, errors and quality feedback.') },
    ],
    steps: [
      { title: t('Baseline', 'Baseline'), description: t('วัด traffic คุณภาพ latency และต้นทุนของระบบปัจจุบัน', 'Measure current traffic, quality, latency and spend.') },
      { title: t('Route & Guard', 'Route & guard'), description: t('กำหนด policy และเส้นทางโมเดลตามประเภทงาน', 'Define policies and model routes by workload.') },
      { title: t('Optimise', 'Optimise'), description: t('ทดสอบ A/B และปรับจากข้อมูล production', 'Run evaluations and tune against production evidence.') },
    ],
    audiences: [t('ผลิตภัณฑ์ที่เรียก LLM หลาย provider', 'Products using multiple LLM providers'), t('ทีม Platform ที่ต้องการมาตรฐานกลาง', 'Platform teams needing a shared standard'), t('ระบบที่ต้องควบคุม SLA และต้นทุนต่อคำขอ', 'Systems with SLA and per-request cost targets')],
    deliverables: [t('Unified API และ routing policy', 'Unified API and routing policy'), t('Fallback, quota และ budget controls', 'Fallback, quota and budget controls'), t('Usage and quality observability', 'Usage and quality observability')],
  },
  'rag-sandbox': {
    name: 'RAG & Sandbox', category: t('AI Governance', 'AI Governance'), type: 'service', accent: 'teal',
    promise: t('ให้ AI ใช้ความรู้ขององค์กรและเครื่องมือจริงได้ โดยอยู่ในขอบเขตที่ทดลองและตรวจสอบได้', 'Ground AI in enterprise knowledge and let it act inside controlled boundaries.'),
    description: t('บริการออกแบบ RAG ตั้งแต่ ingestion, retrieval, citation และ evaluation พร้อม sandbox สำหรับคำสั่ง เครื่องมือ หรือ SQL เพื่อให้ทดลองกับข้อมูลจริงได้โดยจำกัดผลกระทบ', 'We design RAG from ingestion and retrieval to citation and evaluation, plus sandboxes for tools, commands or SQL so real-data experiments stay contained.'),
    highlights: [
      { value: t('Grounded Answers', 'Grounded answers'), label: t('ตอบจากแหล่งข้อมูลที่กำหนดพร้อมที่มา', 'Answers tied to approved sources') },
      { value: t('Safe Sandbox', 'Safe sandbox'), label: t('จำกัดสิทธิ์ เวลา ทรัพยากร และผลกระทบ', 'Bound permissions, time and impact') },
      { value: t('Evaluation', 'Evaluation'), label: t('วัด retrieval, faithfulness และ task success', 'Measure retrieval, faithfulness and success') },
    ],
    features: [
      { title: t('Knowledge Pipeline', 'Knowledge pipeline'), description: t('นำเข้า แบ่งส่วน ทำ metadata และกำหนดอายุข้อมูลจากเอกสารหรือฐานความรู้', 'Ingest, chunk, enrich and lifecycle-manage documents and knowledge bases.') },
      { title: t('Retrieval ที่เหมาะกับงาน', 'Task-fit retrieval'), description: t('ออกแบบ hybrid search, reranking, access filters และ context assembly', 'Design hybrid search, reranking, access filters and context assembly.') },
      { title: t('Citation & Evidence', 'Citation & evidence'), description: t('ให้คำตอบแสดงแหล่งอ้างอิงและเก็บ trace เพื่อทบทวนย้อนหลัง', 'Return sources and retain traces for review.') },
      { title: t('Tool / SQL Sandbox', 'Tool / SQL sandbox'), description: t('แยกพื้นที่ทดลอง จำกัดคำสั่ง สิทธิ์ เวลา และข้อมูลก่อนอนุญาตให้ทำงานจริง', 'Isolate experiments and constrain commands, permissions, runtime and data access.') },
    ],
    steps: [
      { title: t('Curate', 'Curate'), description: t('คัดข้อมูล กำหนดเจ้าของ สิทธิ์ และ freshness', 'Select sources and define ownership, access and freshness.') },
      { title: t('Retrieve & Test', 'Retrieve & test'), description: t('สร้าง retrieval และชุดคำถามทดสอบจากงานจริง', 'Build retrieval and a task-relevant evaluation set.') },
      { title: t('Contain & Release', 'Contain & release'), description: t('ทดลองใน sandbox แล้วเปิดสิทธิ์ทีละระดับตามหลักฐาน', 'Start sandboxed and expand permissions based on evidence.') },
    ],
    audiences: [t('ทีมที่มีเอกสารจำนวนมากและค้นหายาก', 'Teams with large, hard-to-search knowledge bases'), t('ผู้ช่วย AI ที่ต้องตอบพร้อมแหล่งอ้างอิง', 'Assistants that must answer with sources'), t('Agent ที่ต้องใช้เครื่องมือหรือฐานข้อมูลอย่างปลอดภัย', 'Agents that need safe tool or database access')],
    deliverables: [t('Ingestion และ retrieval pipeline', 'Ingestion and retrieval pipeline'), t('Citation, access filter และ evaluation set', 'Citations, access filters and evaluation set'), t('Sandbox policy และ release criteria', 'Sandbox policy and release criteria')],
  },
  'basic-ai-business': {
    name: 'Basic AI for Business', category: t('AI Training', 'AI Training'), type: 'course', accent: 'coral',
    promise: t('เริ่มใช้ AI กับงานธุรกิจอย่างเข้าใจ เลือกเครื่องมือเป็น และรู้ว่าข้อมูลใดไม่ควรส่งออกไป', 'Use AI at work with sound judgement, practical prompts and responsible data handling.'),
    description: t('เวิร์กช็อปพื้นฐานสำหรับเจ้าของธุรกิจและทีมงานที่ต้องการเปลี่ยนจาก “ลองถาม AI” ไปสู่การใช้กับงานจริง ตั้งแต่ prompt, การตรวจคำตอบ ไปจนถึงการเลือก use case แรกของทีม', 'A foundation workshop for business owners and teams moving from casual prompting to practical work, covering prompts, verification and selecting a first use case.'),
    highlights: [
      { value: t('No-code', 'No-code'), label: t('ไม่ต้องมีพื้นฐานโปรแกรม', 'No programming background required') },
      { value: t('Hands-on', 'Hands-on'), label: t('ฝึกจากงานเอกสาร ข้อมูล และการสื่อสาร', 'Practice on documents, data and communication') },
      { value: t('AI Safety', 'AI safety'), label: t('รู้ขอบเขตข้อมูลและวิธีตรวจคำตอบ', 'Handle data and verify outputs') },
    ],
    features: [
      { title: t('AI Literacy', 'AI literacy'), description: t('เข้าใจว่า LLM ทำอะไรได้ ข้อจำกัด hallucination และวิธีเลือกเครื่องมือให้เหมาะ', 'Understand LLM capabilities, hallucinations and tool selection.') },
      { title: t('Prompt สำหรับงานจริง', 'Practical prompting'), description: t('เขียนโจทย์ด้วย context, constraint, example และ output format ที่ชัดเจน', 'Use context, constraints, examples and output formats effectively.') },
      { title: t('ตรวจคำตอบและข้อมูล', 'Verification & data'), description: t('ฝึก fact-check, source-check และแยกข้อมูลที่แชร์ได้หรือควรปกป้อง', 'Practise fact-checking, source checks and sensitive-data judgement.') },
      { title: t('Mini Use-case Lab', 'Mini use-case lab'), description: t('นำงานของผู้เรียนมาสร้าง template และวิธีใช้ที่ทำซ้ำได้', 'Turn a real task into a repeatable AI-assisted template.') },
    ],
    steps: [
      { title: t('Learn', 'Learn'), description: t('เข้าใจหลักการและข้อจำกัดผ่านตัวอย่างธุรกิจ', 'Learn principles and limits through business examples.') },
      { title: t('Practice', 'Practice'), description: t('ทำแบบฝึกหัดกับข้อความ เอกสาร และข้อมูล', 'Work through text, document and data exercises.') },
      { title: t('Apply', 'Apply'), description: t('กลับไปพร้อม use case และ prompt toolkit ของตัวเอง', 'Leave with a personal use case and prompt toolkit.') },
    ],
    audiences: [t('เจ้าของธุรกิจและผู้บริหารที่เริ่มใช้ AI', 'Business owners and leaders starting with AI'), t('ทีม Marketing, Sales, HR และ Operations', 'Marketing, sales, HR and operations teams'), t('พนักงานที่ต้องการใช้ AI อย่างปลอดภัยและมีคุณภาพ', 'Employees who need safe, high-quality AI practices')],
    deliverables: [t('Prompt toolkit สำหรับงานประจำ', 'A practical prompt toolkit'), t('Checklist ตรวจคำตอบและข้อมูลอ่อนไหว', 'Output and sensitive-data checklist'), t('แผนทดลอง use case แรก', 'A first-use-case experiment plan')],
  },
  'advanced-workflow': {
    name: 'Advanced AI Workflow Development', category: t('AI Training', 'AI Training'), type: 'course', accent: 'coral',
    promise: t('ออกแบบและสร้าง AI workflow ที่เชื่อมข้อมูล เครื่องมือ และการตัดสินใจได้จริง', 'Design production-minded AI workflows that connect data, tools and decisions.'),
    description: t('เวิร์กช็อปเชิงปฏิบัติสำหรับคนที่ใช้ AI อยู่แล้วและต้องการขยับจาก prompt เดี่ยวไปสู่ workflow หลายขั้น พร้อม structured output, tool calling, RAG, evaluation และ Human-in-the-loop', 'A practical workshop for experienced AI users moving from single prompts to multi-step workflows with structured outputs, tools, RAG, evaluation and human review.'),
    highlights: [
      { value: t('Build End-to-end', 'Build end-to-end'), label: t('ตั้งแต่ input ถึงผลลัพธ์ที่ระบบอื่นใช้ต่อได้', 'From input to downstream-ready output') },
      { value: t('Evaluate', 'Evaluate'), label: t('สร้าง test cases และเกณฑ์ผ่านก่อน deploy', 'Tests and release criteria before deployment') },
      { value: t('Guardrails', 'Guardrails'), label: t('เพิ่ม validation, retry และ approval', 'Validation, retries and approvals') },
    ],
    features: [
      { title: t('Workflow Architecture', 'Workflow architecture'), description: t('แยกขั้นตอน model, code, retrieval, tool และ human decision ให้ดูแลต่อได้', 'Separate models, code, retrieval, tools and human decisions cleanly.') },
      { title: t('Structured Output & Tools', 'Structured output & tools'), description: t('ออกแบบ schema, validation และ tool calling ที่ระบบเชื่อถือได้', 'Design reliable schemas, validation and tool calls.') },
      { title: t('RAG & Context', 'RAG & context'), description: t('เลือกความรู้ ประกอบ context และอ้างอิงข้อมูลโดยไม่ยัดทุกอย่างเข้า prompt', 'Retrieve, assemble and cite context without overloading prompts.') },
      { title: t('Evaluation & Operations', 'Evaluation & operations'), description: t('สร้างชุดทดสอบ log, cost/latency budget, fallback และ monitoring', 'Build evals, logs, budgets, fallbacks and monitoring.') },
    ],
    steps: [
      { title: t('Design', 'Design'), description: t('แตกโจทย์และกำหนด contract ของแต่ละขั้นตอน', 'Decompose the job and define step contracts.') },
      { title: t('Build', 'Build'), description: t('เชื่อมโมเดล ข้อมูล เครื่องมือ และ approval', 'Connect models, data, tools and approvals.') },
      { title: t('Break & Improve', 'Break & improve'), description: t('ทดสอบเคสพัง วัดผล และเตรียมระบบก่อน production', 'Probe failures, evaluate and harden for production.') },
    ],
    audiences: [t('Developer และ Technical Product Owner', 'Developers and technical product owners'), t('Automation/Operations specialist ที่ใช้ AI อยู่แล้ว', 'Automation and operations specialists'), t('ทีมที่กำลังทำ chatbot, copilot หรือ agent', 'Teams building chatbots, copilots or agents')],
    deliverables: [t('Workflow blueprint และ schema', 'Workflow blueprint and schemas'), t('ต้นแบบที่เชื่อม tool/RAG', 'Tool/RAG-connected prototype'), t('Evaluation set และ production checklist', 'Evaluation set and production checklist')],
  },
  '10x-sme': {
    name: '10X AI Business Workshop for SMEs', category: t('AI Training', 'AI Training'), type: 'course', accent: 'coral',
    promise: t('Learn with Me แล้วสร้าง AI Co-Pilot จากสถานการณ์ธุรกิจจริง พร้อมคำปรึกษา 1-on-1', 'Learn by building an AI co-pilot for a real business scenario, with 1-on-1 guidance.'),
    description: t('เวิร์กช็อปสำหรับ SME, Retail, F&B และธุรกิจบริการ เน้นลงมือสร้าง workflow สำหรับการตลาด แชตลูกค้า เอกสาร และงานหลังบ้านด้วย Gemini, Claude และ Codex ก่อนนำผลงานมา Showcase', 'A workshop for SMEs, retail, F&B and service businesses to build workflows for marketing, customer chat, documents and operations with Gemini, Claude and Codex, followed by a showcase.'),
    highlights: [
      { value: t('1 วันเต็ม', 'Full-day workshop'), label: t('เรียนและรัน workflow ไปพร้อมผู้สอน', 'Build workflows step by step') },
      { value: t('3 ชั่วโมง', '3 hours'), label: t('สิทธิ์ปรึกษา 1-on-1 เพื่อปรับงานจริง', '1-on-1 workflow consultation') },
      { value: t('Showcase', 'Showcase'), label: t('นำเสนอผลงานและสรุปบทเรียน', 'Present the build and consolidate learning') },
    ],
    features: [
      { title: t('Business Scenario Lab', 'Business scenario lab'), description: t('เลือกงานที่กินเวลาและแปลงเป็น AI Co-Pilot ที่ทดลองกับงานจริง', 'Turn a time-consuming business task into a working AI co-pilot.') },
      { title: t('Marketing & Customer Workflows', 'Marketing & customer workflows'), description: t('ฝึก Content Matrix, Ad Copy หลาย persona และการช่วยตอบลูกค้า', 'Build content matrices, persona-led ad copy and customer-response support.') },
      { title: t('Operations Automation', 'Operations automation'), description: t('ออกแบบ workflow เอกสาร SOP, feedback และการเชื่อม CRM/ERP', 'Design workflows for documents, SOPs, feedback and CRM/ERP connections.') },
      { title: t('1-on-1 Consulting', '1-on-1 consulting'), description: t('ตรวจและปรับ workflow ให้เข้ากับระบบ ข้อมูล และเป้าหมายของแต่ละธุรกิจ', 'Refine each workflow around the business, its systems, data and goals.') },
    ],
    steps: [
      { title: t('Learn with Me', 'Learn with me'), description: t('เรียนและสร้าง workflow แบบทีละขั้นในวันเวิร์กช็อป', 'Build step by step during the live workshop.') },
      { title: t('Consult 1-on-1', 'Consult 1-on-1'), description: t('นัดหมายปรับระบบกับโจทย์จริงของผู้เรียน', 'Adapt the build to the participant’s real situation.') },
      { title: t('Showcase', 'Showcase'), description: t('นำเสนอสิ่งที่สร้าง รับ feedback และวางขั้นต่อไป', 'Present, gather feedback and define the next step.') },
    ],
    audiences: [t('เจ้าของ SME, E-commerce และ Retail', 'SME, e-commerce and retail owners'), t('ผู้บริหาร F&B และธุรกิจบริการ', 'F&B and service-business leaders'), t('ทีม Marketing/Content และผู้เรียนแบบ no-code', 'Marketing/content teams and no-code learners')],
    deliverables: [t('AI Co-Pilot ตาม business scenario', 'A scenario-specific AI co-pilot'), t('Workflow ที่ปรับผ่าน 1-on-1', 'A workflow refined in consultation'), t('ผลงาน Showcase และแผนนำไปใช้ต่อ', 'Showcase-ready output and adoption plan')],
    source: { label: t('ดูรายละเอียดเวิร์กช็อป', 'View workshop details'), url: 'https://events.gracer.co.th/event/detail/sr7iaf0tvkg-1785999269236' },
  },
  llm: {
    name: 'Gracer AI LLM', category: t('Gracer AI Platform', 'Gracer AI Platform'), type: 'platform', accent: 'indigo',
    promise: t('โมเดลภาษาใช้งานในองค์กรได้ทั้ง local และ hybrid เพื่อความเป็นส่วนตัวและความคล่องตัว', 'Business-ready language models for local and hybrid deployment.'),
    description: t('แพลตฟอร์ม LLM สำหรับงานในองค์กร รองรับโมเดลหลายขนาดเพื่อปรับให้เหมาะกับอุปกรณ์ ความเร็ว และความซับซ้อนของงาน พร้อมแนวทางใช้งานแบบข้อมูลอยู่ในพื้นที่ควบคุม', 'An enterprise LLM platform with multiple model sizes to balance hardware, latency and task complexity, including deployment patterns that keep data in controlled environments.'),
    highlights: [
      { value: t('1B–24B', '1B–24B'), label: t('ตัวเลือกขนาดโมเดลตาม workload', 'Model sizes for varied workloads') },
      { value: t('Local / Hybrid', 'Local / hybrid'), label: t('เลือกรูปแบบ deployment ตามข้อมูล', 'Deploy according to data needs') },
      { value: t('Low Latency', 'Low latency'), label: t('ประมวลผลใกล้จุดใช้งาน', 'Process close to the point of use') },
    ],
    features: [
      { title: t('Model Portfolio', 'Model portfolio'), description: t('เลือกรุ่น 1B, 4B, 7B หรือ 24B ตามคุณภาพ ทรัพยากร และความเร็วที่ต้องการ', 'Choose 1B, 4B, 7B or 24B models by quality, compute and latency needs.') },
      { title: t('Private Deployment', 'Private deployment'), description: t('ใช้งานในเครื่องหรือสภาพแวดล้อมขององค์กรเมื่องานไม่ควรส่งข้อมูลออก', 'Run locally or in controlled environments for sensitive workloads.') },
      { title: t('Hybrid Routing', 'Hybrid routing'), description: t('ผสม local และ cloud model ตามประเภทงาน policy และข้อจำกัดด้านต้นทุน', 'Combine local and cloud models according to task, policy and cost.') },
      { title: t('Integration Ready', 'Integration ready'), description: t('เชื่อมกับแอป workflow, RAG และ AI Gateway เพื่อใช้งานเป็นระบบ', 'Connect with apps, workflows, RAG and AI gateways.') },
    ],
    steps: [
      { title: t('Assess', 'Assess'), description: t('ดู workload ภาษา ข้อมูล และ hardware ที่มี', 'Review workloads, language, data and available hardware.') },
      { title: t('Fit', 'Fit'), description: t('เลือกโมเดลและ deployment pattern ที่เหมาะ', 'Select the model and deployment pattern.') },
      { title: t('Integrate', 'Integrate'), description: t('เชื่อมระบบ ทดสอบคุณภาพ และติดตามการใช้งาน', 'Integrate, evaluate quality and monitor usage.') },
    ],
    audiences: [t('องค์กรที่ต้องการให้ข้อมูลอยู่ในพื้นที่ควบคุม', 'Organisations keeping data in controlled environments'), t('ระบบที่ต้องการตอบสนองเร็วและค่าใช้จ่ายคาดการณ์ได้', 'Systems needing low latency and predictable cost'), t('ทีมที่ต้องการผสม local และ cloud AI', 'Teams combining local and cloud AI')],
    deliverables: [t('Model/deployment recommendation', 'Model and deployment recommendation'), t('Runtime และ integration endpoint', 'Runtime and integration endpoint'), t('Evaluation, monitoring และ operating guide', 'Evaluation, monitoring and operating guide')],
  },
};

export const localise = (value: LocalText, language: Language) => value[language];

const brandedProductLogos = new Set(['ai-erp', 'bull-docs', 'beok-boq', 'homeplace', 'gvents', 'gegi', 'llm']);

export const productVisualPath = (slug: string) => brandedProductLogos.has(slug)
  ? `/assets/product-logos/${slug}.png`
  : `/assets/product-icons/${slug}.png`;

const productsWithScreenshots = new Set(['ai-erp', 'bull-docs', 'beok-boq', 'food-cost-profit-dna', 'homeplace', 'gvents', '10x-sme']);

export const productScreenshotPath = (slug: string) => productsWithScreenshots.has(slug)
  ? `/assets/product-screenshots/${slug}.webp`
  : undefined;
