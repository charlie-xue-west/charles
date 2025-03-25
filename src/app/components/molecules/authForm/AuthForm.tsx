"use client";

import {
  Alert,
  Box,
  Button,
  createTheme,
  outlinedInputClasses,
  TextField,
  Theme,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import { fetchData } from "@lib";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthFormProps, FormData, FormErrors } from "./types";
import { categorizeErrors, joinErrors } from "./utils";

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
  const outerTheme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [subError, setSubError] = useState<FormErrors | null>(null);
  const [validError, setValidError] = useState(null);
  const router = useRouter();

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
        if (updatedForm.password !== updatedForm.confirmPassword) {
          setValidError({
            password: {
              messages: ["Passwords must match"],
            },
          });
        }
      }

      return updatedForm;
    });

    setValidError(null);
  };

  return (
    <Box
      component="form"
      className={`${className} flex flex-col justify-between items-center bg-gray-200 p-16 rounded-lg gap-4`}
      onSubmit={handleOnsubmit}
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Box className={`flex flex-col justify-center items-center gap-4`}>
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
                name="email"
                color="secondary"
                label="Email"
                error={!!subError?.email}
                helperText={subError?.email?.messages}
                onChange={handleOnChange}
              />

              <TextField
                className="w-full"
                name="dateOfBirth"
                color="secondary"
                label="Date of Birth (MM/DD/YYYY)"
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
            error={!!subError?.password}
            helperText={joinErrors(subError?.password?.messages || [])}
            onChange={handleOnChange}
          />

          {formType === "signup" && (
            <TextField
              className="w-full"
              required
              name="confirmPassword"
              type="password"
              color="secondary"
              label="Confirm Password"
              helperText="Passwords must match"
              error={!!subError?.password}
              onChange={handleOnChange}
            />
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
