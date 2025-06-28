import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import TitleGrid from "../components/TitleGrid";
import useTitles from "../hooks/useTitles";
import type { TitleType } from "../types/title";

const MOVIE_TYPE: TitleType = "movie";

const Movies = () => {
  const { titles, loading, error } = useTitles({ titleType: MOVIE_TYPE });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#181818",
        px: { xs: 0.5, sm: 2, md: 3 },
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        color="white"
        fontWeight={700}
        mb={3}
        letterSpacing={1}
        sx={{
          ml: { xs: 0, md: 1 },
          fontSize: { xs: "1.6rem", sm: "2.2rem", md: "2.6rem" },
        }}
      >
        Nicolas Cage Movies
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress size={44} color="primary" />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TitleGrid titles={titles} emptyMessage="No movies found." />
      )}
    </Box>
  );
};

export default Movies;
