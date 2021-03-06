import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import * as bootstrap from 'bootstrap';
import Toast from '../common/Toast';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.toastRef = React.createRef();
    this.state = {
      email: '',
      password: '',
      loading: false,
      message: null,
      isSpinnerShown: false,
      redirect: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.message) {
      this.setState({ message: this.props.location.state.message });
      new bootstrap.Toast(this.toastRef.current).show();
    }
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleLogin(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.checkValidity()) {
      this.setState({ isSpinnerShown: true });
      axios
        .post('login', this.state)
        .then((response) => {
          if (response.data.jwt) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        })
        .then(
          () => {
            this.setState({ redirect: '/profile' });
            window.location.reload();
          },
          (error) => {
            this.setState({
              toastType: 'error',
              message: error.response.data.message,
              isSpinnerShown: false,
            });
            new bootstrap.Toast(this.toastRef.current).show();
          }
        );
    } else {
      this.setState({ isFormValidated: false });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let isFormValidated = this.state.isFormValidated;
    return (
      <div className="container mt-4">
        <div className="row mb-4 justify-content-center text-center">
          <h3 className="col">Login</h3>
        </div>
        <Toast
          toastType={this.state.toastType}
          message={this.state.message}
          ref={this.toastRef}
        />
        <form
          className={
            isFormValidated || isFormValidated === undefined
              ? 'needs-validation'
              : 'needs-validation was-validated'
          }
          noValidate
          onSubmit={this.handleLogin}
        >
          <div className="row mb-3 justify-content-center">
            <label
              htmlFor="validationCustom01"
              className="form-label col-sm-1 col-form-label"
            >
              Email
            </label>
            <div className="col-sm-4">
              <input
                type="email"
                name="email"
                className="form-control"
                id="validationCustom01"
                required
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="off"
              />
              <div className="invalid-feedback">Please, enter your email</div>
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <label
              htmlFor="validationCustom02"
              className="form-label col-sm-1 col-form-label"
            >
              Password
            </label>
            <div className="col-sm-4">
              <div className="input-group has-validation">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="validationCustom02"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                  autoComplete="off"
                />
                <div className="invalid-feedback">
                  Please, enter your password
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 justify-content-center">
            <div className="col-sm-5">
              <div className="row align-items-center">
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <div className="col-auto">
                  <div
                    className="spinner-border"
                    role="status"
                    style={this.state.isSpinnerShown ? {} : { display: 'none' }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
