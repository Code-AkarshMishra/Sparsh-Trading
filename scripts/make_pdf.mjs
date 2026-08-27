import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
];

const binary = edgePaths.find((p) => fs.existsSync(p));

if (!binary) {
  console.error("No Edge or Chrome binary found.");
  process.exit(1);
}

const docsDir = path.resolve("docs");

const files = [
  { html: path.join(docsDir, "CUSTOMER_USER_GUIDE.html"), pdf: path.join(docsDir, "CUSTOMER_USER_GUIDE.pdf") },
  { html: path.join(docsDir, "ADMIN_OPERATIONS_MANUAL.html"), pdf: path.join(docsDir, "ADMIN_OPERATIONS_MANUAL.pdf") }
];

for (const f of files) {
  console.log(`Generating PDF: ${f.pdf}...`);
  const fileUrl = `file:///${f.html.replace(/\\/g, "/")}`;
  execSync(`"${binary}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${f.pdf}" "${fileUrl}"`, { stdio: "inherit" });
  if (fs.existsSync(f.pdf)) {
    const size = fs.statSync(f.pdf).size;
    console.log(`Generated: ${path.basename(f.pdf)} (${size} bytes)`);
  }
}
