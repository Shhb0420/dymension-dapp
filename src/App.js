import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      {routes.map((route, index) => (
        <Route
        key={index}
        path={route.path}
        element={<route.component />}
        />
      ))}
    </Routes>
    </BrowserRouter>
  )
}

export default App