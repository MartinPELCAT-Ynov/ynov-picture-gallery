import { promises } from "fs";
import { join } from "path";
import { logger } from "./logger-utils";

export const UPLOAD_FOLDER = join(__dirname, "../upload");
export const UPLOAD_TMP_FOLDER = join(UPLOAD_FOLDER, "/tmp");

export const setupUploadFolder = async () => {
  try {
    await promises.stat(UPLOAD_TMP_FOLDER);
  } catch (error) {
    logger.info("🗂 Creating upload folder");
    await promises.mkdir(UPLOAD_TMP_FOLDER, { recursive: true });
  }
};
