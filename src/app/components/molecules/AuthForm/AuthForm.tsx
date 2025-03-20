"use client";

import {
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
import { useFetchData } from "../../../lib/customHooks";
import { useState } from "react";

type AuthFormProps = {
  formType: "signup" | "login";
};

type FormData = {
  userName: string;
  password: string;
  confirmPassword: string;
  email?: string;
  dateOfBirth?: string;
};

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

export const AuthForm = ({ formType }: AuthFormProps) => {
  const outerTheme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const { error, isLoading, fetchData } = useFetchData();

  const handleOnsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // need this since submit defaults to GET
    event.preventDefault();

    const { userName, password, email, dateOfBirth } = formData;

    const userData = {
      userName,
      password,
      ...(email && { email }),
      ...(dateOfBirth && { dateOfBirth }),
    };

    fetchData(
      `http://localhost:3001/auth/${formType}`,
      "POST",
      undefined,
      userData
    );
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      if (updatedForm.password !== updatedForm.confirmPassword) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }

      return updatedForm;
    });
  };

  return (
    <Box
      component="form"
      className="flex flex-col justify-center items-center bg-gray-200 p-16 rounded-lg gap-4"
      onSubmit={handleOnsubmit}
    >
      <Typography variant="h2" color="secondary" fontSize={"2rem"}>
        Welcome Traveler
      </Typography>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          required
          name="userName"
          color="secondary"
          label="User Name"
          helperText="required"
          onChange={handleOnChange}
        />
        {formType === "signup" && (
          <TextField
            required
            name="email"
            color="secondary"
            label="Email"
            helperText="required"
            onChange={handleOnChange}
          />
        )}
        <TextField
          required
          type="password"
          name="password"
          color="secondary"
          label="Password"
          error={passwordError}
          onChange={handleOnChange}
        />

        <TextField
          required
          name="confirmPassword"
          type="password"
          color="secondary"
          label="Confirm Password"
          helperText="Passwords must match"
          error={passwordError}
          onChange={handleOnChange}
        />

        {formType === "signup" && (
          <TextField
            name="dateOfBirth"
            color="secondary"
            label="Date of Birth"
            helperText="MM/DD/YYYY"
            onChange={handleOnChange}
          />
        )}
        <Button type="submit" variant="contained" color="secondary">
          {formType === "signup" ? "Sign Up" : "Log In"}
        </Button>
      </ThemeProvider>
    </Box>
  );
};
