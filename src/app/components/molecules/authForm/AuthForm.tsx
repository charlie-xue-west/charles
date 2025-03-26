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
  PasswordCheckTypes,
  SubmissionErrors,
  ValidateErrors,
} from "./types";
import {
  categorizeErrors,
  joinErrors,
  checkPassWord,
  checkEmail,
} from "./utils";

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
    confirmPassword: "",
  });
  const [subError, setSubError] = useState<SubmissionErrors | null>(null);
  const [validError, setValidError] = useState<ValidateErrors | null>(null);
  const [passwordStatus, setPasswordStatus] = useState<PasswordCheckTypes>({
    "One lowercase character": false,
    "One uppercase character": false,
    "One number": false,
    "One special character": false,
    "8 characters minimum": false,
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
      `http://localhost:3001/auth/${formType}`,
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

      if (formType === "signup") {
        setPasswordStatus(
          checkPassWord(updatedForm.password, updatedForm.confirmPassword)
        );

        if (updatedForm.email) {
          setValidError({
            email: checkEmail(updatedForm.email)
              ? ""
              : "Email must be in correct the format: example@org.com",
          });
        }
      }

      return updatedForm;
    });

    setValidError(null);
  };

  const createList = (
    listItems: (keyof PasswordCheckTypes)[],
    Icon: React.ElementType,
    passwordChecks: PasswordCheckTypes
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
    "One lowercase character",
    "One uppercase character",
    "One number",
    "One special character",
    "8 characters minimum",
    "Passwords must match",
  ] as (keyof PasswordCheckTypes)[];

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
            error={!!subError?.userName}
            helperText={subError?.userName?.messages}
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
                error={!!validError?.email || !!subError?.email}
                helperText={validError?.email || subError?.email?.messages}
                onChange={handleOnChange}
              />

              <TextField
                type="date"
                className="w-full"
                name="dateOfBirth"
                color="secondary"
                helperText={subError?.dob?.messages}
                error={!!subError?.dob}
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
            error={!!validError?.password || !!subError?.password}
            helperText={joinErrors(subError?.password?.messages || [])}
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
                helperText={validError?.password}
                error={!!validError?.password || !!subError?.password}
                onChange={handleOnChange}
              />

              <List sx={{ color: "black" }} className="w-full" dense={true}>
                {createList(passwordConditions, CheckCircle, passwordStatus)}
              </List>
            </>
          )}
        </Box>

        {subError?.unknown?.messages && (
          <Alert tabIndex={-1} severity="error" icon={false}>
            {joinErrors(subError.unknown.messages)}
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

        <Button type="submit" variant="contained" color="secondary">
          {formType === "signup" ? "Sign Up" : "Log In"}
        </Button>
      </ThemeProvider>
    </Box>
  );
};
