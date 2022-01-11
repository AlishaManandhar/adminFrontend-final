
import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../services/authServices'


function NavBar() {
  return (
    <nav className="navbar  navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Online Baby Store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas bg-dark offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Admin Panel</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          {/* <!-----  offcanvas header  -----> */}


          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {/* <li className="nav-item">
                <Link className="nav-link active" to="/">Dashboard</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">Sales</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/order">Orders</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="offcanvasNavbarDropdown">
                  <li><Link className="dropdown-item text-light" to="/category">All Category</Link></li>
                  <li><Link className="dropdown-item" to="/category/create">Add Category</Link></li>
                  <li><Link className="dropdown-item" to="/sub-category/create">Add Sub Category</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="offcanvasNavbarDropdown">
                  <li><Link className="dropdown-item text-light" to="/product">All Products</Link></li>
                  <li><Link className="dropdown-item" to="/product/create">Add Products</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/blogs" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Blogs
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="offcanvasNavbarDropdown">
                  <li><Link className="dropdown-item text-light" to="/blogs"> All Blogs </Link></li>
                  <li><Link className="dropdown-item" to="/blogs/create-blog">New Blog</Link></li>
                </ul>
              </li>
              {/* <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Configuration
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="offcanvasNavbarDropdown">
                  <li><Link className="dropdown-item text-light" to="/">Carousel Management</Link></li>
                  <li><Link className="dropdown-item" to="/">Sections Management</Link></li>
                </ul>
              </li> */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="/" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  My Account
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark bg-dark" aria-labelledby="offcanvasNavbarDropdown">
                  {/* <li><Link className="dropdown-item text-light" to="/">Change Password</Link></li> */}
                  <li><Link className="dropdown-item" to="/" onClick={() => logout()}>LogOut</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar