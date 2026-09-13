import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "/Users/apinan/Developments/gracer-ai-web";
const SKILL_DIR = "/Users/apinan/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations";
const TMP_DIR = path.join(workspaceDir, ".codex-pptx", "company-deck");
const FINAL_PPTX = path.join(workspaceDir, "artifacts", "presentations", "Gracer-AI-Company-Overview-2026-r3.pptx");
const RUNTIME_PYTHON = "/Users/apinan/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const FONT = "Noto Sans Thai";
await fs.mkdir(TMP_DIR, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const C = {
  ink: "#18181B", muted: "#625F67", paper: "#FAFAF7", white: "#FFFFFF", line: "#DEDCE2",
  violet: "#7652D6", violetDark: "#5E3EB5", violetSoft: "#F1ECFF",
  teal: "#118C8B", tealDark: "#08706F", tealSoft: "#EAF7F6",
  coral: "#E95172", coralDark: "#B83254", coralSoft: "#FFF0F3",
  indigo: "#4B50B9", indigoSoft: "#ECEEFF", green: "#197451",
};

const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const read = async (rel) => new Uint8Array(await fs.readFile(path.join(workspaceDir, rel)));
const logo = await read("assets/logo-text.png");
const hero = await read("assets/gracer-ai-hero-v2.png");
const platform = await read("assets/platform.png");
const transformation = await read(".codex-pptx/service-ai-transformation.png");
const governance = await read(".codex-pptx/service-ai-governance.png");
const training = await read(".codex-pptx/service-ai-training.png");

function text(slide, value, x, y, w, h, o = {}) {
  const s = slide.shapes.add({ geometry: "textbox", position: { left: x, top: y, width: w, height: h }, fill: "none", line: { fill: "none", width: 0 } });
  s.text = value;
  s.text.style = {
    typeface: FONT, fontSize: o.size ?? 26, bold: o.bold ?? false, color: o.color ?? C.ink,
    alignment: o.align ?? "left", verticalAlignment: o.valign ?? "top", autoFit: o.autoFit ?? "shrinkText",
    lineSpacing: o.leading ?? 1.08, insets: o.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return s;
}
function rect(slide, x, y, w, h, fill, radius = 0, line = "none") {
  return slide.shapes.add({ geometry: radius ? "roundRect" : "rect", position: { left: x, top: y, width: w, height: h }, fill,
    line: line === "none" ? { fill: "none", width: 0 } : { style: "solid", fill: line, width: 1 }, ...(radius ? { borderRadius: radius } : {}) });
}
function circle(slide, x, y, size, fill, line = "none") {
  return slide.shapes.add({ geometry: "ellipse", position: { left: x, top: y, width: size, height: size }, fill,
    line: line === "none" ? { fill: "none", width: 0 } : { style: "solid", fill: line, width: 1 } });
}
function line(slide, x, y, w, h, color = C.line, width = 1) {
  return slide.shapes.add({ geometry: "line", position: { left: x, top: y, width: w, height: h }, fill: "none", line: { style: "solid", fill: color, width } });
}
function image(slide, bytes, type, x, y, w, h, alt, fit = "cover", radius = 0) {
  return slide.images.add({ blob: bytes, contentType: type, alt, fit, position: { left: x, top: y, width: w, height: h }, geometry: radius ? "roundRect" : "rect", ...(radius ? { borderRadius: radius } : {}) });
}
function brand(slide, dark = false) {
  if (dark) rect(slide, 67, 33, 156, 40, C.white, 10);
  image(slide, logo, "image/png", 72, 38, 146, 30, "Gracer AI logo", "contain");
}
function page(slide, n, dark = false) { text(slide, String(n).padStart(2, "0"), 1178, 670, 42, 20, { size: 14, bold: true, color: dark ? "#B6B1BC" : "#8A858E", align: "right" }); }
function title(slide, head, sub, dark = false) {
  brand(slide, dark);
  text(slide, head, 72, 94, 1136, 68, { size: 48, bold: true, color: dark ? C.white : C.ink });
  if (sub) text(slide, sub, 72, 160, 1060, 42, { size: 21, color: dark ? "#D4CFD8" : C.muted });
}
function note(slide, body, source) { slide.speakerNotes.textFrame.setText(`${body}\nแหล่งข้อมูล: ${source}`); }

// 1 Cover
{
  const s = p.slides.add(); s.background.fill = C.ink;
  image(s, hero, "image/png", 548, 0, 732, 720, "Gracer AI abstract visual", "cover");
  rect(s, 0, 0, 625, 720, C.ink);
  rect(s, 56, 42, 186, 48, C.white, 12);
  image(s, logo, "image/png", 72, 52, 154, 29, "Gracer AI logo", "contain");
  text(s, "GRACER AI", 72, 142, 500, 54, { size: 28, bold: true, color: "#FF8DA6" });
  text(s, "AI ที่ทำงานได้จริง", 72, 212, 520, 92, { size: 58, bold: true, color: C.white, leading: 0.98 });
  text(s, "สำหรับธุรกิจของคุณ", 72, 310, 520, 92, { size: 55, bold: true, color: "#FF7898", leading: 0.98 });
  text(s, "ระบบที่สร้างผลลัพธ์\nการควบคุมที่เหมาะสม\nทีมที่พร้อมใช้งาน", 76, 430, 380, 120, { size: 23, color: "#D0CBD3", leading: 1.3 });
  rect(s, 72, 592, 390, 54, "#2A292F", 18, "#4A4750");
  text(s, "SME CONNECT RAYONG 2026", 94, 608, 346, 26, { size: 18, bold: true, color: C.white, valign: "middle" });
  text(s, "14 กันยายน 2026", 488, 608, 180, 26, { size: 16, color: "#AAA5AF" });
  note(s, "เปิดด้วยภาพรวมว่า Gracer AI ช่วยองค์กรตั้งแต่การนำ AI ไปใช้จริง การกำกับดูแล ไปจนถึงการสร้างความพร้อมของทีม", "PROJECT_CONTEXT.md และ src/translations/th.ts");
}

// 2 Organisation overview
{
  const s = p.slides.add(); s.background.fill = C.white;
  title(s, "Gracer AI ในภาพเดียว", "AI Partner ที่เชื่อมข้อมูล ระบบ และคน ให้กลายเป็นการทำงานที่วัดผลได้");
  image(s, platform, "image/png", 72, 238, 540, 330, "Gracer Intelligence Platform screenshot", "contain", 20);
  text(s, "Gracer AI Platform", 688, 236, 450, 40, { size: 26, bold: true, color: C.indigo });
  text(s, "รากฐานสำหรับ AI Assistant แอปพลิเคชันองค์กร และโมเดลที่ใช้งานได้ทั้ง local หรือ hybrid", 688, 284, 480, 88, { size: 23, color: C.ink, leading: 1.22 });
  const outcomes = [
    ["นำไปใช้กับงานจริง", "เชื่อม AI เข้ากับข้อมูลและระบบที่องค์กรมีอยู่"],
    ["ควบคุมได้", "กำหนดสิทธิ์ นโยบาย และจุดอนุมัติตามความเสี่ยง"],
    ["ทีมใช้งานต่อได้", "พัฒนาทักษะและวิธีทำงานให้เกิดผลต่อเนื่อง"],
  ];
  outcomes.forEach(([h,b], i) => {
    const y = 404 + i * 74;
    circle(s, 688, y + 1, 30, [C.violet, C.teal, C.coral][i]);
    text(s, String(i + 1), 688, y + 6, 30, 18, { size: 14, bold: true, color: C.white, align: "center" });
    text(s, h, 736, y, 260, 30, { size: 21, bold: true });
    text(s, b, 736, y + 30, 445, 34, { size: 17, color: C.muted });
  });
  page(s, 2);
  note(s, "อธิบายว่า Gracer AI ไม่ได้มีเพียงผลิตภัณฑ์เดียว แต่มีทั้งแพลตฟอร์ม บริการ ระบบควบคุม และการพัฒนาคนที่ทำงานร่วมกัน", "src/components/LandingPage.tsx และ src/data/productDetails.ts");
}

// 3 Pillars
{
  const s = p.slides.add(); s.background.fill = C.paper;
  title(s, "3 เสาหลักของ Gracer AI", "แต่ละ Pillar แก้ปัญหาคนละส่วน แต่ทำงานร่วมกันในภาพเดียว");
  const pillars = [
    { n:"01", name:"AI Transformation", desc:"เปลี่ยนระบบงานเดิม โดยใช้ AI เข้ามาช่วยสร้างผลลัพธ์ทางธุรกิจ", color:C.violet, soft:C.violetSoft },
    { n:"02", name:"AI Governance", desc:"ควบคุมการใช้ AI ด้วยนโยบาย สิทธิ์ ขอบเขตข้อมูล และหลักฐานที่ตรวจสอบได้", color:C.teal, soft:C.tealSoft },
    { n:"03", name:"AI Training", desc:"พัฒนาคนให้เลือกใช้ AI ได้เหมาะกับงาน และต่อยอดเป็นวิธีทำงานขององค์กร", color:C.coral, soft:C.coralSoft },
  ];
  pillars.forEach((it, i) => {
    const x = 72 + i * 376;
    rect(s, x, 238, 344, 340, C.white, 28, C.line);
    rect(s, x, 238, 344, 8, it.color, 4);
    text(s, `${it.n} / 03`, x + 28, 278, 120, 26, { size: 16, bold: true, color: it.color });
    text(s, it.name, x + 28, 328, 288, 68, { size: 32, bold: true, color: C.ink });
    line(s, x + 28, 412, 288, 0, C.line, 1);
    text(s, it.desc, x + 28, 444, 288, 105, { size: 20, color: C.muted, leading: 1.25 });
  });
  rect(s, 72, 610, 1096, 42, C.indigoSoft, 14);
  text(s, "Gracer AI LLM และ Platform เป็นรากฐานที่รองรับโซลูชันในทุก Pillar", 92, 620, 1056, 24, { size: 18, bold: true, color: C.indigo, align: "center" });
  page(s, 3);
  note(s, "ใช้หน้านี้เป็นแผนที่ของเรื่องที่จะเล่าต่อ จากนั้นเจาะ AI Transformation ซึ่งเป็นจุดเริ่มต้นที่ลูกค้าเห็นผลลัพธ์ได้เร็วที่สุด", "src/translations/th.ts และ src/components/LandingPage.tsx");
}

// 4 Transformation deep dive
{
  const s = p.slides.add(); s.background.fill = C.white;
  title(s, "AI Transformation", "เปลี่ยนงานที่กระจัดกระจายให้เป็นระบบที่ AI และคนทำงานร่วมกันได้จริง");
  image(s, transformation, "image/png", 650, 216, 558, 372, "AI Transformation connecting business workflows", "cover", 28);
  const items = [
    ["เลือกงานที่คุ้มค่า", "เริ่มจากงานที่เกิดซ้ำ ใช้เวลามาก และวัดผลก่อนกับหลังได้"],
    ["เชื่อมข้อมูลและระบบเดิม", "เว็บไซต์ แอป LINE เอกสาร CRM, ERP และฐานข้อมูล"],
    ["วางจุดตัดสินใจของคน", "ผลลัพธ์สำคัญต้องผ่านการตรวจและอนุมัติก่อนนำไปใช้"],
    ["นำขึ้นใช้งานและปรับต่อ", "ทดสอบคุณภาพ ความเร็ว ต้นทุน และ fallback ก่อนขยาย"],
  ];
  items.forEach(([h,b], i) => {
    const y = 224 + i * 94;
    text(s, String(i + 1).padStart(2,"0"), 72, y, 42, 28, { size: 17, bold: true, color: C.violet });
    text(s, h, 132, y - 2, 300, 32, { size: 24, bold: true });
    text(s, b, 132, y + 34, 430, 46, { size: 17, color: C.muted, leading: 1.18 });
    if (i < 3) line(s, 72, y + 80, 500, 0, C.line, 1);
  });
  rect(s, 650, 610, 558, 42, C.violetSoft, 14);
  text(s, "AI Integration และ AI Workflow Consulting เป็นจุดเริ่มต้นหลัก", 670, 620, 518, 24, { size: 17, bold: true, color: C.violetDark, align: "center" });
  page(s, 4);
  note(s, "เจาะลึกเฉพาะ Pillar นี้ โดยย้ำว่าเริ่มจากปัญหาธุรกิจ วัด baseline และออกแบบ human approval ก่อนนำขึ้นใช้งานจริง", "src/data/productDetails.ts: AI Integration และ AI Workflow Consulting");
}

// 5 Transformation product portfolio
{
  const s = p.slides.add(); s.background.fill = C.paper;
  title(s, "โซลูชัน AI Transformation", "เลือกใช้ผลิตภัณฑ์ที่พร้อมเริ่มได้ทันที หรือติดต่อเพื่อออกแบบให้ตรงกับระบบงานขององค์กร");
  text(s, "พร้อมใช้ได้ทันที", 72, 228, 430, 36, { size: 24, bold: true, color: C.green });
  const ready = [
    ["Bull Docs", "เอกสารบัญชีธุรกิจไทย", "assets/product-logos/bull-docs.png"],
    ["Gvents", "แพลตฟอร์มจัดการอีเวนต์", "assets/product-logos/gvents.png"],
    ["HomePlace", "ตลาดชุมชนผ่าน LINE", "assets/product-logos/homeplace.png"],
  ];
  for (let i = 0; i < ready.length; i += 1) {
    const [name, desc, rel] = ready[i];
    const y = 278 + i * 105;
    rect(s, 72, y, 430, 88, C.white, 18, "#BFDCCF");
    image(s, await read(rel), "image/png", 92, y + 17, 54, 54, `${name} visual`, "contain");
    text(s, name, 164, y + 14, 300, 30, { size: 22, bold: true });
    text(s, desc, 164, y + 49, 300, 24, { size: 16, color: C.muted });
  }
  rect(s, 72, 596, 430, 44, "#EAF6F0", 14);
  text(s, "เริ่มต้นใช้งานจากผลิตภัณฑ์ที่มีอยู่ได้", 92, 607, 390, 24, { size: 16, bold: true, color: C.green, align: "center" });

  text(s, "ติดต่อเพื่อออกแบบก่อน", 550, 228, 618, 36, { size: 24, bold: true, color: C.violetDark });
  const tailored = [
    ["AI Integration", "เชื่อม AI กับระบบเดิม", "assets/product-icons/ai-integration.png"],
    ["AI Workflow Consulting", "ออกแบบ workflow ที่วัดผลได้", "assets/product-icons/ai-workflow-consulting.png"],
    ["AI ERP", "ระบบหลังบ้านธุรกิจ", "assets/product-logos/ai-erp.png"],
    ["beOK BOQ", "ถอดแบบและประมาณราคา", "assets/product-logos/beok-boq.png"],
    ["Food Cost & Profit DNA", "วิเคราะห์กำไรเมนูอาหาร", "assets/product-icons/food-cost-profit-dna.png"],
  ];
  for (let i = 0; i < tailored.length; i += 1) {
    const [name, desc, rel] = tailored[i];
    const col = i % 2, row = Math.floor(i / 2);
    const x = 550 + col * 318, y = 278 + row * 105;
    rect(s, x, y, 298, 88, C.white, 18, C.line);
    image(s, await read(rel), "image/png", x + 16, y + 20, 48, 48, `${name} visual`, "contain");
    text(s, name, x + 78, y + 12, 198, 34, { size: 18, bold: true, leading: 1.06 });
    text(s, desc, x + 78, y + 50, 198, 24, { size: 14, color: C.muted });
  }
  rect(s, 868, 488, 298, 88, C.violetSoft, 18, "#CFC4EF");
  text(s, "ปรึกษาก่อนเริ่ม", 890, 505, 254, 28, { size: 18, bold: true, color: C.violetDark, align: "center" });
  text(s, "เพื่อกำหนดข้อมูล ระบบ และขอบเขต", 890, 539, 254, 24, { size: 14, color: C.muted, align: "center" });
  text(s, "สถานะความพร้อมอ้างอิงจากรูปแบบการให้บริการปัจจุบัน", 550, 615, 618, 24, { size: 14, color: C.muted, align: "right" });
  page(s, 5);
  note(s, "แยกให้ผู้ชมเห็นทันทีว่า Bull Docs, Gvents และ HomePlace พร้อมเริ่มใช้งาน ส่วนโซลูชันอื่นต้องพูดคุยเพื่อออกแบบให้ตรงกับระบบงานและข้อมูลขององค์กร", "ข้อมูลความพร้อมจากคำยืนยันของเจ้าของโครงการ และ src/data/productDetails.ts");
}

// 6 Workflow story
{
  const s = p.slides.add(); s.background.fill = C.ink;
  title(s, "ตัวอย่าง AI Workflow สำหรับงานเสนอราคา", "จากข้อความลูกค้าหนึ่งบรรทัด ถึงเอกสารฉบับร่างที่พร้อมตรวจ", true);
  rect(s, 72, 232, 1136, 90, "#2C2B30", 22, "#4A4750");
  text(s, "“ขอราคา Pump รุ่น XP-200 จำนวน 50 ตัว ส่งระยอง ขอภายในวันนี้”", 100, 257, 1080, 42, { size: 28, bold: true, color: C.white, align: "center", valign: "middle" });
  const steps = [
    ["01", "เข้าใจคำขอ", "สินค้า จำนวน ปลายทาง"],
    ["02", "ค้นข้อมูลภายใน", "ราคา สต็อก นโยบาย"],
    ["03", "ใช้กฎธุรกิจ", "ส่วนลดและการจัดส่ง"],
    ["04", "สร้างฉบับร่าง", "ใบเสนอราคาและข้อความตอบ"],
  ];
  line(s, 170, 432, 900, 0, "#625E68", 3);
  steps.forEach(([n,h,b], i) => {
    const x = 142 + i * 286;
    circle(s, x, 402, 60, i === 3 ? C.coral : C.white, i === 3 ? C.coral : "#8C8792");
    text(s, n, x, 419, 60, 24, { size: 16, bold: true, color: i === 3 ? C.white : C.ink, align: "center" });
    text(s, h, x - 58, 484, 176, 36, { size: 21, bold: true, color: C.white, align: "center" });
    text(s, b, x - 76, 526, 212, 46, { size: 16, color: "#BDB8C3", align: "center", leading: 1.16 });
  });
  rect(s, 332, 608, 616, 42, "#3A2730", 14);
  text(s, "ทุกขั้นใช้ข้อมูลที่องค์กรอนุญาต และรอคนตรวจในจุดสำคัญ", 352, 618, 576, 24, { size: 17, bold: true, color: "#FF91A8", align: "center" });
  page(s, 6, true);
  note(s, "เข้าสู่เดโมงานเสนอราคา อธิบายสี่ขั้นให้เร็วและชี้ว่า interface สนทนาเป็นเพียงจุดรับคำขอ ส่วนคุณค่าจริงอยู่ที่ workflow หลังจากนั้น", "DEMO_SCRIPT.md");
}

// 7 Workflow outcome
{
  const s = p.slides.add(); s.background.fill = C.white;
  title(s, "ผลลัพธ์พร้อมให้พนักงานตรวจ", "AI เตรียมใบเสนอราคาและข้อความตอบลูกค้า ส่วนคนยังอนุมัติก่อนส่ง");
  rect(s, 72, 226, 700, 362, C.paper, 24, C.line);
  text(s, "ใบเสนอราคา", 106, 256, 260, 38, { size: 29, bold: true });
  text(s, "Eastern Industrial Supply Co., Ltd.", 106, 298, 350, 26, { size: 16, color: C.muted });
  text(s, "QT-2026-0914-001", 535, 258, 200, 24, { size: 15, bold: true, color: C.coralDark, align: "right" });
  line(s, 106, 344, 630, 0, C.line, 1);
  text(s, "Industrial Pump XP-200", 106, 378, 340, 32, { size: 22, bold: true });
  text(s, "50 ตัว", 630, 378, 106, 30, { size: 18, align: "right" });
  text(s, "ส่วนลดโครงการ 7%", 106, 448, 250, 28, { size: 17, color: C.muted });
  text(s, "ยอดสุทธิรวม VAT", 106, 510, 250, 30, { size: 18, bold: true });
  text(s, "920,467.50 บาท", 466, 500, 270, 42, { size: 28, bold: true, color: C.coralDark, align: "right" });
  text(s, "ก่อน", 838, 246, 110, 28, { size: 18, bold: true, color: C.muted });
  text(s, "เกือบ 1 วัน", 838, 278, 340, 64, { size: 43, bold: true });
  line(s, 838, 366, 340, 0, C.line, 2);
  text(s, "หลัง", 838, 398, 110, 28, { size: 18, bold: true, color: C.coralDark });
  text(s, "ตรวจประมาณ 3 นาที", 838, 434, 350, 70, { size: 38, bold: true, color: C.coral });
  rect(s, 838, 532, 340, 58, C.ink, 18);
  text(s, "พนักงานตรวจ แก้ไข และอนุมัติ", 860, 548, 296, 28, { size: 18, bold: true, color: C.white, align: "center" });
  text(s, "ตัวเลขจากสถานการณ์ตัวอย่าง ผลจริงต้องวัดจาก workflow ของแต่ละบริษัท", 72, 622, 830, 28, { size: 15, color: C.muted });
  page(s, 7);
  note(s, "เปิดเผยผลลัพธ์ ชี้ราคา ส่วนลด สต็อก แหล่งข้อมูล และ human approval จากนั้นอธิบายว่าตัวเลขเวลานี้เป็นตัวอย่างที่ต้องวัดกับงานจริง", "DEMO_SCRIPT.md และ SALES_PROPOSAL.md");
}

// 8 Governance
{
  const s = p.slides.add(); s.background.fill = C.paper;
  title(s, "AI Governance", "การควบคุมช่วยให้องค์กรใช้ AI ได้ต่อเนื่อง โดยรู้ว่าใครใช้ข้อมูลอะไรและอนุมัติเมื่อใด");
  image(s, governance, "image/png", 72, 228, 530, 354, "AI Governance control environment", "cover", 28);
  const products = [
    ["GeGi AI Control Plan", "กำหนดบทบาท เครื่องมือ โมเดล และ approval ของ AI agents"],
    ["AI Gateway & Optimization", "จัดเส้นทางหลายโมเดล พร้อมควบคุมคุณภาพ ความเร็ว และต้นทุน"],
    ["RAG & Sandbox", "ให้ AI ใช้ความรู้องค์กรและเครื่องมือจริงในขอบเขตที่ตรวจสอบได้"],
  ];
  products.forEach(([h,b], i) => {
    const y = 236 + i * 112;
    rect(s, 650, y, 558, 92, C.white, 18, C.line);
    circle(s, 672, y + 22, 44, C.tealSoft, C.teal);
    text(s, String(i + 1), 672, y + 33, 44, 20, { size: 15, bold: true, color: C.tealDark, align: "center" });
    text(s, h, 736, y + 16, 440, 30, { size: 21, bold: true });
    text(s, b, 736, y + 50, 440, 30, { size: 16, color: C.muted });
  });
  rect(s, 650, 586, 558, 58, C.teal, 18);
  text(s, "เป้าหมายคือกำหนดขอบเขต ตรวจสอบได้ และลดความเสี่ยง", 675, 602, 508, 28, { size: 18, bold: true, color: C.white, align: "center" });
  page(s, 8);
  note(s, "พูดถึงผลิตภัณฑ์ทั้งสามแบบสั้น โดยเน้นผลทางธุรกิจมากกว่าศัพท์โครงสร้างพื้นฐาน และไม่รับรองว่าไม่มีความเสี่ยงเลย", "src/data/productDetails.ts และ SALES_PROPOSAL.md");
}

// 9 Training
{
  const s = p.slides.add(); s.background.fill = C.white;
  title(s, "AI Training", "ทีมต้องเข้าใจทั้งการใช้เครื่องมือ การออกแบบ workflow และขอบเขตข้อมูลที่เหมาะสม");
  image(s, training, "image/png", 682, 222, 526, 350, "Team learning to build AI workflows", "cover", 28);
  const programs = [
    ["Basic AI for Business", "เริ่มใช้ AI กับงานประจำอย่างมีวิจารณญาณ"],
    ["Advanced AI Workflow Development", "ออกแบบระบบที่เชื่อมข้อมูล เครื่องมือ และการตัดสินใจ"],
    ["10X AI Business Workshop for SMEs", "สร้าง AI Co-Pilot จากสถานการณ์ธุรกิจจริง"],
  ];
  programs.forEach(([h,b], i) => {
    const y = 228 + i * 118;
    text(s, `0${i + 1}`, 72, y, 42, 28, { size: 17, bold: true, color: C.coral });
    text(s, h, 132, y - 2, 470, 38, { size: 22, bold: true });
    text(s, b, 132, y + 40, 450, 48, { size: 17, color: C.muted, leading: 1.18 });
    if (i < 2) line(s, 72, y + 98, 520, 0, C.line, 1);
  });
  rect(s, 72, 602, 1136, 48, C.coralSoft, 15);
  text(s, "Training ช่วยให้องค์กรไม่ต้องพึ่งคนเพียงไม่กี่คนในการขับเคลื่อน AI", 96, 614, 1088, 26, { size: 18, bold: true, color: C.coralDark, align: "center" });
  page(s, 9);
  note(s, "พูดถึงหลักสูตรทั้งสามให้ผู้ชมรู้ว่ามีทางเลือกตั้งแต่ระดับเริ่มต้นถึงการสร้าง workflow ขั้นสูง แต่ไม่ต้องลงรายละเอียดหลักสูตรในเด็คนี้", "src/components/LandingPage.tsx และ src/data/productDetails.ts");
}

// 10 CTA
{
  const s = p.slides.add(); s.background.fill = C.ink;
  title(s, "เริ่มจากงานที่สำคัญที่สุดของธุรกิจ", "Gracer AI ช่วยเลือกจุดเริ่มต้นให้เหมาะกับปัญหา ความพร้อม และระดับการควบคุมที่ต้องการ", true);
  const choices = [
    ["ต้องการผลลัพธ์จากงานจริง", "AI Transformation", C.violet],
    ["ต้องการควบคุมการใช้ AI", "AI Governance", C.teal],
    ["ต้องการให้ทีมใช้งานเป็น", "AI Training", C.coral],
  ];
  choices.forEach(([q,a,color], i) => {
    const x = 72 + i * 376;
    rect(s, x, 252, 344, 148, "#29282E", 22, "#4A4750");
    rect(s, x, 252, 344, 7, color, 4);
    text(s, q, x + 24, 286, 296, 36, { size: 18, color: "#CFCAD3", align: "center" });
    text(s, a, x + 24, 334, 296, 34, { size: 23, bold: true, color, align: "center" });
  });
  text(s, "ข้อเสนอเริ่มต้นสำหรับ SME", 72, 454, 470, 34, { size: 20, bold: true, color: "#FF91A8" });
  text(s, "AI Workflow Starter", 72, 500, 520, 52, { size: 38, bold: true, color: C.white });
  text(s, "เริ่มต้น 9,999 บาท", 72, 558, 470, 42, { size: 28, bold: true, color: "#D2CDD5" });
  text(s, "สำหรับ SME ที่ต้องการเห็นภาพก่อนลงทุนระบบเต็มรูปแบบ", 72, 612, 520, 30, { size: 16, color: "#AAA5AF" });
  rect(s, 710, 470, 498, 124, C.coral, 24);
  text(s, "นัด Workflow Assessment 30 นาที", 742, 494, 434, 34, { size: 24, bold: true, color: C.white, align: "center" });
  text(s, "apinan@gracer.co.th", 742, 542, 434, 28, { size: 20, bold: true, color: C.white, align: "center" });
  text(s, "เริ่มจากหนึ่งงาน วัดผลจริง แล้วค่อยขยาย", 710, 626, 498, 28, { size: 19, color: "#D0CBD3", align: "center" });
  page(s, 10, true);
  note(s, "ปิดด้วยสามทางเลือกตาม Pillar แล้วเสนอ Workflow Assessment พร้อมข้อเสนอเริ่มต้น 9,999 บาทสำหรับ SME ที่ยังต้องการเห็นภาพก่อนลงทุนระบบเต็มรูปแบบ รายละเอียดขอบเขตและระยะเวลาต้องยืนยันก่อนเริ่มงาน", "EXECUTION_PLAN.md; ข้อเสนอเริ่มต้นจากคำยืนยันของเจ้าของโครงการ");
}

const staging = path.join(workspaceDir, ".codex-finalizer");
await fs.mkdir(staging, { recursive: true });
const candidatePath = path.join(staging, "gracer-company-overview-candidate.pptx");
await (await PresentationFile.exportPptx(p)).save(candidatePath);
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);
const result = await finalizePresentation({
  explicitTotalSlideCount: 10, requiredNativeTableOwnerSlides: [], requiredNativeChartOwnerSlides: [], workspaceDir,
  candidatePath, finalPath: FINAL_PPTX, pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: [FONT], scriptFonts: { ea: FONT } }, verifyArtifactToolImport: true,
  receiptPath: path.join(staging, "Gracer-AI-Company-Overview-2026-r3.validation.json"),
});
console.log(JSON.stringify({ finalPath: FINAL_PPTX, result }, null, 2));
