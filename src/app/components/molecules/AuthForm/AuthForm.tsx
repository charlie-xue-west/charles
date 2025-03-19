"use client";

import {
  Box,
  createTheme,
  outlinedInputClasses,
  TextField,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material";

type AuthFormProps = {
  formType: "signup" | "login";
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
  return (
    <Box
      component="form"
      className="flex flex-col bg-white p-16 rounded-lg gap-4"
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          required
          color="secondary"
          id="user-name"
          label="User Name"
          helperText="required"
        />
        {formType === "signup" && (
          <TextField
            required
            color="secondary"
            id="user-email"
            label="Email"
            helperText="required"
          />
        )}
        <TextField
          required
          color="secondary"
          id="user-password"
          label="Password"
          helperText="required"
        />

        {formType === "signup" && (
          <TextField color="secondary" id="user-dob" label="Date of Birth" />
        )}
      </ThemeProvider>
    </Box>
  );
};
