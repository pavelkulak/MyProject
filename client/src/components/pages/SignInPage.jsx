// LoginHandler.js
const loginHandler = async (e, setUser, setAccessToken, setErrorMessage) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  try {
      const res = await axiosInstance.post("/auth/signin", data);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      setErrorMessage(""); // Очищаем сообщение об ошибке, если вход успешен
      navigate("/"); // Перенаправляем на главную страницу
  } catch (error) {
      if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message); // Установить сообщение об ошибке
      } else {
          setErrorMessage("Произошла ошибка при входе."); // Общая ошибка
      }
  }
};

// SignInPage.js
import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignInPage = ({ loginHandler, errorMessage }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      await loginHandler(e, navigate); // Передаем navigate
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
                  Login
              </Typography>

              {errorMessage && ( // Отображаем сообщение об ошибке, если оно есть
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

              <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  type="submit"
              >
                  Sign In
              </Button>
          </Box>
      </Box>
  );
};

export default SignInPage;
