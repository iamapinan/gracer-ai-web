import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "/Users/apinan/Developments/gracer-ai-web";
const SKILL_DIR = "/Users/apinan/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations";
const TMP_DIR = path.join(workspaceDir, ".codex-pptx");
const FINAL_PPTX = path.join(workspaceDir, "artifacts", "presentations", "Gracer-AI-SME-Workflow-Deck-2026-final.pptx");
const RUNTIME_PYTHON = "/Users/apinan/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const FONT = "Noto Sans Thai";

await fs.mkdir(TMP_DIR, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const C = {
  ink: "#18181B",
  muted: "#625F67",
  paper: "#FAFAF7",
  white: "#FFFFFF",
  line: "#DEDCE2",
  coral: "#E95172",
  coralDark: "#B83254",
  coralSoft: "#FFF0F3",
  violet: "#7C55D9",
  violetSoft: "#F1ECFF",
  teal: "#118C8B",
  tealSoft: "#EAF7F6",
  green: "#197451",
  greenSoft: "#EAF6F0",
};

const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });

const imageBytes = async (relative) => new Uint8Array(await fs.readFile(path.join(workspaceDir, relative)));

function addText(slide, text, x, y, w, h, opts = {}) {
  const box = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  box.text = text;
  box.text.style = {
    typeface: FONT,
    fontSize: opts.fontSize ?? 28,
    bold: opts.bold ?? false,
    color: opts.color ?? C.ink,
    alignment: opts.align ?? "left",
    verticalAlignment: opts.valign ?? "top",
    autoFit: opts.autoFit ?? "shrinkText",
    lineSpacing: opts.lineSpacing ?? 1.08,
    insets: opts.insets ?? { top: 0, right: 0, bottom: 0, left: 0 },
  };
  return box;
}

function addRect(slide, x, y, w, h, fill, radius = 0, line = "none") {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect",
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: line === "none" ? { fill: "none", width: 0 } : { style: "solid", fill: line, width: 1 },
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function addCircle(slide, x, y, size, fill, line = "none") {
  return slide.shapes.add({
    geometry: "ellipse",
    position: { left: x, top: y, width: size, height: size },
    fill,
    line: line === "none" ? { fill: "none", width: 0 } : { style: "solid", fill: line, width: 1 },
  });
}

function addLine(slide, x, y, w, h, color = C.line, width = 2) {
  return slide.shapes.add({
    geometry: "line",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { style: "solid", fill: color, width },
  });
}

function addImage(slide, bytes, type, x, y, w, h, alt, fit = "cover", radius = 0) {
  return slide.images.add({
    blob: bytes,
    contentType: type,
    alt,
    fit,
    position: { left: x, top: y, width: w, height: h },
    geometry: radius ? "roundRect" : "rect",
    ...(radius ? { borderRadius: radius } : {}),
  });
}

function addBrand(slide, dark = false) {
  if (dark) addRect(slide, 67, 33, 156, 40, C.white, 10);
  addImage(slide, logo, "image/png", 72, 38, 146, 30, "Gracer AI logo", "contain");
}

function addPage(slide, n, dark = false) {
  addText(slide, String(n).padStart(2, "0"), 1180, 670, 40, 20, { fontSize: 14, bold: true, color: dark ? "#B6B1BC" : "#8A858E", align: "right" });
}

function addTitle(slide, title, subtitle, dark = false) {
  addBrand(slide, dark);
  addText(slide, title, 72, 92, 1136, 70, { fontSize: 48, bold: true, color: dark ? C.white : C.ink });
  if (subtitle) addText(slide, subtitle, 72, 158, 950, 46, { fontSize: 22, color: dark ? "#D4CFD8" : C.muted });
}

const logo = await imageBytes("assets/logo-text.png");
const hero = await imageBytes("assets/gracer-ai-hero-v2.png");
const integration = await imageBytes(".codex-pptx/outcome-integration-v2.png");
const team = await imageBytes(".codex-pptx/outcome-team-v2.png");
const control = await imageBytes(".codex-pptx/outcome-control-v2.png");

// 1. Cover
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addImage(slide, hero, "image/png", 650, 0, 630, 720, "Abstract AI workflow visual", "cover");
  addRect(slide, 0, 0, 680, 720, C.paper);
  addImage(slide, logo, "image/png", 72, 54, 170, 34, "Gracer AI logo", "contain");
  addText(slide, "AI ที่ช่วยให้งานธุรกิจ\nเสร็จเร็วขึ้น", 72, 176, 600, 186, { fontSize: 63, bold: true, lineSpacing: 0.98 });
  addText(slide, "ตัวอย่างการจัดทำใบเสนอราคา\nจากข้อมูลและกฎของบริษัท", 76, 394, 490, 78, { fontSize: 27, color: C.muted, lineSpacing: 1.18 });
  addRect(slide, 76, 534, 395, 56, C.ink, 18);
  addText(slide, "SME CONNECT RAYONG 2026", 96, 550, 355, 28, { fontSize: 19, bold: true, color: C.white, valign: "middle" });
  addText(slide, "14 กันยายน 2026", 76, 614, 260, 28, { fontSize: 18, color: C.muted });
  slide.speakerNotes.textFrame.setText("เปิดด้วยประโยค: หลายบริษัทไม่ได้ขาดคนหรือข้อมูล แต่ข้อมูลกระจายอยู่ในหลายไฟล์ งานขอราคาหนึ่งรายการจึงอาจใช้เวลาเกือบทั้งวัน\nแหล่งข้อมูล: PROJECT_CONTEXT.md และ DEMO_SCRIPT.md");
}

