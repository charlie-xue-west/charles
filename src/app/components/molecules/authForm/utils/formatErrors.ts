import { FormErrors } from "../types";

export const categorizeErrors = (errors: string[] | string) => {
  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  const formErrors: FormErrors = {};

  const errorMap: Record<string, keyof FormErrors> = {
    "Duplicate User Name.": "userName",
    "Duplicate email.": "email",
    "Password must be at least 8 characters long.": "password",
    "Password must not exceed 64 characters.": "password",
    "Password must contain uppercase, lowercase, number, and special character.":
      "password",
    "Invalid email format.": "email",
    "Invalid date format.": "dob",
  };

  for (const error of errors) {
    // TypeScript doesn't enforce type safety on default values (|| "test")
    const errorType = errorMap[error] ? errorMap[error] : "unknown";

    if (!formErrors[errorType]) {
      formErrors[errorType] = { messages: [] };
    }

    formErrors[errorType].messages = formErrors[errorType].messages
      ? [...formErrors[errorType].messages, error]
      : [error];
  }

  return formErrors;
};

export const joinErrors = (errors: string[]) => {
  return errors.length > 1 ? errors.join(" ") : errors[0];
};
