import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");

async function scanAndConvert(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let convertedCount = 0;
  let totalSavedBytes = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const res = await scanAndConvert(fullPath);
      convertedCount += res.convertedCount;
      totalSavedBytes += res.totalSavedBytes;
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        const originalStats = fs.statSync(fullPath);
        
        await sharp(fullPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(webpPath);
        
        const webpStats = fs.statSync(webpPath);
        const saved = originalStats.size - webpStats.size;
        totalSavedBytes += Math.max(0, saved);
        convertedCount++;

        console.log(`✓ Converted: ${path.relative(PUBLIC_DIR, fullPath)} (${Math.round(originalStats.size / 1024)} KB) → ${path.relative(PUBLIC_DIR, webpPath)} (${Math.round(webpStats.size / 1024)} KB) [Saved ${Math.round((saved / originalStats.size) * 100)}%]`);
      }
    }
  }

  return { convertedCount, totalSavedBytes };
}

async function main() {
  console.log("🚀 Starting WebP Conversion while preserving original source files...\n");
  const result = await scanAndConvert(PUBLIC_DIR);
  console.log(`\n🎉 Completed! Converted ${result.convertedCount} images to WebP.`);
  console.log(`💾 Total payload reduction: ${(result.totalSavedBytes / (1024 * 1024)).toFixed(2)} MB saved across public assets.`);
}

main().catch((err) => {
  console.error("Error during conversion:", err);
  process.exit(1);
});
