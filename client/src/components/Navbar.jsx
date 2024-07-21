import React from "react";
import "../styles/navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbarWrapper">
      <Link to="/">
        <h2 className="navbarHeading">MetroWala</h2>
      </Link>
      <RxHamburgerMenu className="navbarHamburger" />
    </nav>
  );
};

export default Navbar;
