import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const setSearch = (value: string) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/titles/:tconst" element={<TitleDetail />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
