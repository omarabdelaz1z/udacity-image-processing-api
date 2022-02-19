import { join, resolve } from "path";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { isPathAccessible } from "../utils/general";
import logger from "../utils/log/logger";

import imageQuerySchema from "../utils/validator.joi";
import { VALIDATE_OPTIONS, FULL_IMAGE_PATH } from "../utils/constants";

const RESOLVED_FULL_PATH = resolve(__dirname, `../../${FULL_IMAGE_PATH}`);

export const validateImageQuery = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { width, height } = req.query;
  const { image: filename } = req.params;

  logger.info(
    `Received the following data: filename [${filename}] & width [${width}] & height [${height}]`
  );

  const validation = imageQuerySchema.validate(
    { width, height, filename },
    VALIDATE_OPTIONS
  );

  if (validation?.error) {
    const errorMessage = validation?.error?.details?.[0]?.message;
    logger.info(`VALIDATION ERROR: ${errorMessage}`);

    return res.status(StatusCodes.BAD_REQUEST).send(errorMessage);
  }

  logger.info("No validation errors detected.");
  return next();
};

export const isImageExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { image: filename } = req.params;

    const filepath = join(RESOLVED_FULL_PATH, filename as string);

    const isAccessible = await isPathAccessible(filepath);

    if (!isAccessible) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(`Cannot find file named: ${filename}`);
    }

    logger.info(`The following file ${filename} is located.`);

    return next();
  } catch (error) {
    logger.error(`${error}`);
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(`Error while finding the file`);
  }
};
