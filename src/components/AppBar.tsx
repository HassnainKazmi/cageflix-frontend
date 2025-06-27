import {
  AppBar as MUIAppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Link as RouterLink } from "react-router-dom";

const AppBar = () => {
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
        <Box sx={{ flexGrow: 1 }} />
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ fontWeight: 600, mx: 1 }}
        >
          Home
        </Button>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
