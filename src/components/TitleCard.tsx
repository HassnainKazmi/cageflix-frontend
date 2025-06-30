import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import type { Title } from "../types/title";
import GenreChips from "./GenreChips";
import { Link as RouterLink } from "react-router-dom";
import type { SearchResults } from "../types/search";

interface TitleCardProps {
  title: Title | SearchResults;
}

const TitleCard = ({ title }: TitleCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={`/titles/${title.tconst}`}
      variant="outlined"
      sx={{
        width: "100%",
        height: "100%",
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
        textDecoration: "none",
      }}
      aria-label={`Go to details of ${title.primaryTitle}`}
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
          flexGrow: 1,
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
            {title.primaryTitle ? title.primaryTitle : "N/A"}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          sx={{ color: "#aaa", fontWeight: 500, fontSize: 13, mb: 1 }}
        >
          {title.startYear ? title.startYear : "N/A"}
          {title.titleType ? ` • ${title.titleType}` : ""}
          {title.runtimeMinutes ? ` • ${title.runtimeMinutes} min` : ""}
        </Typography>
        {title.cast && title.cast.length > 0 ? (
          <Typography
            variant="body2"
            sx={{ color: "#fff", fontSize: 13, mb: 1 }}
            title={title.cast.join(", ")}
          >
            <strong style={{ color: "#777" }}>Co-stars:</strong>{" "}
            {title.cast.slice(0, 3).join(", ")}
            {title.cast.length > 3 ? "…" : ""}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "#fff", fontSize: 13, mb: 1 }}
          >
            <strong style={{ color: "#777" }}>Co-stars:</strong> N/A
          </Typography>
        )}
        <Box sx={{ mb: 1 }}>
          <GenreChips
            genres={
              title.genres && title.genres.length > 0 ? title.genres : ["N/A"]
            }
          />
        </Box>
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <StarIcon sx={{ fontSize: 16, color: "gold" }} />
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "white" }}
          >
            {title.averageRating !== null && title.averageRating !== undefined
              ? title.averageRating
              : "N/A"}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#aaa", fontWeight: 400, ml: 0.5 }}
          >
            (
            {title.numVotes !== null && title.numVotes !== undefined
              ? title.numVotes
              : "N/A"}
            )
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TitleCard;
