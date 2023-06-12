import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from './views/Register';
import { Home } from "./views/Home";
import { Login } from './views/Login';
import { NavbarLayout } from './components/NavbarLayout';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';;

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 700,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<NavbarLayout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
