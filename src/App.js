import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Medical from "./scenes/medical";
import Invoices from "./scenes/invoices";
import Vaccination from "./scenes/vaccinations";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line/index.jsx";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SignIn from "./scenes/signin";
import LandingPage from "./scenes/landingpage";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Determine if the current route is the sign-in or landing page
  const isSpecialPage = location.pathname === "/" || location.pathname === "/land";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isSpecialPage && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isSpecialPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/land" element={<LandingPage />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/medical" element={<Medical />} />
              <Route path="/vaccination" element={<Vaccination />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