// 2. Before
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addTitle(slide, "งานขอราคาหนึ่งรายการ อาจกินเวลาเกือบทั้งวัน", "พนักงานต้องค้นข้อมูล ตรวจเงื่อนไข และจัดทำเอกสารใหม่ด้วยมือ");
  addText(slide, "ขอราคา Pump รุ่น XP-200 จำนวน 50 ตัว\nส่งระยอง ขอภายในวันนี้", 72, 240, 520, 100, { fontSize: 31, bold: true, lineSpacing: 1.12 });
  addRect(slide, 72, 370, 500, 118, C.ink, 24);
  addText(slide, "1 วัน", 100, 390, 180, 70, { fontSize: 58, bold: true, color: C.white, valign: "middle" });
  addText(slide, "เวลาที่อาจใช้ต่อหนึ่งรายการ", 290, 405, 260, 54, { fontSize: 20, color: "#D5D1D8", valign: "middle" });
  const steps = ["Catalog", "Price list", "ส่วนลด", "Stock", "ใบเสนอราคา"];
  addLine(slide, 650, 350, 480, 0, "#C5C1C8", 3);
  steps.forEach((label, i) => {
    const x = 630 + i * 125;
    addCircle(slide, x, 324, 52, i === 4 ? C.coral : C.white, i === 4 ? C.coral : "#BDB8C1");
    addText(slide, String(i + 1), x, 337, 52, 26, { fontSize: 18, bold: true, color: i === 4 ? C.white : C.ink, align: "center", valign: "middle" });
    addText(slide, label, x - 28, 392, 108, 52, { fontSize: 19, bold: true, align: "center", valign: "top" });
  });
  addText(slide, "เวลาหายไปกับการเปิดไฟล์และคัดลอกข้อมูล มากกว่าการดูแลลูกค้า", 650, 500, 500, 80, { fontSize: 27, color: C.coralDark, bold: true, lineSpacing: 1.15 });
  addPage(slide, 2);
  slide.speakerNotes.textFrame.setText("อธิบาย Before workflow: ฝ่ายขายต้องเปิด catalog, ราคา, ส่วนลด, นโยบายจัดส่ง และข้อมูลสต็อก จากนั้นจึงพิมพ์ใบเสนอราคาใหม่\nตัวเลขหนึ่งวันเป็นผลลัพธ์ตัวอย่างของสถานการณ์สาธิต ไม่ใช่ค่าเฉลี่ยของทุกบริษัท\nแหล่งข้อมูล: DEMO_SCRIPT.md");
}

