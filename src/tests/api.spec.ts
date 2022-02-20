// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { resolve } from "path";
import { rm } from "fs/promises";
import { StatusCodes } from "http-status-codes";
import app from "../index";
import { createDirectory } from "../utils/general";
import logger from "../utils/log/logger";

const request = supertest(app);

const THUMB_PATH = resolve(__dirname, "../../assets/images/thumb");

describe("test endpoint /api/images/", () => {
  beforeAll(async () => {
    await createDirectory(THUMB_PATH);
  });

  it("test endpoint /api/images/", async () => {
    const response = await request.get("/api/images/");
    expect(response.statusCode).toBe(StatusCodes.NOT_IMPLEMENTED);
  });

  it("test endpoint /api/images/fjord.jpg", async () => {
    const response = await request.get("/api/images/fjord.jpg");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it("test endpoint /api/images/fjord.jpg?width=200", async () => {
    const response = await request.get("/api/images/fjord.jpg?width=200");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  it("test endpoint /api/images/fjord.jpg?width=200?&height=200", async () => {
    const response = await request.get(
      "/api/images/fjord.jpg?width=200&height=200"
    );

    expect(response.statusCode).toBe(StatusCodes.ACCEPTED);
  });

  it("test endpoint /api/images/fjord.jpg?width=200?&height=200", async () => {
    const response = await request.get(
      "/api/images/fjord.jpg?width=200&height=200"
    );

    expect(response.statusCode).toBe(StatusCodes.OK);
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
