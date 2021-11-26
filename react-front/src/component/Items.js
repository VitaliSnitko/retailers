import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        fetch('http://localhost:8080/items')
            .then(response => response.json())
            .then(data => this.setState({items: data}));
    }

    render() {
        const {items} = this.state;

        const itemList = items.map(item => {
            return <tr key={item.id}>
                <td style={{whiteSpace: 'nowrap'}}>{item.id}</td>
                <td>{item.name}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {itemList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Items;