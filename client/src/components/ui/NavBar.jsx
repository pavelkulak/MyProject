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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Main page
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ color: "text.primary", display: "flex", alignItems: "center" }}
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>
      </Breadcrumbs>

      <div>
        {user ? (
          <>
            Welcome, {user.username}!
            <Button
              onClick={logoutHandler}
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
            >
              logout
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              color="primary"
              href="/signup"
              sx={{ mr: 2 }}
            >
              registration
            </Button>
            <Button variant="contained" color="primary" href="/signin">
              login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
