export type AuthFormProps = {
  formType: "signup" | "login";
  className?: string;
};

export type FormData = {
  userName: string;
  password: string;
  confirmPassword: string;
  email?: string;
  dateOfBirth?: string;
};

export type SubErrorContent = {
  messages: string[];
};

export type SubmissionErrors = {
  userName?: SubErrorContent;
  email?: SubErrorContent;
  password?: SubErrorContent;
  dob?: SubErrorContent;
  unknown?: SubErrorContent;
};

export type ValidateErrors = {
  userName?: string;
  email?: string;
  password?: string;
  dob?: string;
};

export type PasswordCheckTypes = {
  "One lowercase character": boolean;
  "One uppercase character": boolean;
  "One number": boolean;
  "One special character": boolean;
  "8 characters minimum": boolean;
};
