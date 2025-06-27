import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { fetchTitles } from "../api/titles";
import type { Title } from "../types/title";
import TitleGrid from "../components/TitleGrid";

const Home = () => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTitles = async () => {
      setLoading(true);
      try {
        const titles: Title[] = await fetchTitles(0, 24);
        setTitles(titles);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    loadTitles();
  }, []);

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
          fontSize: { xs: "1.6rem", sm: "2.2rem", md: "2.6rem" }, // Responsive font size
        }}
      >
        Nicolas Cage Movies & Shows
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress size={44} color="primary" />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TitleGrid titles={titles} emptyMessage="No Cageflix titles found." />
      )}
    </Box>
  );
};

export default Home;
