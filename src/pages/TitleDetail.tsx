import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import { fetchTitleById } from "../api/titles";
import type { Title } from "../types/title";
import GenreChips from "../components/GenreChips";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit, sapien eu volutpat dictum, metus arcu egestas eros, a feugiat mauris neque ut sapien.";

const TitleDetail = () => {
  const { tconst } = useParams<{ tconst: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState<Title | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tconst) return;
    const loadTitle = async () => {
      setLoading(true);
      try {
        const title: Title = await fetchTitleById(tconst);
        setTitle(title);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    loadTitle();
  }, [tconst]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={44} color="primary" />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );

  if (!title)
    return (
      <Alert severity="info" sx={{ mt: 3 }}>
        No title found.
      </Alert>
    );

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 5 },
        py: 4,
        minHeight: "80vh",
        bgcolor: "#181818",
        color: "white",
        maxWidth: 720,
        mx: "auto",
        borderRadius: 3,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.22)",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{
          mb: 2,
          color: "#e50914",
          fontWeight: 700,
          textTransform: "none",
          ":hover": { bgcolor: "rgba(229,9,20,0.09)" },
        }}
      >
        Back
      </Button>

      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#232323",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
          }}
        >
          <MovieIcon sx={{ fontSize: 56, color: "#e50914" }} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700} mb={0.5}>
            {title.primaryTitle}
          </Typography>
          <Typography variant="subtitle1" color="#aaa" mb={0.5}>
            {title.originalTitle}
            {title.startYear && ` (${title.startYear})`} &bull;{" "}
            {title.titleType}
          </Typography>
          <GenreChips genres={title.genres} />
        </Box>
      </Stack>

      <Typography variant="body2" color="#eee" mb={2}>
        <strong>Description:</strong> <br />
        {title.description ? title.description : LOREM}
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <Typography variant="body2" color="#ccc">
          <strong>Adult:</strong> {title.isAdult ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2" color="#ccc">
          <strong>Runtime:</strong>{" "}
          {title.runtimeMinutes ? `${title.runtimeMinutes} min` : "N/A"}
        </Typography>
        <Typography variant="body2" color="#ccc">
          <strong>Launched:</strong> {title.startYear ? title.startYear : "N/A"}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" mb={1}>
        <StarIcon sx={{ fontSize: 22, color: "gold" }} />
        <Typography variant="h6" color="white" fontWeight={700}>
          {title.averageRating !== null ? title.averageRating : "N/A"}
        </Typography>
        <Typography variant="body2" color="#ccc">
          {title.numVotes !== null ? `(${title.numVotes} votes)` : ""}
        </Typography>
      </Stack>
      {title.cast && title.cast.length > 0 && (
        <Box mb={2}>
          <Typography variant="body2" color="#8dc6ff">
            <strong>Co-stars:</strong> {title.cast.slice(0, 8).join(", ")}
            {title.cast.length > 8 ? "…" : ""}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TitleDetail;
