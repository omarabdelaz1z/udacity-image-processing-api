import { resolve, join } from "path";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import resizeImage from "../utils/sharp";
import { FULL_IMAGE_PATH, THUMB_IMAGE_PATH } from "../utils/constants";
import { isPathAccessible } from "../utils/general";
import logger from "../utils/log/logger";

const RESOLVED_FULL_PATH = resolve(__dirname, `../../${FULL_IMAGE_PATH}`);
const RESOLVED_THUMB_PATH = resolve(__dirname, `../../${THUMB_IMAGE_PATH}`);

const getResizedImage = async (req: Request, res: Response) => {
  const { image: filename } = req.params;

  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const [name, format] = (filename as string).split(".");

  const inputPath = join(RESOLVED_FULL_PATH, filename as string);
  const thumbnailFilename = `thumb-${name}-${width}x${height}.${format}`;
  const outputPath = join(RESOLVED_THUMB_PATH, thumbnailFilename);

  try {
    const isAccessible = await isPathAccessible(outputPath);

    if (isAccessible) {
      logger.info(`File ${filename} is cached`);
      logger.info(`Output Path: ${outputPath}`);
      return res.status(StatusCodes.OK).sendFile(outputPath);
    }

    await resizeImage({ height, width, inputPath, outputPath });

    return res.status(StatusCodes.ACCEPTED).sendFile(outputPath);
  } catch (reason) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send(
        `Couldn't process the image ${filename} for the following reason: ${reason}`
      );
  }
};

export default getResizedImage;
