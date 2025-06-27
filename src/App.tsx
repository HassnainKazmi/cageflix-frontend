import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AppBar from "./components/AppBar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import TitleDetail from "./pages/TitleDetail";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e50914",
    },
    background: {
      default: "'#141414'",
      paper: "#181818",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
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
      </Routes>
    </ThemeProvider>
  );
};

export default App;
