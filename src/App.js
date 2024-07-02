import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import MedicalBag from "./Components/MedicalBag";
import Appointments from "./Components/Appointments";
import Chat from "./Components/Chat";
import About from "./Components/About";
import Contact from "./Components/Contact";
import { NavigationProvider } from "./Components/Navigation";

function App() {
  return (
    <Router>
      <NavigationProvider>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/medical-bag" component={MedicalBag} />
            <Route path="/appointments" component={Appointments} />
            <Route path="/chat" component={Chat} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </NavigationProvider>
    </Router>
  );
}

export default App;
