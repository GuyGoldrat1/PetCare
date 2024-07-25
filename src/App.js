import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Medical from "./scenes/medical";
import Vaccination from "./scenes/vaccinations";
import Find from "./scenes/find/index.jsx";
import Line from "./scenes/line/index.jsx";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import LandingPage from "./scenes/global/landing.jsx";
import vCalender from "./scenes/vetCalender";
import vDashboard from "./scenes/vetDashboard";
import vNewVisit from "./scenes/vetNewVisit";
import vPostDates from "./scenes/vetPostDates";
import Invoices from "./scenes/vetVisitHistory/index.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";



function App() {
  const [theme, colorMode] = useMode();
  const [isVet, setIsVet] = useState(true);
  const location = useLocation();

  // Determine if the current route is the sign-in or landing page
  const isSpecialPage = location.pathname === "/" || location.pathname === "/land";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isSpecialPage && <Sidebar isVet={isVet} />}
          <main className="content">
            {!isSpecialPage && <Topbar isVet={isVet} />}
            <Routes>
              <Route path="/" element={<LandingPage setIsVet={ setIsVet } />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/medical" element={<Medical />} />
              <Route path="/vaccination" element={<Vaccination />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/find" element={<Find />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/vet/calender" element={<vCalender />} />
              <Route path="/vet/dashboard" element={<vDashboard />} />
              <Route path="/vet/newvisit" element={<vNewVisit />} />
              <Route path="/vet/postdates" element={<vPostDates />} />
              <Route path="/vet/history" element={<Invoices />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