// 3. AI workflow
{
  const slide = presentation.slides.add();
  slide.background.fill = C.white;
  addTitle(slide, "AI Workflow สำหรับงานเสนอราคา", "ระบบนำคำขอไปทำงานต่อจนได้เอกสารฉบับร่างที่พร้อมตรวจ");
  addImage(slide, integration, "image/png", 690, 198, 518, 390, "Company data connected into business outputs", "cover", 28);
  const items = [
    ["01", "เข้าใจคำขอ", "แยกสินค้า จำนวน ปลายทาง และกำหนดเวลา"],
    ["02", "ค้นข้อมูลภายใน", "ใช้เฉพาะเอกสารที่บริษัทอนุญาต"],
    ["03", "ใช้กฎธุรกิจ", "ตรวจราคา ส่วนลด สต็อก และการจัดส่ง"],
    ["04", "สร้างฉบับร่าง", "เตรียมใบเสนอราคาและข้อความตอบลูกค้า"],
  ];
  items.forEach(([n, head, body], i) => {
    const y = 220 + i * 100;
    addText(slide, n, 72, y, 44, 30, { fontSize: 18, bold: true, color: C.coral });
    addText(slide, head, 132, y - 2, 250, 34, { fontSize: 26, bold: true });
    addText(slide, body, 132, y + 33, 450, 40, { fontSize: 18, color: C.muted });
    if (i < items.length - 1) addLine(slide, 72, y + 82, 510, 0, C.line, 1);
  });
  addPage(slide, 3);
  slide.speakerNotes.textFrame.setText("จุดสำคัญของหน้านี้คือระบบไม่ได้หยุดที่การตอบคำถาม ระบบนำข้อมูลไปทำ workflow ต่อให้ครบก่อนส่งให้พนักงานตรวจ\nแหล่งข้อมูล: PROJECT_CONTEXT.md");
}

// 4. Request understanding
{
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addBrand(slide, true);
  addText(slide, "AI เข้าใจคำขอของลูกค้า", 72, 104, 800, 66, { fontSize: 50, bold: true, color: C.white });
  addText(slide, "ข้อความธรรมดากลายเป็นข้อมูลที่นำไปทำงานต่อได้", 72, 170, 740, 36, { fontSize: 22, color: "#C9C5CD" });
  addRect(slide, 72, 250, 1136, 106, "#2C2B30", 24, "#48464E");
  addText(slide, "“ขอราคา Pump รุ่น XP-200 จำนวน 50 ตัว ส่งระยอง ขอภายในวันนี้”", 104, 280, 1072, 54, { fontSize: 30, bold: true, color: C.white, valign: "middle", align: "center" });
  const fields = [["สินค้า", "Industrial Pump XP-200"], ["จำนวน", "50 ตัว"], ["ปลายทาง", "ระยอง"], ["กำหนดเวลา", "ภายในวันนี้"]];
  fields.forEach(([label, value], i) => {
    const x = 72 + i * 284;
    addText(slide, label, x, 420, 240, 28, { fontSize: 17, color: "#AAA5AF" });
    addText(slide, value, x, 454, 240, 52, { fontSize: 25, bold: true, color: i === 0 ? "#FF89A2" : C.white });
  });
  addText(slide, "ขั้นต่อไป: ค้นข้อมูลและใช้กฎของบริษัท", 72, 590, 550, 38, { fontSize: 22, color: "#FF89A2", bold: true });
  addPage(slide, 4, true);
  slide.speakerNotes.textFrame.setText("ส่งคำขอตัวอย่างในหน้าเดโม แล้วชี้ให้ผู้ชมเห็นว่าสินค้า จำนวน ปลายทาง และกำหนดเวลาถูกแยกออกมาอย่างชัดเจน\nแหล่งข้อมูล: DEMO_SCRIPT.md และ src/data/demoData.ts");
}

