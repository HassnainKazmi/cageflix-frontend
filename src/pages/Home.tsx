import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import TitleGrid from "../components/TitleGrid";
import usePaginatedTitles from "../hooks/usePaginatedTitles";
import useDebouncedSearch from "../hooks/useDebouncedSearch";

interface HomeProps {
  search: string;
}

const PAGE_SIZE = 24;

const Home = ({ search }: HomeProps) => {
  const { titles, loading, error, hasMore, loadMore, initialLoading } =
    usePaginatedTitles({
      pageSize: PAGE_SIZE,
      enabled: !search,
    });

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
        pt: { xs: 7, sm: 9 },
      }}
    >
      <Box
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
          mx: { xs: 1, sm: 1.5, md: 2 },
        }}
      >
        <Typography
          variant="h4"
          color="white"
          fontWeight={700}
          mb={3}
          letterSpacing={1}
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontSize: { xs: "1.6rem", sm: "2.2rem", md: "2.6rem" },
          }}
        >
          Nicolas Cage Movies & Shows
        </Typography>
        {showError ? (
          <Alert severity="error">{showError}</Alert>
        ) : (
          <>
            {search ? (
              showLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                  <CircularProgress size={44} color="primary" />
                </Box>
              ) : (
                <TitleGrid
                  titles={showTitles}
                  emptyMessage="No results found for your search."
                />
              )
            ) : initialLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress size={44} color="primary" />
              </Box>
            ) : (
              <InfiniteScroll
                dataLength={titles.length}
                next={loadMore}
                hasMore={hasMore}
                loader={
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 4 }}
                  >
                    <CircularProgress size={32} color="primary" />
                  </Box>
                }
                style={{ overflow: "visible" }}
                scrollThreshold={0.95}
                endMessage={
                  <Box sx={{ py: 3, textAlign: "center", color: "#888" }}>
                    <Typography variant="body2">
                      No more Cageflix titles!
                    </Typography>
                  </Box>
                }
              >
                <TitleGrid
                  titles={titles}
                  emptyMessage="No Cageflix titles found."
                />
              </InfiniteScroll>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
