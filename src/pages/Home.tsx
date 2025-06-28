import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import TitleGrid from "../components/TitleGrid";
import useTitles from "../hooks/useTitles";
import useDebouncedSearch from "../hooks/useDebouncedSearch";

interface HomeProps {
  search: string;
}

const Home = ({ search }: HomeProps) => {
  const { titles, loading, error } = useTitles({ enabled: !search });
  const {
    results: searchResults,
    loading: searching,
    error: searchError,
  } = useDebouncedSearch(search);

  const showTitles = search ? searchResults : titles;
  const showLoading = search ? searching : loading;
  const showError = search ? searchError : error;

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
        Nicolas Cage Movies & Shows
      </Typography>
      {showLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress size={44} color="primary" />
        </Box>
      ) : showError ? (
        <Alert severity="error">{showError}</Alert>
      ) : (
        <TitleGrid
          titles={showTitles}
          emptyMessage={
            search
              ? "No results found for your search."
              : "No Cageflix titles found."
          }
        />
      )}
    </Box>
  );
};

export default Home;