// 5. Rules and evidence
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addTitle(slide, "ข้อมูลและกฎที่ระบบใช้", "พนักงานตรวจสอบได้ว่าราคาและเงื่อนไขมาจากแหล่งใด");
  const rows = [
    ["สินค้า", "XP-200", "Product Catalog"],
    ["ราคาต่อหน่วย", "18,500 บาท", "Price List Sep 2026"],
    ["ส่วนลดโครงการ", "7%", "Discount Policy"],
    ["สต็อกพร้อมส่ง", "68 ตัว", "Stock Record"],
    ["จัดส่งระยอง", "ไม่มีค่าจัดส่ง", "Delivery Policy"],
  ];
  rows.forEach(([label, value, source], i) => {
    const y = 226 + i * 76;
    addText(slide, label, 72, y, 215, 32, { fontSize: 19, color: C.muted });
    addText(slide, value, 300, y - 2, 245, 36, { fontSize: 24, bold: true });
    addText(slide, source, 550, y + 1, 260, 30, { fontSize: 17, color: C.coralDark });
    addLine(slide, 72, y + 50, 740, 0, C.line, 1);
  });
  addRect(slide, 855, 220, 353, 324, C.ink, 28);
  addText(slide, "ยอดสุทธิรวม VAT", 890, 264, 283, 32, { fontSize: 20, color: "#BBB6C0", align: "center" });
  addText(slide, "920,467.50", 875, 318, 313, 78, { fontSize: 51, bold: true, color: C.white, align: "center", valign: "middle" });
  addText(slide, "บาท", 890, 398, 283, 32, { fontSize: 20, color: "#FF89A2", bold: true, align: "center" });
  addLine(slide, 900, 455, 263, 0, "#4C4951", 1);
  addText(slide, "พร้อมส่งภายใน 3 วันทำการ", 890, 480, 283, 40, { fontSize: 19, color: C.white, align: "center" });
  addText(slide, "ทุกตัวเลขมีแหล่งอ้างอิง", 855, 575, 353, 34, { fontSize: 22, bold: true, color: C.green, align: "center" });
  addPage(slide, 5);
  slide.speakerNotes.textFrame.setText("อธิบายว่าระบบทั้งค้นข้อมูลและใช้กฎธุรกิจ ยอดสุทธิ 920,467.50 บาทคำนวณจากราคา 18,500 บาท จำนวน 50 ตัว หักส่วนลด 7% แล้วบวก VAT 7%\nแหล่งข้อมูล: DEMO_SCRIPT.md และ src/data/demoData.ts");
}

// 6. Human approval
{
  const slide = presentation.slides.add();
  slide.background.fill = C.white;
  addTitle(slide, "ใบเสนอราคาพร้อมให้พนักงานตรวจ", "AI เตรียมฉบับร่าง ส่วนคนยังตัดสินใจก่อนส่งให้ลูกค้า");
  addRect(slide, 72, 214, 720, 410, C.paper, 26, C.line);
  addText(slide, "ใบเสนอราคา", 108, 250, 280, 42, { fontSize: 31, bold: true });
  addText(slide, "Eastern Industrial Supply Co., Ltd.", 108, 294, 360, 28, { fontSize: 17, color: C.muted });
  addText(slide, "QT-2026-0914-001", 560, 252, 195, 26, { fontSize: 16, bold: true, color: C.coralDark, align: "right" });
  addLine(slide, 108, 342, 648, 0, C.line, 1);
  addText(slide, "Industrial Pump XP-200", 108, 375, 350, 36, { fontSize: 23, bold: true });
  addText(slide, "50 ตัว", 632, 375, 124, 32, { fontSize: 20, align: "right" });
  addText(slide, "ราคาก่อน VAT หลังหักส่วนลด", 108, 458, 310, 28, { fontSize: 17, color: C.muted });
  addText(slide, "860,250.00 บาท", 520, 454, 236, 32, { fontSize: 20, bold: true, align: "right" });
  addText(slide, "ยอดสุทธิรวม VAT", 108, 522, 260, 32, { fontSize: 19, bold: true });
  addText(slide, "920,467.50 บาท", 500, 514, 256, 42, { fontSize: 28, bold: true, color: C.coralDark, align: "right" });
  addRect(slide, 835, 256, 373, 220, C.ink, 26);
  addText(slide, "พนักงานตรวจก่อนส่งจริง", 870, 306, 303, 48, { fontSize: 27, bold: true, color: C.white, align: "center" });
  addText(slide, "ตรวจยอด แก้ข้อความ แล้วจึงอนุมัติ", 875, 378, 293, 54, { fontSize: 20, color: "#D0CBD3", align: "center" });
  addRect(slide, 875, 510, 293, 66, C.coral, 20);
  addText(slide, "อนุมัติเอกสาร", 905, 528, 233, 32, { fontSize: 22, bold: true, color: C.white, align: "center", valign: "middle" });
  addPage(slide, 6);
  slide.speakerNotes.textFrame.setText("หยุดสั้น ๆ เมื่อใบเสนอราคาปรากฏ แล้วชี้ว่าระบบยังไม่ได้ส่งเอกสารเอง พนักงานตรวจยอด แก้ข้อความ และกดอนุมัติก่อนทุกครั้ง\nแหล่งข้อมูล: DEMO_SCRIPT.md");
}

