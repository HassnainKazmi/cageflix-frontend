import {
  AppBar as MUIAppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MovieIcon from "@mui/icons-material/Movie";
import SearchBar from "./SearchBar";

interface AppBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/movies", label: "Movies" },
  { path: "/shows", label: "Shows" },
];

const AppBar = ({ search, setSearch }: AppBarProps) => {
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
        <SearchBar search={search} setSearch={setSearch} />
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
