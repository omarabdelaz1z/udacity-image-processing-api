import sharp from "sharp";
import logger from "./log/logger";

interface ResizeParams {
  inputPath: string;
  height: number;
  width: number;
  outputPath: string;
}

const resizeImage = async (params: ResizeParams): Promise<void> => {
  const { inputPath, width, height, outputPath } = params;

  try {
    const transformer = sharp(inputPath)
      .resize({ width, height })
      .toFormat("jpg");

    await transformer
      .toFile(outputPath)
      .then(() => {
        logger.info(`Image ${inputPath} is resized correctly`);
      })
      .catch((error) => {
        logger.error(`Error occurs while processing the image ${error}`);
      });
  } catch (reason) {
    logger.error(`${reason}`);
  }
};

export default resizeImage;