// 7. Outcome
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addTitle(slide, "เวลาที่เหลือสำหรับพนักงาน", "ระบบรับภาระการค้นและจัดทำฉบับร่าง พนักงานใช้เวลากับการตรวจสอบ");
  addImage(slide, team, "image/png", 744, 204, 464, 362, "Team reviewing a completed business workflow", "cover", 28);
  addText(slide, "ก่อน", 72, 246, 170, 34, { fontSize: 19, bold: true, color: C.muted });
  addText(slide, "เกือบ 1 วัน", 72, 286, 510, 90, { fontSize: 60, bold: true });
  addLine(slide, 72, 410, 520, 0, C.line, 2);
  addText(slide, "หลัง", 72, 448, 170, 34, { fontSize: 19, bold: true, color: C.coralDark });
  addText(slide, "ตรวจประมาณ 3 นาที", 72, 488, 600, 90, { fontSize: 55, bold: true, color: C.coral });
  addText(slide, "ตัวเลขจากสถานการณ์ตัวอย่าง ผลจริงต้องวัดจาก workflow ของแต่ละบริษัท", 72, 612, 650, 36, { fontSize: 16, color: C.muted });
  addPage(slide, 7);
  slide.speakerNotes.textFrame.setText("ย้ำว่านี่เป็นผลลัพธ์ตัวอย่างของเดโม สิ่งที่ทำกับลูกค้าจริงคือวัดเวลาเดิม ปริมาณงาน และคุณภาพก่อนเริ่ม Pilot แล้วเปรียบเทียบหลังทดลอง\nแหล่งข้อมูล: DEMO_SCRIPT.md และ SALES_PROPOSAL.md");
}

// 8. Privacy
{
  const slide = presentation.slides.add();
  slide.background.fill = C.white;
  addTitle(slide, "ข้อมูลบริษัทยังอยู่ภายใต้การควบคุม", "องค์กรกำหนดขอบเขต สิทธิ์เข้าถึง และรูปแบบการติดตั้งได้");
  addImage(slide, control, "image/png", 72, 216, 570, 382, "Private AI control environment", "cover", 28);
  const items = [
    ["ใช้เฉพาะข้อมูลที่จำเป็น", "เริ่มจากข้อมูลจำลองหรือข้อมูลที่ปกปิดส่วนสำคัญได้"],
    ["กำหนดสิทธิ์และตรวจสอบที่มา", "แยกข้อมูลตามบทบาทและบันทึกแหล่งที่ระบบใช้"],
    ["เลือกรูปแบบให้เหมาะกับความลับ", "พิจารณา private, local หรือ hybrid ตามนโยบายองค์กร"],
  ];
  items.forEach(([head, body], i) => {
    const y = 230 + i * 118;
    addCircle(slide, 700, y + 3, 36, i === 2 ? C.teal : C.coralSoft, i === 2 ? C.teal : C.coral);
    addText(slide, String(i + 1), 700, y + 9, 36, 20, { fontSize: 15, bold: true, color: i === 2 ? C.white : C.coralDark, align: "center", valign: "middle" });
    addText(slide, head, 756, y, 410, 34, { fontSize: 24, bold: true });
    addText(slide, body, 756, y + 42, 410, 54, { fontSize: 18, color: C.muted, lineSpacing: 1.18 });
  });
  addText(slide, "ไม่มีระบบใดปราศจากความเสี่ยง เป้าหมายคือทำให้องค์กรกำหนดขอบเขตและตรวจสอบได้", 700, 602, 485, 44, { fontSize: 16, color: C.muted });
  addPage(slide, 8);
  slide.speakerNotes.textFrame.setText("อธิบาย privacy ในภาษาธุรกิจ หลีกเลี่ยงรายละเอียดโครงสร้างพื้นฐานในช่วงเดโมหลัก และไม่รับรองว่าไม่มีความเสี่ยงเลย\nแหล่งข้อมูล: PROJECT_CONTEXT.md และ SALES_PROPOSAL.md");
}

