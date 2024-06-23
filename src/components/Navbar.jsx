import React from "react";
import "../styles/navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <nav className="navbarWrapper">
      <h2 className="navbarHeading">MetroWala</h2>
      <RxHamburgerMenu className="navbarHamburger" />
    </nav>
  );
};

export default Navbar;
