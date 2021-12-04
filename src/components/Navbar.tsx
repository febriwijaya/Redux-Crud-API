import React from 'react'
import { Link } from 'react-router-dom';
function Header({ title }: any) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
        <div className="container">
          <Link to="/" className="navbar-brand">Final Projects Febri</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/PersonForm" className="nav-link text-white">+ Add New People</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header