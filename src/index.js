import React from 'react';
import ReactDOM from 'react-dom/client';
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./index.css";

const title = "How are Records are kept";
const img ="./images/DXC-Logo-gray.jpg";


const Home = () =>{
 
  /*const navigate = useNavigate();
  const goToNextScreen = () => {
    navigate("/records");
  };*/

  return ( 
        <><NavBar></NavBar><Section></Section><Footer></Footer><NavBar job="developer"/></> 
  );
}

const NavBar = (props) => {
  console.log(props);
  return (
    <nav className="navbar">
      <span>National Club</span>
    </nav>
  );
};

const Section= ({ goToNextScreen }) => {
  return (
    <section className="homepage">
      <h1>{title}</h1>
      <p>
        This schedule aims to support users within our club in managing their
        information assets.
      </p>
      <p>
        It will provide guidance on how best to categorise their information
        assets with examples given, but please note these categories and
        examples are not exhaustive.
      </p>
      <p>
        The categories in this document relate to those detailed in our rule
        book, however, this is a bespoke retention schedule and only includes
        categories and examples commonly used within the club.
      </p>
      <p>
        For information regarding the application of exemptions please refer to
        the rule book and additional club policies.
      </p>
      <Button onClick={goToNextScreen}>Search Table</Button>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <img src={img} alt="the footer logo" />
    </footer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Home />);
