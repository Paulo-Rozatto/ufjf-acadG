import React from 'react';
import axios from 'axios';

import { Button, TextField } from '@mui/material'
import { Navigate } from "react-router-dom";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false,
            path: '',
            user: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        let login = document.getElementById('logn').value;
        let password = document.getElementById('password').value;

        try {
            let res = await axios.post('http://localhost:3333/login', { login, password })

            this.setState({
                path: res.data.user.type === 1 ? 'member' : 'employee',
                user: res.data.user,
                navigate: true
            })
        }
        catch (e) {
            console.log('bad')
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <TextField id="logn" label="Login" variant="filled" required />
                <br /><br />
                <TextField id="password" label="Senha" variant="filled" required type="password" />
                <br /><br />
                <Button onClick={this.handleSubmit} variant="contained">Enviar</Button>
                {
                    this.state.navigate && <Navigate to={this.state.path} state={this.state.user}></Navigate>
                }
            </div>
        );
    }
}