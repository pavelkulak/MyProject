import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SignUpPage = ({ signupHandler, errorMessage }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    await signupHandler(e, navigate); // Передаем navigate
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>

        {errorMessage && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <TextField
          name="username"
          label="Name"
          type="input"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="email"
          label="Email"
          type="input"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpPage;
