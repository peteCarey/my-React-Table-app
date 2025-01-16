import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

const title = "How our Records are kept";


function App(){
  return <>
  <h1>{title}</h1><Navbar /><Home /><Footer />
  </>
}

// const root = ReactDOM.createRoot(document.getElementById('root'));



export default App;
