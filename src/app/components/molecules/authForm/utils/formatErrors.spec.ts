import { formatError } from "./formatErrors";

describe("formatErrors", () => {
  it("should return formatted errors from an array error strings", () => {
    expect(
      formatError([
        "Password must contain uppercase, lowercase, number, and special character.",
        "Password must be at least 8 characters long.",
        "email must be an email",
      ])
    ).toEqual({
      password: {
        messages: [
          "Password must contain uppercase, lowercase, number, and special character.",
          "Password must be at least 8 characters long.",
        ],
      },
      email: { messages: ["email must be an email"] },
    });
  });

  it("should return formatted error from a single error string", () => {
    expect(
      formatError(
        "Password must contain uppercase, lowercase, number, and special character."
      )
    ).toEqual({
      password: {
        messages: [
          "Password must contain uppercase, lowercase, number, and special character.",
        ],
      },
    });

    expect(formatError("email must be an email")).toEqual({
      email: {
        messages: ["email must be an email"],
      },
    });
  });
});
