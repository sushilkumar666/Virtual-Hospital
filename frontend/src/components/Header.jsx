import React from "react";
import Navbar from "./Navbar";

function Header() {
  return (
    <div style={{ zIndex: 20 }} className="sticky top-0">
      <Navbar />
    </div>
  );
}

export default Header;
