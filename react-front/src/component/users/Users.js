import React, { Component, createRef } from 'react';
import { Redirect } from 'react-router-dom';
import Toast from '../common/Toast';
import Modal from '../common/Modal';
import Util from '../../service/Util';
import axios from 'axios';
import { UsersInnerModal } from './UsersInnerModal';
import AuthService from '../../service/AuthService';
import Pagination from '../common/Pagination';

class Users extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.toastRef = createRef();
    this.state = {
      params: {
        page: 0
      },
      users: [],
      ids: [],
      locationIds: [],
      email: '',
      role: 'DISPATCHER',
      name: '',
      surname: '',
      login: '',
      birthday: '',
      address: {
        stateCode: 'AK',
        city: '',
        firstLine: '',
        secondLine: ''
      },
      location: {
        identifier: ''
      }
    };
  }

  componentDidMount() {
    document.title = "Employees";
    axios.get('/locations').then(
      (response) => {
        this.setState({
          locationIds: response.data.locations.map(location => location.identifier)
        });
      }
    );
    this.updateUsers();
  }

  updateUsers = () => {
    axios.get('/users', { params: this.state.params }).then(
      (response) => {
        this.setState({
          content: response.data
        });
      }
    );
  };

  submit = () => {
    this.modalRef.current.click();
    axios.post('/users', this.state).then(
      (response) => {
        Util.showPositiveToast(this, response, this.toastRef);
        this.updateUsers();
      },
      (error) => {
        Util.showNegativeToast(this, error, this.toastRef);
      }
    );
  };

  changeUserStatus = (id) => {
    let map = this.state.content.users.map(user =>
      user.id === id ? {...user, active: !user.active} : user
    );
    this.setState({
      content: {
        ...this.state.content,
        users: map
      }
    });
    axios.put('/users/' + id, map.find(user => user.id === id).active, {
      headers: {
        'Content-Type': 'application/json',
      }
    } );
  };

  render() {
    if (!AuthService.currentUserHasRole('ROLE_ADMIN')) {
      return <Redirect to={"/profile"} />;
    }
    return (
      <div>
        <Toast
          toastType={this.state.toastType}
          message={this.state.message}
          ref={this.toastRef}
        />
        <div className='row mb-3'>
          <div className='col'>
            <button
              type='button'
              className='btn btn-primary me-3'
              onClick={() => Util.openModal(this.modalRef)}
            >
              Add
            </button>
          </div>
        </div>
        <Modal
          ref={this.modalRef}
          submit={this.submit}
        >
          <UsersInnerModal email={this.state.email} role={this.state.role}
                           location={this.state.location.identifier} locationIds={this.state.locationIds}
                           name={this.state.name} surname={this.state.surname}
                           login={this.state.login} birthday={this.state.birthday}
                           stateCode={this.state.address.stateCode} city={this.state.address.city}
                           firstLine={this.state.address.firstLine}
                           secondLine={this.state.address.secondLine}
                           onChange={() => Util.handleChange(this, window.event)}
                           onAddressChange={() => Util.handleAddressChange(this, window.event)}
                           onLocationChange={(value) => Util.handleLocationChange(this, value)}
          />
        </Modal>
        <table className='table table-striped'>
          <thead>
          <tr>
            <th scope='col'/>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th scope='col'>Location</th>
            <th scope='col'>Name</th>
            <th scope='col'>Surname</th>
            <th scope='col'>Birthday</th>
          </tr>
          </thead>
          <tbody>
          {this.state.content && this.state.content.users && this.state.content.users.map((user) => (
            <tr key={user.id}>
              <th scope='row'>
                {user.role.role !== 'ADMIN' && <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    name='status'
                    id='flexSwitchCheckChecked'
                    onChange={() => this.changeUserStatus(user.id)}
                    checked={user.active}
                  />
                  <label
                    className='form-check-label'
                    htmlFor='flexSwitchCheckChecked'
                  />
                </div>}
              </th>
              <td>{user.email}</td>
              <td>{user.role.role}</td>
              <td>{user.location && user.location.identifier}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.birthday}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <Pagination
          currentPage={this.state.params.page}
          totalPages={this.state.content && this.state.content.totalPages}
          toPage={(page) => Util.toPage(this, this.updateUsers, page)}
        />
      </div>
    );
  }
}

export default Users;