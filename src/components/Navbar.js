import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from 'assets/planet.png';

const Navbar = () => {
  const links = [
    { path: '/', text: 'Rockets' },
    { path: 'missions', text: 'Missions' },
    { path: 'profile', text: 'My Profile' },
  ];
  return (
    <div className="navbar flex justify-between items-center mx-12 py-4 border-b">
      <h1 className="nav-title flex items-center text-3xl font-bold text-cyan-500 pl-6">
        <img className="mr-4" src={Logo} width={48} height={48} />
        Space Travelers Hub
      </h1>
      <ul className="flex justify-center">
        {links.map((link) => (
          <li key={link.text}>
            <NavLink
              className={({ isActive }) =>
                `text-sky-600 font-semibold px-6 ${isActive && 'underline'} ${
                  link.path === 'profile' && 'border-l-2'
                }`
              }
              to={link.path}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
