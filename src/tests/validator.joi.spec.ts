import { VALIDATE_OPTIONS } from "../utils/constants";
import imageQuerySchema from "../utils/validator.joi";

describe("Validate Image Parameters", () => {
  it(`An image with the following params is valid: \n\t- width: [200]\n\t- height [200]\n\t- filename: [sample.jpeg]`, () => {
    const validation = imageQuerySchema.validate(
      {
        width: 200,
        height: 200,
        filename: "sample.jpeg",
      },
      VALIDATE_OPTIONS
    );
    expect(validation?.error).toBeFalsy();
  });

  it("An image with the following params is invalid [Missing Width and Height]: \n\t- width: []\n\t- height []\n\t- filename: [sample.jpeg]", () => {
    const validation = imageQuerySchema.validate(
      {
        filename: "sample.jpeg",
      },
      VALIDATE_OPTIONS
    );
    expect(validation?.error).toBeTruthy();
  });

  it("An image with the following params is invalid [Missing Height]: \n\t- width: [200]\n\t- height []\n\t- filename: [sample.jpeg]", () => {
    const validation = imageQuerySchema.validate(
      {
        width: 200,
        filename: "sample.jpeg",
      },
      VALIDATE_OPTIONS
    );
    expect(validation?.error).toBeTruthy();
  });

  it("An image with the following params is invalid [Incorrect Value]: \n\t- width: [-40]\n\t- height [0]\n\t- filename: [sample.jpeg]", () => {
    const validation = imageQuerySchema.validate(
      {
        width: 200,
        filename: "sample.jpeg",
      },
      VALIDATE_OPTIONS
    );
    expect(validation?.error).toBeTruthy();
  });

  it("An image with the following params is invalid [zero pixels is not acceptable]: \n\t- width: [0]\n\t- height [0]\n\t- filename: [sample.jpeg]", () => {
    const validation = imageQuerySchema.validate(
      {
        width: 200,
        filename: "sample.jpeg",
      },
      VALIDATE_OPTIONS
    );
    expect(validation?.error).toBeTruthy();
  });
});
