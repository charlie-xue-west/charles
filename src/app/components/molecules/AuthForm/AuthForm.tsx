import { Box, TextField } from "@mui/material";

export const AuthForm = () => {
  return (
    <Box component="form">
      <TextField
        required
        id="user-name"
        label="User Name"
        helperText="required"
      />
      <TextField required id="user-email" label="Email" helperText="required" />
      <TextField
        required
        id="user-password"
        label="Password"
        helperText="required"
      />

      <TextField />
    </Box>
  );
};
