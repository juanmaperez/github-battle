const React = require('react');
const Link = require('react-router-dom').Link; // we are not using this
const NavLink = require('react-router-dom').NavLink; // It's the same that link but add a class when the route matches

function Nav () {
  return (
    <ul className="nav">
      <li>
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">Battle</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular">Popular</NavLink>
      </li>
    </ul>
  )
}
module.exports = Nav