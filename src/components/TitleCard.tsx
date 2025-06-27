import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import type { Title } from "../types/title";
import GenreChips from "./GenreChips";

const TitleCard = ({ title }: { title: Title }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: 300,
        minHeight: 270,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#181818",
        borderRadius: 2,
        border: "1px solid #262626",
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.15)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.045)",
          borderColor: "#e50914",
          boxShadow: "0 6px 24px 2px rgba(229,9,20,0.17)",
        },
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 120,
          bgcolor: "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
        }}
      >
        <MovieIcon sx={{ fontSize: 48 }} />
      </Box>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          p: 2,
          pb: "8px!important",
        }}
      >
        <Tooltip title={title.primaryTitle} arrow>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ color: "white", fontWeight: 700, fontSize: 16 }}
          >
            {title.primaryTitle}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          sx={{ color: "#aaa", fontWeight: 500, fontSize: 13, mb: 1 }}
        >
          {title.startYear || "Year unknown"} • {title.titleType}
        </Typography>
        <Box sx={{ mb: 1 }}>
          <GenreChips genres={title.genres} />
        </Box>
        {title.averageRating !== null && (
          <Box
            sx={{ mt: "auto", display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <StarIcon sx={{ fontSize: 16, color: "gold" }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "white" }}
            >
              {title.averageRating}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#aaa", fontWeight: 400, ml: 0.5 }}
            >
              ({title.numVotes ?? 0})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TitleCard;
