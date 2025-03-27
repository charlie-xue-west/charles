export type FormTypes = "signup" | "login";

export type AuthFormProps = {
  formType: FormTypes;
  className?: string;
};

export type FormData = {
  userName: string;
  password: string;
  confirmPassword?: string;
  email?: string;
  dateOfBirth?: string;
};

export type SubErrorContent = {
  messages: string[];
};

export type SubmissionErrors = {
  userName: string[];
  email: string[];
  password: string[];
  dateOfBirth: string[];
  unknown: string[];
};

export type ValidateErrors = {
  userName: string;
  email: string;
  password: string;
  dateOfBirth: string;
};

export type PasswordStatusTypes = {
  "One lowercase character": boolean;
  "One uppercase character": boolean;
  "One number": boolean;
  "One special character": boolean;
  "8 characters minimum": boolean;
  "Passwords must match": boolean;
};
