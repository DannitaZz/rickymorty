import "./App.css";
import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Album from "./views/album.jsx";
import Sheets from "./views/sheets.jsx";
import Info from "./views/info.jsx";
import Layout from "./components/layout";
import { initialState, reducer } from "./hooks/reducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Album />} />
          <Route path="sheets" element={<Sheets />} />
          <Route
            path="info"
            element={
              <Info
                currentData={state.infoPage.currentData}
                locations={state.infoPage.currentLocations}
                locationCount={state.locationCount}
                locationsPage={state.infoPage.locationsPage}
                page={state.infoPage.page}
                count={state.count}
                dispatch={dispatch}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
