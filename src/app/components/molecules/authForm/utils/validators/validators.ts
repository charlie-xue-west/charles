import {
  FormTypes,
  FormData,
  ValidateErrors,
  PasswordStatusTypes,
} from "../../types";

export const checkPassWord = (password: string, confirmPassword: string) => {
  return {
    "One lowercase character": /[a-z]/.test(password),
    "One uppercase character": /[A-Z]/.test(password),
    "One number": /\d/.test(password),
    "One special character": /[!@#$%^&*(),.?":{}|<>]/.test(password),
    "8 characters minimum": password.length >= 8,
    "Passwords must match":
      password.length > 1 &&
      confirmPassword.length > 1 &&
      password === confirmPassword,
  };
};

export const checkEmail = (email: string) => {
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return strictEmailRegex.test(email);
};

export const validateForm = (
  formType: FormTypes,
  target: string,
  currentForm: FormData
) => {
  if (formType === "signup") {
    const result = {
      validationErrors: {} as ValidateErrors,
      updatedPasswordStatus: {} as PasswordStatusTypes,
    };

    if (target === "password" || target === "confirmPassword") {
      // for condition checklist
      const updatedPasswordStatus = checkPassWord(
        currentForm.password,
        currentForm.confirmPassword || ""
      );

      result.updatedPasswordStatus = updatedPasswordStatus;

      Object.values(updatedPasswordStatus).some((isConditionMet) => {
        if (isConditionMet === false) {
          result.validationErrors.password = "Not all password conditions met.";
        }
      });
    }

    if (target === "email" && currentForm.email) {
      if (!checkEmail(currentForm.email)) {
        result.validationErrors.email =
          "Email must be in correct the format: example@org.com";
      }
    }

    return result;
  }
};

export const hasValue = (obj: Record<string, unknown>) =>
  Object.values(obj).some((value) => Boolean(value));

export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};
