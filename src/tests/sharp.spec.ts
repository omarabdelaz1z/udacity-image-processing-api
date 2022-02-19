import { rm } from "fs/promises";
import { join, resolve } from "path";
import { createDirectory, isPathAccessible } from "../utils/general";
import logger from "../utils/log/logger";
import resizeImage from "../utils/sharp";

const THUMB_PATH = resolve(__dirname, "../../assets/images/thumb");

describe("Test Image Resizing Functionality", () => {
  beforeAll(async () => {
    await createDirectory(THUMB_PATH);
  });

  it(`[SUCCESS] Resize Image [fjord.jpg] into 200x200`, async () => {
    const [name, format] = "fjord.jpg".split(".");

    const inputPath = resolve(
      __dirname,
      `../../assets/images/full/${name}.${format}`
    );
    const params = {
      inputPath,
      height: 200,
      width: 200,
    };

    const thumbnailFilename = `thumb-${name}-${params.width}x${params.height}.${format}`;

    const outputPath = join(THUMB_PATH, thumbnailFilename);

    await resizeImage({
      ...params,
      outputPath,
    });

    const isAccessible = await isPathAccessible(outputPath);
    expect(isAccessible).toBeTruthy();
  });

  afterAll(() => {
    rm(THUMB_PATH, { recursive: true })
      .then(() => {
        logger.info(`Directory ${THUMB_PATH} is removed successfully.`);
      })
      .catch((error) => {
        logger.error(
          `Error occured while trying to rmdir ${THUMB_PATH} due to ${error}`
        );
      });
  });
});
