import { formatError } from "./formatErrors";

describe("formatErrors", () => {
  it("should return formatted errors an array error strings", () => {
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
});
