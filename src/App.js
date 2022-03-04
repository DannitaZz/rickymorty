import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./views/album.jsx";
import Sheets from "./views/sheets.jsx";
import Info from "./views/info.jsx";
import Layout from "./components/layout";
import OpenedSheets from "./components/sheets-opened";
import ClosedSheets from "./components/sheets-closed";
import { Provider } from "./context/context";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Album />} />
            <Route path="sheets" element={<Sheets />}>
              <Route path="opened" element={<OpenedSheets />} />
              <Route path="closed" element={<ClosedSheets />} />
            </Route>
            <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
