import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      showSystemAdminBoard: false,
      showAdminBoard: false,
      showDispatcherBoard: false,
      showWarehouseManagerBoard: false,
      showShopManagerBoard: false,
      showDirectorBoard: false,
      collapse: false,
    };
    this.toggle = this.toggle.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    let user = localStorage.getItem('user');
    if (user) {
      user = jwtDecode(user);
      this.setState({
        currentUser: user,
        showAdminBoard: user.role.includes('ROLE_ADMIN'),
        showSystemAdminBoard: user.role.includes('ROLE_SYSTEM_ADMIN'),
        showDispatcherBoard: user.role.includes('ROLE_DISPATCHER'),
        showWarehouseManagerBoard: user.role.includes('ROLE_WAREHOUSE_MANAGER'),
        showShopManagerBoard: user.role.includes('ROLE_SHOP_MANAGER'),
        showDirectorBoard: user.role.includes('ROLE_DIRECTOR'),
      });
    }
  }

  logOut() {
    localStorage.removeItem('user');
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { currentUser, showAdminBoard, showSystemAdminBoard, showDispatcherBoard } = this.state;

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-3">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            onClick={this.toggle}
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {showSystemAdminBoard && (
                <li className="nav-item">
                  <Link to={'/system-admin'} className="nav-link" tabIndex="-1">
                    Admin
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={'/locations'} className="nav-link" tabIndex="-1">
                    Locations
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={'/users'} className="nav-link" tabIndex="-1">
                    Users
                  </Link>
                </li>
              )}
              {(showAdminBoard || showDispatcherBoard) && (
                <li className="nav-item">
                  <Link to={'/items'} className="nav-link" tabIndex="-1">
                    Items
                  </Link>
                </li>
              )}
              {(showDispatcherBoard || this.state.showWarehouseManagerBoard || this.state.showShopManagerBoard) && (
                <li className="nav-item">
                  <Link to={'/applications'} className="nav-link" tabIndex="-1">
                    Applications
                  </Link>
                </li>
              )}
              {(this.state.showWarehouseManagerBoard) && (
                <li className="nav-item">
                  <Link to={'/warehouse'} className="nav-link" tabIndex="-1">
                    Warehouse
                  </Link>
                </li>
              )}
              {(this.state.showShopManagerBoard) && (
                <li className="nav-item">
                  <Link to={'/shop'} className="nav-link" tabIndex="-1">
                    Shop
                  </Link>
                </li>
              )}
              {(this.state.showShopManagerBoard) && (
                <li className="nav-item">
                  <Link to={'/bills'} className="nav-link" tabIndex="-1">
                    Bills
                  </Link>
                </li>
              )}
              {(this.state.showShopManagerBoard) && (
                <li className="nav-item">
                  <Link to={'/write-off-acts'} className="nav-link" tabIndex="-1">
                    Write off acts
                  </Link>
                </li>
              )}
              {(this.state.showDirectorBoard) && (
                <li className="nav-item">
                  <Link to={'/taxes/rental'} className="nav-link" tabIndex="-1">
                    Rental taxes
                  </Link>
                </li>
              )}
              {(this.state.showDirectorBoard) && (
                <li className="nav-item">
                  <Link to={'/taxes/category'} className="nav-link" tabIndex="-1">
                    Category taxes
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex">
              {currentUser ? (
                <div className="navbar-nav ml-auto align-items-center">
                  <li className="nav-item">
                    <a href="" className="nav-link" onClick={this.logOut} style={{paddingBottom: 13}}>
                      Log Out
                    </a>
                  </li>

                  <li className="nav-item">
                    <Link to={'/profile'} className="nav-link">
                      {currentUser.name}
                      <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="rounded-circle ps-1"
                        width="33"
                      />
                    </Link>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto align-items-center">
                  <li className="nav-item">
                    <Link to={'/login'} className="nav-link">
                      Login
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
