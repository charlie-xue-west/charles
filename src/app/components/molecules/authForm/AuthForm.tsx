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
import { SignUpButton } from "../../atoms";
import Link from "next/link";

type AuthFormProps = {
  formType: "signup" | "login";
  className?: string;
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

export const AuthForm = ({ formType, className }: AuthFormProps) => {
  const outerTheme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
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
      setError(response.message);
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
          setError("Passwords must match");
        }
      }

      return updatedForm;
    });

    setError("");
  };

  return (
    <Box
      component="form"
      className={`${className} flex flex-col justify-between items-center bg-gray-200 p-16 rounded-lg`}
      onSubmit={handleOnsubmit}
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Box className={`flex flex-col justify-center items-center gap-4`}>
          <Typography variant="h2" color="secondary" fontSize={"2rem"}>
            Welcome Traveler
          </Typography>
          <TextField
            required
            name="userName"
            color="secondary"
            label="User Name"
            error={!!error}
            onChange={handleOnChange}
          />
          {formType === "signup" && (
            <TextField
              required
              name="email"
              color="secondary"
              label="Email"
              onChange={handleOnChange}
            />
          )}
          <TextField
            required
            type="password"
            name="password"
            color="secondary"
            label="Password"
            error={!!error}
            onChange={handleOnChange}
          />

          {formType === "signup" && (
            <TextField
              required
              name="confirmPassword"
              type="password"
              color="secondary"
              label="Confirm Password"
              helperText="Passwords must match"
              error={!!error}
              onChange={handleOnChange}
            />
          )}
          {formType === "signup" && (
            <TextField
              name="dateOfBirth"
              color="secondary"
              label="Date of Birth"
              helperText="MM/DD/YYYY"
              onChange={handleOnChange}
            />
          )}
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {formType === "login" && (
          <Box className="flex gap-2">
            <Typography variant="body1" color="secondary">
              Newly on the road?{" "}
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
