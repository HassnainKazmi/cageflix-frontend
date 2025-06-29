import { useState, useEffect } from "react";
import {
  AppBar as MUIAppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Location, NavigateFunction } from "react-router-dom";
import MovieIcon from "@mui/icons-material/Movie";
import SearchBar from "./SearchBar";

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
    <MUIAppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar>
        <RouterLink
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          <MovieIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography
            variant="h6"
            noWrap
            fontWeight="bold"
            color="primary"
            sx={{ letterSpacing: 1 }}
          >
            Cageflix
          </Typography>
        </RouterLink>

        {navLinks.map(({ path, label }) => (
          <Button
            key={path}
            component={RouterLink}
            to={path}
            color="inherit"
            aria-label={`Go to ${label} page`}
          >
            {label}
          </Button>
        ))}

        <Box sx={{ flexGrow: 1 }} />
        <SearchBar input={input} setInput={setInput} />
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
