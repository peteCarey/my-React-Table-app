import Home from "./components/Home";
import EmpListing from "./components/EmpListing";
import EmpCreate from "./components/EmpCreate";
import EmpDetail from "./components/EmpDetail";
import EmpEdit from "./components/EmpEdit";
import { Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App(){
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<EmpListing />} />
        <Route path="/employee/create" element={<EmpCreate />} />
        <Route path="/employee/detail/:empid" element={<EmpDetail />} />
        <Route path="/employee/edit/:empid" element={<EmpEdit />} />
      </Routes>
    </div>
  );
}

export default App;
