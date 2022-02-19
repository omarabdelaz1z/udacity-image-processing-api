import { resolve } from "path";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import express, { Request, Response } from "express";

import logger from "./utils/log/logger";
import api from "./routes/index";
import { THUMB_IMAGE_PATH } from "./utils/constants";
import { createDirectory, isPathAccessible } from "./utils/general";

const app: express.Application = express();

const PORT = (process.env.PORT as unknown as number) || 5000;

app.use(morgan("dev"));

app.use("/api", api);

app.get("/", (_: Request, res: Response) =>
  res.status(StatusCodes.OK).send("Image Processing API")
);

app.listen(PORT, async (): Promise<void> => {
  const thumbPath = resolve(__dirname, `../${THUMB_IMAGE_PATH}`);

  const isAccessible = await isPathAccessible(thumbPath);
  if (!isAccessible) createDirectory(thumbPath);
  logger.info(`Server listens on port ${PORT}`);
});

export default app;
