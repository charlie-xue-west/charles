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

export type FormErrorContent = {
  messages?: string[];
};

export type FormErrors = {
  userName?: FormErrorContent;
  email?: FormErrorContent;
  password?: FormErrorContent;
  dob?: FormErrorContent;
  unknown?: FormErrorContent;
};
