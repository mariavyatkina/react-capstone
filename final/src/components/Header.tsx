import React from 'react';
import {Link} from 'react-router-dom';
function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark  bg-dark">
    <Link className="navbar-brand" to="/">Movie App</Link>
    <ul className='navbar-nav mr-auto'>
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/signin">Sign in</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/signup">Sign up</Link>
      </li>

    </ul>

  </nav>
  );
}

export default Header