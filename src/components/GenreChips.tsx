import { Box, Chip } from "@mui/material";

interface GenreChipsProps {
  genres: string[];
}

const GenreChips = ({ genres }: GenreChipsProps) => {
  if (!genres || genres.length === 0) return null;
  return (
    <Box sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
      {genres.map((genre) => (
        <Chip
          key={genre}
          label={genre}
          size="small"
          sx={{
            bgcolor: "rgba(229,9,20,0.07)",
            color: "primary.main",
            fontWeight: 600,
            fontSize: 12,
          }}
        />
      ))}
    </Box>
  );
};

export default GenreChips;
