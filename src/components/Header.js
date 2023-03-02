import React from "react";
import { Link } from "gatsby";

import * as headerStyle from "./Header.module.scss";

export default function Header() {
  return (
    <div>
      <h1 className={headerStyle.headerTitle}>I am Header</h1>
      <h2 className={headerStyle.headerSubtitle}>I am another Header</h2>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/doesntexist">Doesnt exist</Link>
    </div>
  );
}
