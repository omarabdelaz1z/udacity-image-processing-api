import Joi from "@hapi/joi";
import { REQUIRED_FIELD, POSITIVE_NUMBER } from "./constants";

const imageQuerySchema = Joi.object({
  filename: Joi.string().required().label("Image Filename").messages({
    "any.required": REQUIRED_FIELD,
  }),
  width: Joi.number().positive().required().label("Image Width").messages({
    "any.required": REQUIRED_FIELD,
    "number.positive": POSITIVE_NUMBER,
  }),
  height: Joi.number().positive().required().label("Image Height").messages({
    "number.positive": POSITIVE_NUMBER,
    "any.required": REQUIRED_FIELD,
  }),
}).with("width", "height");

export default imageQuerySchema;
