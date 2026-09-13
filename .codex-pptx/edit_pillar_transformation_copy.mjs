import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "/Users/apinan/Developments/gracer-ai-web";
const SKILL_DIR = "/Users/apinan/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations";
const sourcePath = path.join(workspaceDir, "artifacts", "presentations", "Gracer-AI-Company-Overview-2026-final.pptx");
const finalPath = path.join(workspaceDir, "artifacts", "presentations", "Gracer-AI-Company-Overview-2026-r2.pptx");
const stagingDir = path.join(workspaceDir, ".codex-finalizer");
const candidatePath = path.join(stagingDir, "gracer-company-overview-r2-candidate.pptx");
const pythonExecutable = "/Users/apinan/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";

await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });

const deck = await PresentationFile.importPptx(await FileBlob.load(sourcePath));
const target = deck.resolve("sh/n6ls3alk");
const oldText = "เปลี่ยนโอกาสจาก AI ให้เป็นระบบและ workflow ที่สร้างผลลัพธ์ทางธุรกิจ";
const newText = "เปลี่ยนระบบงานเดิม โดยใช้ AI เข้ามาช่วยสร้างผลลัพธ์ทางธุรกิจ";
if (target.text.toString() !== oldText) {
  throw new Error(`Unexpected source text: ${target.text.toString()}`);
}
target.text.replace(oldText, newText);

await (await PresentationFile.exportPptx(deck)).save(candidatePath);

const { finalizePresentation } = await import(pathToFileURL(
  path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs"),
).href);

const result = await finalizePresentation({
  explicitTotalSlideCount: 10,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: ["Noto Sans Thai"], scriptFonts: { ea: "Noto Sans Thai" } },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "Gracer-AI-Company-Overview-2026-r2.validation.json"),
});

console.log(JSON.stringify({ finalPath, result }, null, 2));
