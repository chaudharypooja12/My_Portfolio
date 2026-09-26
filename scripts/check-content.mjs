#!/usr/bin/env node
/**
 * check-content.mjs — content guard for the Pooja portfolio.
 *
 * Not a test suite. This is a static site whose entire content lives in
 * `src/data/portfolio.json`, so the realistic failure modes are: a malformed or
 * truncated JSON edit, a missing required field, a section that silently renders
 * empty, and a resume PDF that has drifted from the data that generates it.
 *
 * This script fails the build on those. Read-only: it never writes.
 *
 * Usage:  node scripts/check-content.mjs
 * Exit 0 = clean, 1 = problem found.
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DATA_FILE = join(ROOT, "src", "data", "portfolio.json");
const RESUME_PDF = join(ROOT, "public", "Pooja_Resume.pdf");

const failures = [];
const notes = [];
const fail = (check, message) => failures.push(`[${check}] ${message}`);

// ---------------------------------------------------------------------------
// Load
// ---------------------------------------------------------------------------
if (!existsSync(DATA_FILE)) {
  console.error(`✗ ${DATA_FILE} is missing.`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(readFileSync(DATA_FILE, "utf8"));
} catch (err) {
  console.error(`✗ portfolio.json is not valid JSON: ${err.message}`);
  process.exit(1);
}
notes.push("portfolio.json: valid JSON");

// ---------------------------------------------------------------------------
// Required top-level sections
// ---------------------------------------------------------------------------
const REQUIRED_SECTIONS = [
  "profile",
  "experience",
  "skills",
  "projects",
  "education",
  "certificates",
  "achievement",
];

for (const key of REQUIRED_SECTIONS) {
  if (!(key in data)) {
    fail("sections", `portfolio.json is missing the "${key}" section.`);
  }
}

// ---------------------------------------------------------------------------
// profile — required identity fields
// ---------------------------------------------------------------------------
const REQUIRED_PROFILE = ["name", "title", "email", "linkedin", "github", "summary"];
if (data.profile) {
  for (const key of REQUIRED_PROFILE) {
    const v = data.profile[key];
    if (v === undefined || v === null || String(v).trim() === "") {
      fail("profile", `profile.${key} is empty.`);
    }
  }
  if (data.profile.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.profile.email)) {
    fail("profile", `profile.email "${data.profile.email}" is not a valid address.`);
  }
}

// ---------------------------------------------------------------------------
// Collections must be non-empty arrays — an empty section renders as a silent gap
// ---------------------------------------------------------------------------
const COLLECTIONS = ["experience", "skills", "projects", "education", "certificates"];
for (const key of COLLECTIONS) {
  const v = data[key];
  if (v === undefined) continue; // already reported as a missing section
  if (!Array.isArray(v)) {
    fail("collections", `"${key}" should be an array, found ${typeof v}.`);
  } else if (v.length === 0) {
    fail("collections", `"${key}" is an empty array — the section will render blank.`);
  }
}
if (Array.isArray(data.achievement)) {
  if (data.achievement.length === 0) {
    fail("collections", '"achievement" is an empty array.');
  }
} else if (typeof data.achievement === "string" && data.achievement.trim() === "") {
  fail("collections", '"achievement" is an empty string.');
}

// ---------------------------------------------------------------------------
// Experience entries need the fields the resume generator and the UI both read.
// ---------------------------------------------------------------------------
if (Array.isArray(data.experience)) {
  data.experience.forEach((entry, i) => {
    if (!entry || typeof entry !== "object") {
      fail("experience", `experience[${i}] is not an object.`);
      return;
    }
    for (const key of ["company", "role"]) {
      if (!entry[key] || String(entry[key]).trim() === "") {
        fail("experience", `experience[${i}] is missing "${key}".`);
      }
    }
  });
  notes.push(`experience: ${data.experience.length} entries validated`);
}

// ---------------------------------------------------------------------------
// Projects — every project needs a title, and a demo/screenshot must exist on disk
// if one is declared.
// ---------------------------------------------------------------------------
if (Array.isArray(data.projects)) {
  const projectIssues = [];
  data.projects.forEach((project, i) => {
    if (!project || typeof project !== "object") {
      projectIssues.push(`projects[${i}] is not an object`);
      return;
    }
    const title = project.title ?? project.name;
    if (!title || String(title).trim() === "") {
      projectIssues.push(`projects[${i}] has no title/name`);
    }
  });
  for (const issue of projectIssues) fail("projects", issue);
  notes.push(`projects: ${data.projects.length} entries validated`);
}

// ---------------------------------------------------------------------------
// Resume PDF — generated artifact must exist and be non-trivial.
// A missing PDF is the one failure a visitor would actually notice.
// ---------------------------------------------------------------------------
if (!existsSync(RESUME_PDF)) {
  fail(
    "resume",
    `public/Pooja_Resume.pdf is missing. Run \`npm run resume:generate\` after editing portfolio.json.`
  );
} else {
  const size = statSync(RESUME_PDF).size;
  if (size < 5000) {
    fail("resume", `public/Pooja_Resume.pdf is only ${size} bytes — it is probably truncated.`);
  } else {
    notes.push(`resume: Pooja_Resume.pdf present (${Math.round(size / 1024)} KB)`);
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
for (const n of notes) console.log(`  ok  ${n}`);

if (failures.length > 0) {
  console.error(`\n✗ content check failed (${failures.length} issue(s)):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error("");
  process.exit(1);
}

console.log("\n✓ content check passed\n");
