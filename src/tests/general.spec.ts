import { resolve } from "path";
import { rm } from "fs/promises";
import { isPathAccessible, createDirectory } from "../utils/general";
import logger from "../utils/log/logger";

describe("check if a path is accessible", () => {
  it(`the file [encenadaport.jpg] should be accessed`, async () => {
    const filepath = resolve(
      __dirname,
      "../../assets/images/full/encenadaport.jpg"
    );

    const isAccessible = await isPathAccessible(filepath);
    expect(isAccessible).toBeTruthy();
  });

  it(`the file [encenadaport1.jpg] should not be accessed`, async () => {
    const filepath = resolve(
      __dirname,
      "../../assets/images/full/encenadaport1.jpg"
    );

    const isAccessible = await isPathAccessible(filepath);
    expect(isAccessible).toBeFalsy();
  });
});

describe("mkdir suite", () => {
  const filepath = resolve(__dirname, "../../assets/images/temp/");

  it(`try to mkdir /images/temp: created`, async () => {
    const creatable = await createDirectory(filepath);
    expect(creatable).toBeTruthy();
  });

  it(`try to mkdir /images/temp: should not be created, it do already exists`, async () => {
    const creatable = await createDirectory(filepath);
    expect(creatable).toBeFalsy();
  });

  afterAll(() => {
    rm(filepath, { recursive: true })
      .then(() => {
        logger.info(`Directory ${filepath} is removed successfully.`);
      })
      .catch((error) => {
        logger.error(
          `Error occured while trying to rmdir ${filepath} due to ${error}`
        );
      });
  });
});
