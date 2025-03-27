import { SubmissionErrors } from "../../types";

export const categorizeErrors = (errors: string[] | string) => {
  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  const formErrors: SubmissionErrors = {
    userName: [],
    email: [],
    password: [],
    dateOfBirth: [],
    unknown: [],
  };

  const errorMap: Record<string, keyof SubmissionErrors> = {
    "Duplicate User Name.": "userName",
    "Duplicate email.": "email",
    "Password must be at least 8 characters long.": "password",
    "Password must not exceed 64 characters.": "password",
    "Password must contain uppercase, lowercase, number, and special character.":
      "password",
    "Invalid email format.": "email",
    "Invalid date format.": "dateOfBirth",
  };

  for (const error of errors) {
    // TypeScript doesn't enforce type safety on default values (|| "test")
    const errorType = errorMap[error] ? errorMap[error] : "unknown";

    if (!formErrors[errorType]) {
      formErrors[errorType] = [];
    }

    formErrors[errorType] = formErrors[errorType]
      ? [...formErrors[errorType], error]
      : [error];
  }

  return formErrors;
};

export const joinErrors = (errors: string[]) => {
  return errors.length > 1 ? errors.join(" ") : errors[0];
};
