import { Response, Router, Request } from "express";
import { StatusCodes } from "http-status-codes";
import getResizedImage from "../../controllers/ImageController";
import {
  validateImageQuery,
  isImageExists,
} from "../../middleware/image-processing";

const images = Router();

images
  .route("/")
  .get((_: Request, res: Response) =>
    res
      .status(StatusCodes.NOT_IMPLEMENTED)
      .send("Please replace the image name with :image in /api/images/:image")
  );

images
  .route("/:image")
  .get(...[validateImageQuery, isImageExists, getResizedImage]);

export default images;
