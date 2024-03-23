import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import Uploader from "./component/Uploader";
import "./component/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="page">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploader" element={<Uploader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
