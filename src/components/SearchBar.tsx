import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      const params = new URLSearchParams(location.search);
      const isSameQuery =
        location.pathname === "/search" && params.get("text") === trimmed;
      if (!isSameQuery) {
        navigate(`/search?text=${encodeURIComponent(trimmed)}`);
      }
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        ml: 2,
        display: "flex",
        alignItems: "center",
        width: { xs: 120, sm: 220, md: 320 },
        bgcolor: "#232323",
        borderRadius: 2,
        boxShadow: "none",
        height: 36,
      }}
      elevation={0}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: "white" }}
        placeholder="Titles, people, genres"
        inputProps={{ "aria-label": "search Cageflix" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{ p: "6px", color: "#e50914" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
