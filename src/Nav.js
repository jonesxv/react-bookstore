import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Nav = () => (
  <header>
    <nav>
      <ul className="container">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
        <li><Link to='/add'>Add Book</Link></li>
      </ul>
    </nav>
  </header>
)

export default Nav