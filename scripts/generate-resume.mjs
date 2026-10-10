import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
  await readFile(path.join(root, "src", "data", "portfolio.json"), "utf8"),
);

const pdf = await PDFDocument.create();
pdf.setTitle(`${data.profile.name} Resume`);
pdf.setAuthor(data.profile.name);
pdf.setSubject("Professional resume");
pdf.setKeywords(["Computer Science Teacher", "Full-Stack Developer", "Next.js"]);
pdf.setCreator("Pooja Portfolio resume generator");

const regular = await pdf.embedFont(StandardFonts.Helvetica);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const pageWidth = 612;
const pageHeight = 792;
const margin = 46;
const bottomMargin = 36;
const contentWidth = pageWidth - margin * 2;
const indent = 12;
const ink = rgb(0.11, 0.14, 0.2);
const muted = rgb(0.31, 0.35, 0.42);
const accent = rgb(0.08, 0.36, 0.4);
const white = rgb(1, 1, 1);
const softWhite = rgb(0.86, 0.94, 0.94);
const lightTint = rgb(0.88, 0.95, 0.95);

const BODY = 9.8;
const BODY_LH = 12.4;
const SMALL = 9.2;
const SMALL_LH = 11.6;

const pages = [];
let page;
let y;

function addPage() {
  page = pdf.addPage([pageWidth, pageHeight]);
  pages.push(page);
  y = pageHeight - margin;
}

function width(text, font, size) {
  return font.widthOfTextAtSize(text, size);
}

function wrap(text, font, size, maxWidth, firstLineOffset = 0) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  let limit = maxWidth - firstLineOffset;

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (width(candidate, font, size) <= limit) {
      line = candidate;
    } else {
      if (line) {
        lines.push(line);
        limit = maxWidth;
      }
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function ensureSpace(height) {
  if (y - height < bottomMargin) addPage();
}

function drawLines(lines, options = {}) {
  const {
    font = regular,
    size = BODY,
    color = ink,
    x = margin,
    lineHeight = BODY_LH,
    gapAfter = 0,
  } = options;

  const wrapped = lines.flatMap((line) => wrap(line, font, size, pageWidth - margin - x));
  ensureSpace(wrapped.length * lineHeight + gapAfter);
  for (const line of wrapped) {
    page.drawText(line, { x, y, font, size, color });
    y -= lineHeight;
  }
  y -= gapAfter;
}

function bullet(text, options = {}) {
  const { size = BODY, lineHeight = BODY_LH, color = ink, label, gapAfter = 2 } = options;
  const textX = margin + indent + 13;
  const maxWidth = pageWidth - margin - textX;
  const labelText = label ? `${label} ` : "";
  const labelWidth = label ? width(labelText, bold, size) : 0;
  const lines = wrap(text, regular, size, maxWidth, labelWidth);
  ensureSpace(lines.length * lineHeight + gapAfter);
  page.drawText("•", { x: margin + indent + 3, y, font: bold, size, color: accent });
  if (label) page.drawText(labelText, { x: textX, y, font: bold, size, color: ink });
  for (const [index, line] of lines.entries()) {
    page.drawText(line, {
      x: index === 0 ? textX + labelWidth : textX,
      y,
      font: regular,
      size,
      color,
    });
    y -= lineHeight;
  }
  y -= gapAfter;
}

function section(title) {
  ensureSpace(70);
  y -= 6;
  const barHeight = 19;
  page.drawRectangle({
    x: margin,
    y: y - 6,
    width: contentWidth,
    height: barHeight,
    color: accent,
  });
  page.drawText(title.toUpperCase(), {
    x: margin + 9,
    y,
    font: bold,
    size: 10.5,
    color: white,
  });
  y -= 24;
}

function subheading(title, right) {
  ensureSpace(52);
  const barHeight = 17;
  page.drawRectangle({
    x: margin,
    y: y - 5,
    width: contentWidth,
    height: barHeight,
    color: lightTint,
  });
  page.drawText(title, { x: margin + 8, y, font: bold, size: 10.8, color: accent });
  if (right) {
    page.drawText(right, {
      x: pageWidth - margin - 8 - width(right, regular, 9.2),
      y,
      font: regular,
      size: 9.2,
      color: muted,
    });
  }
  y -= 20;
}

function role(entry) {
  subheading(entry.role, entry.date);
  drawLines([entry.company], {
    x: margin + indent,
    size: SMALL,
    color: muted,
    lineHeight: SMALL_LH,
    gapAfter: 2,
  });
  for (const item of entry.responsibilities) bullet(item);
  y -= 5;
}

function project(entry) {
  subheading(entry.title);
  bullet(entry.description);
  bullet(entry.tags.join(", "), { label: "Technologies:", size: SMALL, lineHeight: SMALL_LH, color: muted });
  if (entry.url) {
    bullet(entry.url.replace(/^https?:\/\//, "").replace(/\/$/, ""), {
      label: "Live:",
      size: SMALL,
      lineHeight: SMALL_LH,
      color: muted,
    });
  }
  y -= 5;
}

addPage();

const bandHeight = 96;
page.drawRectangle({
  x: 0,
  y: pageHeight - bandHeight,
  width: pageWidth,
  height: bandHeight,
  color: accent,
});
y = pageHeight - 42;
page.drawText(data.profile.name, { x: margin, y, font: bold, size: 25, color: white });
y -= 21;
page.drawText(data.profile.title, { x: margin, y, font: bold, size: 12, color: softWhite });
y -= 19;
page.drawText(
  `${data.profile.email}  |  ${data.profile.linkedin}  |  ${data.profile.github}`,
  { x: margin, y, font: regular, size: 9, color: white },
);
y = pageHeight - bandHeight - 14;

section("Professional Summary");
drawLines([data.profile.summary], { size: 10.2, lineHeight: 13.2, gapAfter: 1 });

section("Professional Experience");
for (const entry of data.experience) role(entry);

section("Education");
for (const entry of data.education) {
  subheading(entry.degree, entry.date);
  drawLines([`${entry.institution} | ${entry.grade}`], {
    x: margin + indent,
    size: SMALL,
    color: muted,
    lineHeight: SMALL_LH,
    gapAfter: 5,
  });
}

section("Technical Skills");
for (const skill of data.skills) {
  bullet(skill.items.join(", "), { label: `${skill.category}:` });
}

section("Projects");
for (const projectEntry of data.projects.filter((entry) => entry.id !== "education")) {
  project(projectEntry);
}

section("Certificates & Achievement");
bullet(data.certificates.join("; "), { label: "Certificates:" });
bullet(data.achievement);

section("Languages");
for (const language of data.languages) {
  bullet(`(${language.level})`, { label: language.name });
}

if (pages.length > 2) {
  throw new Error(`Resume must fit in 2 pages; generated ${pages.length}.`);
}

const output = path.join(root, "public", "Pooja_Resume.pdf");
await writeFile(output, await pdf.save({ useObjectStreams: false }));
console.log(`Generated ${output} (${pages.length} pages).`);
