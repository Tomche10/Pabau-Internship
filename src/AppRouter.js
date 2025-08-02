import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<BrandsPage />} />
      <Route path="/models/:brandId" element={<ModelsPage />} />
      <Route path="/guitar/:guitarId" element={<GuitarDetailsPage />} />
      <Route path="/guitar/:guitarId" element={<GuitarDetailsPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
