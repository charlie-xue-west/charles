import { FormErrors } from "../types";

export const formatError = (errors: string[]) => {
  const formErrors: FormErrors = {};

  const errorMap: Record<string, keyof FormErrors> = {
    "Password must be at least 8 characters long.": "password",
    "Password must not exceed 64 characters.": "password",
    "Password must contain uppercase, lowercase, number, and special character.":
      "password",
    "email must be an email": "email",
  };

  for (const error of errors) {
    // TypeScript doesn't enforce type safety on default values (|| "test")
    const errorType = errorMap[error] ? errorMap[error] : "unknown";

    if (errorType) {
      if (!formErrors[errorType]) {
        formErrors[errorType] = { messages: [] };
      }

      formErrors[errorType].messages = formErrors[errorType].messages
        ? [...formErrors[errorType].messages, error]
        : [error];
    } else {
    }
  }

  return formErrors;
};
