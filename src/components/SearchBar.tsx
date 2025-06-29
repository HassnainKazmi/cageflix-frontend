import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  input: string;
  setInput: (value: string) => void;
}

const SearchBar = ({ input, setInput }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        ml: 2,
        display: "flex",
        alignItems: "center",
        width: { xs: 140, sm: 200, md: 320 },
        bgcolor: "#232323",
        borderRadius: 2,
        boxShadow: "none",
        height: 36,
      }}
      elevation={0}
    >
      <InputBase
        placeholder="Search titles, genres, actors…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ "aria-label": "search titles, genres, actors" }}
        sx={{ color: "white", flex: 1, pl: 1 }}
      />
      {input && (
        <IconButton
          onClick={() => setInput("")}
          aria-label="Clear search"
          title="Clear search"
          edge="end"
          size="small"
          sx={{ color: "#aaa" }}
          tabIndex={0}
          type="button"
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
      <IconButton
        type="submit"
        sx={{ p: "6px", color: "#e50914" }}
        aria-label="Search"
        tabIndex={0}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
