import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

export default function NavBar({ user, logoutHandler }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        paddingRight: "32px",
        paddingLeft: "32px",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: "#fff" }}>
        <Link
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
          }}
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Main page
        </Link>
        <Link
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
          }}
          href="/material-ui/getting-started/installation/"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ color: "#fff", display: "flex", alignItems: "center" }}
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>
      </Breadcrumbs>

      {/* Контейнер для кнопок */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "fit-content",
          gap: "16px",
          paddingRight: "62px",
        }}
      >
        {user ? (
          <>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "1.2rem", // Немного увеличиваем размер шрифта
                fontWeight: "bold", // Делаем текст жирным
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)", // Добавляем легкую тень для контраста
                
              }}
            >
              Welcome, <span>{user.username}</span>!
            </Typography>
            <Button
              onClick={logoutHandler}
              variant="outlined"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                minWidth: "120px",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#ff4081",
                },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              href="/signup"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                minWidth: "120px",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#ff4081",
                },
              }}
            >
              Registration
            </Button>
            <Button
              variant="contained"
              href="/signin"
              sx={{
                backgroundColor: "#ff4081",
                color: "#fff",
                minWidth: "120px",
                "&:hover": {
                  backgroundColor: "#f50057",
                },
              }}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
