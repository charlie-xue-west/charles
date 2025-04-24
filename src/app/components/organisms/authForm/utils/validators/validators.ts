import { isAfter, parseISO } from "date-fns";
import {
  FormTypes,
  FormData,
  ValidateErrors,
  PasswordStatusTypes,
  SubmissionErrors,
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

export const checkDate = (date: string) => {
  const today = new Date();
  const inputDate = parseISO(date);

  return !isAfter(inputDate, today);
};

export const validateForm = (
  formType: FormTypes,
  target: string,
  currentForm: FormData,
  currentValidError: ValidateErrors,
  currentPasswordStatus: PasswordStatusTypes,
  currentSubError: SubmissionErrors
) => {
  const updatedValidationErrors = currentValidError;
  let updatedPasswordStatus = currentPasswordStatus;
  const updatedSubErrors = currentSubError;

  if (formType === "signup") {
    if (target === "email" && currentForm.email) {
      updatedValidationErrors.email = checkEmail(currentForm.email)
        ? ""
        : "Email must be in correct the format: example@org.com";
    } else if (target === "password" || target === "confirmPassword") {
      // for condition checklist
      const passwordStatus = checkPassWord(
        currentForm.password,
        currentForm.confirmPassword || ""
      );

      updatedPasswordStatus = passwordStatus;

      Object.values(updatedPasswordStatus).some((isConditionMet) => {
        updatedValidationErrors.password = isConditionMet
          ? ""
          : "Not all password conditions met.";
      });
    } else if (target === "dateOfBirth" && currentForm.dateOfBirth) {
      updatedValidationErrors.dateOfBirth = checkDate(currentForm.dateOfBirth)
        ? ""
        : "Date of birth cannot be after today.";
    }
  }

  updatedSubErrors.unknown = [];

  return { updatedValidationErrors, updatedPasswordStatus, updatedSubErrors };
};

export const hasValue = (obj: Record<string, unknown>) =>
  Object.values(obj).some((value) => Boolean(value));

export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};
