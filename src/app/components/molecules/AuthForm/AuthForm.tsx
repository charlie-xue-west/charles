"use client";

import {
  Box,
  Button,
  createTheme,
  outlinedInputClasses,
  TextField,
  Theme,
  ThemeProvider,
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
  });
  const { error, isLoading, fetchData } = useFetchData();

  const handleOnsubmit = () => {
    const { userName, password, email, dateOfBirth } = formData;
    const userData = {
      userName,
      password,
      ...(email && { email }),
      ...(dateOfBirth && { dateOfBirth }),
    };

    fetchData(`http://localhost:3001/auth/${formType}`, "Post", userData);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <Box
      component="form"
      className="flex flex-col bg-gray-200 p-16 rounded-lg gap-4"
      onSubmit={handleOnsubmit}
    >
      <h2 className="">Welcome Traveler</h2>
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
          name="password"
          color="secondary"
          label="Password"
          helperText="required"
          onChange={handleOnChange}
        />

        {formType === "signup" && (
          <TextField
            name="dateOfBirth"
            color="secondary"
            label="Date of Birth"
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
