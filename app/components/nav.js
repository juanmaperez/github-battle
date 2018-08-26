
import React from 'react';
import { NavLink ,Link} from 'react-router-dom'; // we are not using this
//NavLink It's the same that link but add a class when the route matches

export default function Nav () {
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
