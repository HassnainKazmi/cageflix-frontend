import { Grid, Box, Typography } from "@mui/material";
import TitleCard from "./TitleCard";
import type { Title } from "../types/title";
import type { SearchResults } from "../types/search";

interface TitleGridProps {
  titles: Title[] | SearchResults[];
  emptyMessage?: string;
}

const TitleGrid = ({ titles, emptyMessage }: TitleGridProps) => {
  if (!titles || titles.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: "center", color: "#888" }}>
        <Typography variant="h6" fontWeight={500}>
          {emptyMessage || "No titles found."}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 3 }}
      sx={{ mt: 2 }}
      justifyContent="center"
    >
      {titles.map((title) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          key={title.tconst}
          sx={{ display: "flex" }}
        >
          <TitleCard title={title} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TitleGrid;
