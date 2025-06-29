import { useState, useEffect } from "react";
import { AppBar as MUIAppBar, Toolbar, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Location, NavigateFunction } from "react-router-dom";
import SearchBar from "./SearchBar";
import logo from "../assets/cageflix-logo.png";

interface AppBarProps {
  search: string;
  location: Location;
  navigate: NavigateFunction;
}

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/movies", label: "Movies" },
  { path: "/shows", label: "TV Shows" },
];

const AppBar = ({ search, location, navigate }: AppBarProps) => {
  const [input, setInput] = useState<string>(search);

  useEffect(() => {
    setInput(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = input.trim();
      if (location.pathname === "/") {
        const searchParams = new URLSearchParams(location.search);

        if (trimmed) {
          searchParams.set("search", trimmed);
        } else {
          searchParams.delete("search");
        }
        navigate(
          {
            pathname: location.pathname,
            search: searchParams.toString(),
          },
          { replace: true }
        );
      } else {
        if (trimmed) {
          navigate(`/?search=${encodeURIComponent(trimmed)}`);
        }
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [input, location.pathname, location.search, navigate]);

  return (
    <MUIAppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#141414",
        borderBottom: "none",
        minHeight: 64,
        px: { xs: 1, md: 4 },
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
          display: "flex",
          alignItems: "center",
          px: 0,
        }}
      >
        <RouterLink
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            marginRight: 36,
          }}
        >
          <img
            src={logo}
            alt="Cageflix Logo"
            style={{
              height: "80px",
              width: "120px",
              objectFit: "fill",
              display: "block",
            }}
          />
        </RouterLink>
        <Box sx={{ display: "flex", gap: 3, mr: 3 }}>
          {navLinks.map(({ path, label }) => (
            <Button
              key={path}
              component={RouterLink}
              to={path}
              color="inherit"
              sx={{
                fontWeight: 500,
                fontSize: "1.08rem",
                color: "#fff",
                px: 0,
                py: 0.5,
                textTransform: "none",
                minWidth: 0,
                "&:hover": {
                  color: "#e50914",
                  background: "transparent",
                },
              }}
              aria-label={`Go to ${label} page`}
            >
              {label}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            minWidth: { xs: 140, sm: 220, md: 260 },
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <SearchBar input={input} setInput={setInput} />
        </Box>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
