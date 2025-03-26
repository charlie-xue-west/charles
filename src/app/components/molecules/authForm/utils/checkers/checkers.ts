export const checkPassWord = (password: string, confirmPassword: string) => {
  return {
    "One lowercase character": /[a-z]/.test(password),
    "One uppercase character": /[A-Z]/.test(password),
    "One number": /\d/.test(password),
    "One special character": /[!@#$%^&*(),.?":{}|<>]/.test(password),
    "8 characters minimum": password.length >= 8,
    "Passwords must match": password === confirmPassword,
  };
};

export const checkEmail = (email: string) => {
  const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return strictEmailRegex.test(email);
};
