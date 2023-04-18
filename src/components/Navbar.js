import { NavLink } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  const links = [
    { path: 'profile', text: 'Profile' },
    { path: 'missions', text: 'Missions' },
    { path: '/', text: 'Rockets' },
  ];
  return (
    <div className="navbar">
      <h1 className="nav-title">Space Travelers</h1>
      <ul>
        {links.map((link) => (
          <li key={link.text}>
            <NavLink to={link.path}>{link.text}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
