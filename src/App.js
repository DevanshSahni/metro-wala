import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlanJourney from "./components/PlanJourney";
import ShowRoute from "./components/ShowRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PlanJourney />} />
        <Route path="/plan-journey" element={<PlanJourney />} />
        <Route path="/route/:origin/:destination" element={<ShowRoute />} />
      </Routes>
    </>
  );
};

export default App;
