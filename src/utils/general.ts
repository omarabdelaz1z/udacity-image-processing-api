import { access, mkdir } from "fs/promises";
import logger from "./log/logger";

/**
 * Check if filepath is accessible.
 * @param filepath string
 * @returns Promise<boolean>
 */
export const isPathAccessible = (filepath: string) =>
  access(filepath)
    .then((): boolean => {
      logger.info(`File ${filepath} is accessed!`);
      return true;
    })
    .catch((error): boolean => {
      logger.error(
        `File ${filepath} cannot be accessed due to error: ${error}`
      );
      return false;
    });

/**
 * Create directory given directory path
 * @param dirpath string
 * @returns Promise<boolean>
 */
export const createDirectory = async (dirpath: string): Promise<boolean> =>
  mkdir(dirpath)
    .then(() => {
      logger.info(
        `Created ${dirpath.split("/").slice(-1)} directory successfully.`
      );
      return true;
    })
    .catch((err) => {
      logger.error(`Couldn't create the directory. ${err}`);
      return false;
    });
