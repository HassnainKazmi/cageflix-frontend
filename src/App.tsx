import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AppBar from "./components/AppBar";
import Home from "./pages/Home";
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
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar search={search} location={location} navigate={navigate} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/titles/:tconst" element={<TitleDetail />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
