import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./views/album.jsx";
import Sheets from "./views/sheets.jsx";
import Info from "./views/info.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Album />} />
        <Route path="sheets" element={<Sheets />} />
        <Route path="info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
