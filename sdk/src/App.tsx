import { Routes, Route} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Docs from "./pages/Docs";

export default function App() {
  return (
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/docs" element={<Docs />} />

      </Routes>
  
  );
}