import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignInPage = ({ loginHandler, errorMessage }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    await loginHandler(e, navigate);
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
        height: "calc(100vh - 64px)", // Убираем высоту навбара (например, 64px)
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", // Градиентный фон
        overflow: "hidden", // Убирает скролл
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 3,
          backgroundColor: "#fff", // Белый фон для формы
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Тень
          borderRadius: 2, // Округленные углы
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: "#FF8E53" }}>
          Login
        </Typography>

        {errorMessage && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }} // Добавлен фон для полей ввода
        />

        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          sx={{ backgroundColor: "#f9f9f9", borderRadius: "4px" }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#ff4081",
            color: "#fff",
            padding: "10px 24px",
            "&:hover": {
              backgroundColor: "#f50057",
            },
          }}
          type="submit"
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignInPage;