// 9. Offer and CTA
{
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addBrand(slide, true);
  addText(slide, "เริ่มจากหนึ่ง workflow ที่วัดผลได้", 72, 112, 860, 70, { fontSize: 52, bold: true, color: C.white });
  addText(slide, "AI Workflow Pilot", 72, 220, 450, 42, { fontSize: 25, bold: true, color: "#FF89A2" });
  addText(slide, "49,000", 72, 266, 420, 106, { fontSize: 80, bold: true, color: C.white });
  addText(slide, "บาท", 430, 322, 100, 40, { fontSize: 25, bold: true, color: "#CFCAD3" });
  addText(slide, "ระยะเวลา 2–3 สัปดาห์", 76, 392, 430, 40, { fontSize: 24, color: C.white, bold: true });
  addText(slide, "วิเคราะห์งานจริงหนึ่งงาน\nสร้างต้นแบบตั้งแต่รับข้อมูลจนพร้อมอนุมัติ\nวัดผลก่อนและหลัง พร้อมแผนนำไปใช้จริง", 76, 454, 540, 120, { fontSize: 21, color: "#CFCAD3", lineSpacing: 1.32 });
  addRect(slide, 700, 174, 508, 380, "#29282E", 30, "#4B4850");
  addText(slide, "งานใดในบริษัทของคุณ\nที่ทีมต้องทำซ้ำทุกวัน?", 748, 222, 412, 116, { fontSize: 35, bold: true, color: C.white, align: "center", lineSpacing: 1.1 });
  addText(slide, "นัด Workflow Assessment 30 นาที", 748, 382, 412, 44, { fontSize: 23, bold: true, color: "#FF89A2", align: "center" });
  addRect(slide, 790, 452, 328, 62, C.coral, 20);
  addText(slide, "apinan@gracer.co.th", 815, 469, 278, 30, { fontSize: 20, bold: true, color: C.white, align: "center", valign: "middle" });
  addText(slide, "เริ่มเล็ก วัดผลจริง แล้วค่อยขยาย", 700, 590, 508, 38, { fontSize: 22, color: "#D0CBD3", align: "center" });
  addPage(slide, 9, true);
  slide.speakerNotes.textFrame.setText("ปิดด้วยคำถามเรื่องงานที่เกิดซ้ำ เสนอ Workflow Assessment 30 นาที แล้วอธิบายว่า Pilot ราคา 49,000 บาทครอบคลุมหนึ่ง workflow ระยะเวลา 2–3 สัปดาห์\nแหล่งข้อมูล: EXECUTION_PLAN.md, DEMO_SCRIPT.md และ SALES_PROPOSAL.md");
}

const stagingDir = path.join(workspaceDir, ".codex-finalizer");
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "gracer-sme-workflow-candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

for (let i = 0; i < presentation.slides.length; i += 1) {
  const slide = presentation.slides.getItemAt(i);
  const preview = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(TMP_DIR, `slide-${i + 1}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);
const result = await finalizePresentation({
  explicitTotalSlideCount: 9,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: [FONT], scriptFonts: { ea: FONT } },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "Gracer-AI-SME-Workflow-Deck-2026-final.validation.json"),
});

console.log(JSON.stringify({ finalPath: FINAL_PPTX, candidatePath, result }, null, 2));
