"use client";

import {
  Alert,
  Box,
  Button,
  createTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  outlinedInputClasses,
  TextField,
  Theme,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchData } from "@lib";
import {
  AuthFormProps,
  FormData,
  PasswordStatusTypes,
  SubmissionErrors,
  ValidateErrors,
} from "./types";
import { categorizeErrors, joinErrors, validateForm, hasValue } from "./utils";

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#9c27b0",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#9c27b0",
            },
          },
        },
      },
    },
  });

export const AuthForm = ({ formType, className }: AuthFormProps) => {
  const router = useRouter();
  const outerTheme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
  });
  const [subError, setSubError] = useState<SubmissionErrors>({
    userName: [],
    email: [],
    password: [],
    dateOfBirth: [],
    unknown: [],
  });
  const [validError, setValidError] = useState<ValidateErrors>({
    userName: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });
  const [passwordStatus, setPasswordStatus] = useState<PasswordStatusTypes>({
    "One lowercase character": false,
    "One uppercase character": false,
    "One number": false,
    "One special character": false,
    "8 characters minimum": false,
    "Passwords must match": false,
  });

  const handleOnsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // need this since submit defaults to GET
    event.preventDefault();

    const { userName, password, email, dateOfBirth } = formData;

    const userData = {
      userName,
      password,
      ...(email && { email }),
      ...(dateOfBirth && { dateOfBirth }),
    };

    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${formType}`,
      "POST",
      undefined,
      userData
    );

    if (response.error) {
      const categorizedErrors = categorizeErrors(response.message);

      setSubError(categorizedErrors);
    }

    if (!response.error) {
      router.push("/hub");
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      if (updatedForm.dateOfBirth) {
        const date = new Date(updatedForm.dateOfBirth).toISOString();

        updatedForm.dateOfBirth = date;
      }

      const {
        updatedValidationErrors,
        updatedPasswordStatus,
        updatedSubErrors,
      } = validateForm(
        formType,
        name,
        updatedForm,
        validError,
        passwordStatus,
        subError
      );

      setPasswordStatus(updatedPasswordStatus);
      setValidError(updatedValidationErrors);
      setSubError(updatedSubErrors);

      return updatedForm;
    });
  };

  const createList = (
    listItems: (keyof PasswordStatusTypes)[],
    Icon: React.ElementType,
    passwordChecks: PasswordStatusTypes
  ) => {
    return listItems.map((item) => {
      const isChecked = passwordChecks[item];
      return (
        <ListItem key={item} sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <ListItemIcon>
            <Icon color={isChecked ? "success" : "disabled"} />
          </ListItemIcon>
          <ListItemText sx={{ color: isChecked ? "#2e7d32" : "black" }}>
            {item}
          </ListItemText>
        </ListItem>
      );
    });
  };

  const passwordConditions = [
    "One lowercase character" as const,
    "One uppercase character" as const,
    "One number" as const,
    "One special character" as const,
    "8 characters minimum" as const,
    "Passwords must match" as const,
  ];

  return (
    <Box
      component="form"
      className={`${className} flex flex-col justify-between items-center bg-gray-200 p-16 rounded-lg gap-4`}
      onSubmit={handleOnsubmit}
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Box
          className={`flex w-full flex-col justify-center items-center gap-4`}
        >
          <Typography variant="h2" color="secondary" fontSize={"2rem"}>
            Welcome Traveler
          </Typography>
          <TextField
            className="w-full"
            required
            name="userName"
            color="secondary"
            label="User Name"
            error={!!subError.userName.length}
            helperText={joinErrors(subError.userName)}
            onChange={handleOnChange}
          />
          {formType === "signup" && (
            <>
              <TextField
                className="w-full"
                required
                type="email"
                name="email"
                color="secondary"
                label="Email"
                error={!!validError.email || !!subError.email.length}
                helperText={validError.email || joinErrors(subError.email)}
                onChange={handleOnChange}
              />

              <TextField
                type="date"
                className="w-full"
                name="dateOfBirth"
                color="secondary"
                helperText={
                  validError.dateOfBirth || joinErrors(subError.dateOfBirth)
                }
                error={
                  !!validError.dateOfBirth || !!subError.dateOfBirth.length
                }
                onChange={handleOnChange}
              />
            </>
          )}

          <TextField
            className="w-full"
            required
            type="password"
            name="password"
            color="secondary"
            label="Password"
            error={!!validError.password || !!subError.password.length}
            helperText={joinErrors(subError.password)}
            onChange={handleOnChange}
          />

          {formType === "signup" && (
            <>
              <TextField
                className="w-full"
                required
                name="confirmPassword"
                type="password"
                color="secondary"
                label="Confirm Password"
                error={!!validError.password || !!subError.password.length}
                onChange={handleOnChange}
              />

              <List sx={{ color: "black" }} className="w-full" dense={true}>
                {createList(passwordConditions, CheckCircle, passwordStatus)}
              </List>
            </>
          )}
        </Box>

        {subError.unknown.length && (
          <Alert tabIndex={-1} severity="error" icon={false}>
            {joinErrors(subError.unknown)}
          </Alert>
        )}

        {formType === "login" && (
          <Box className="flex gap-2">
            <Typography variant="body1" color="secondary">
              Newly on the road?
            </Typography>
            <Typography variant="body1" color="primary">
              <Link color="primary" href="/signup">
                Sign Up
              </Link>
            </Typography>
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={hasValue(validError)}
        >
          {formType === "signup" ? "Sign Up" : "Log In"}
        </Button>
      </ThemeProvider>
    </Box>
  );
};
