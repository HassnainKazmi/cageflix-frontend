import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TitleDetail from "./pages/TitleDetail";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e50914" },
    background: {
      default: "#181818",
      paper: "#222",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/titles/:tconst" element={<TitleDetail />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
