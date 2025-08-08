import fs from "node:fs/promises";
import sharp from "sharp";
import { resolveFromRoot } from "../path.js";

export function optimizeImages(inputDir, outputDir) {
  return new Promise(async (resolve, reject) => {
    console.log("-> Optimizing images...");

    try {
      const files = await fs.readdir(resolveFromRoot(`${inputDir}`));

      for (const [index, value] of files.entries()) {
        const inputPath = resolveFromRoot(`${inputDir}/${value}`);
        const outputPath = resolveFromRoot(
          `${outputDir}/${value.replace(".jpg", "")}.webp`,
        );

        if (/\.(jpg|jpeg|png|gif|tiff)$/i.test(value)) {
          try {
            1;
            await sharp(inputPath)
              .resize(150, 225)
              .webp({ quality: 50 })
              .toFile(outputPath);
          } catch (error) {
            console.error(`Error processing ${value}:`, error);
          }
        } else {
          console.log(`Skipped ${value}: not an image file`);
        }

        if (index + 1 === files.length) {
          console.log("--> Finished optimizing images!");
          resolve();
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      reject();
    }
  });
}
