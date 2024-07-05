import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Read from "./component/Read";
import Update from "./component/Update";
import Create from "./component/Create";
import Main from "./component/Main";
import Signup from "./component/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/read" element={<Read />} />
        <Route path="/update" element={<Update />} />
        <Route path="/create" element={<Create />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
