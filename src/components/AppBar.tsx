import { useState, useEffect } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
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
  { path: "/shows", label: "Shows" },
];

const AppBar = ({ search, location, navigate }: AppBarProps) => {
  const [input, setInput] = useState<string>(search);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => setInput(search), [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (location.pathname === "/") {
        const searchParams = new URLSearchParams(location.search);
        input
          ? searchParams.set("search", input)
          : searchParams.delete("search");
        navigate(
          { pathname: location.pathname, search: searchParams.toString() },
          { replace: true }
        );
      } else if (input) {
        navigate(`/?search=${encodeURIComponent(input)}`);
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
        px: { xs: 2, md: 4 },
        boxShadow: "none",
      }}
    >
      {isSmall ? (
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "center",
            py: 0,
            width: "100%",
            gap: 1,
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={logo}
              alt="Cageflix Logo"
              style={{
                height: "40px",
                width: "120px",
                objectFit: "contain",
                marginTop: 2,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {navLinks.map(({ path, label }) => (
              <Button
                key={path}
                component={RouterLink}
                to={path}
                sx={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "#fff",
                  textTransform: "none",
                  px: 0,
                  minWidth: 0,
                  "&:hover": { color: "#e50914" },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box sx={{ width: "100%", maxWidth: "90%", mb: 2 }}>
            <SearchBar input={input} setInput={setInput} />
          </Box>
        </Toolbar>
      ) : (
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 72,
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: "flex", alignItems: "center", mr: 4 }}
          >
            <img
              src={logo}
              alt="Cageflix Logo"
              style={{ height: "60px", width: "120px", objectFit: "contain" }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3, mr: 3 }}>
            {navLinks.map(({ path, label }) => (
              <Button
                key={path}
                component={RouterLink}
                to={path}
                sx={{
                  fontWeight: 500,
                  fontSize: "1.08rem",
                  color: "#fff",
                  textTransform: "none",
                  px: 0,
                  minWidth: 0,
                  "&:hover": {
                    color: "#e50914",
                    background: "transparent",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box sx={{ minWidth: 260 }}>
            <SearchBar input={input} setInput={setInput} />
          </Box>
        </Toolbar>
      )}
    </MUIAppBar>
  );
};

export default AppBar;
