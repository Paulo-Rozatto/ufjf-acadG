import React from "react";
import axios from "axios";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";

export default class MemberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                name: '',
                last_name: '',
                cpf: '',
                email: '',
                login: '',
                password: '',
                type: 1
            },
            openModal: false,
            warning: false,
            success: false
        }

        this.change = this.change.bind(this);
        this.save = this.save.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    change(event) {
        this.setState({
            userData: { ...this.state.userData, [event.target.name]: event.target.value }
        })
    }

    confirm() {
        let empty
        for (const key in this.state.userData) {
            empty = this.state.userData[key] === '';

            if (empty) break;
        }

        console.log('em', empty)

        if (empty) {
            this.setState({
                warning: true
            })
        }
        else {
            this.setState({
                openModal: true,
                warning: false
            })
        }
    }

    async save(password) {
        this.setState({
            openModal: false
        })

        if (!password) return;

        let date = new Date();
        let expiration = new Date();
        expiration.setMonth(date.getMonth() + 1)

        let data = {
            authentication: {
                login: this.props.login,
                password: password
            },
            userData: { ...this.state.userData },
            memberData: {
                membership_status: "active",
                membership_start: date,
                membership_expiration: expiration
            }
        }

        try {
            let res = await axios.post('http://localhost:3333/member', data)

            console.log(res);

            this.setState({
                userData: {
                    name: '',
                    last_name: '',
                    cpf: '',
                    email: '',
                    login: '',
                    password: '',
                    type: 1
                },
                success: true
            })

        } catch (error) {
            console.error(error)
        }

    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}><h2>{this.props.title}</h2></Grid>

                <Grid item xs={12}>
                    {this.state.success && <Alert severity="success">Usuario cadastrado</Alert>}
                    {this.state.warning && <Alert severity="warning">Nenhum campo pode ficar vazio</Alert>}
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="name" label="Nome" value={this.state.userData.name} onChange={this.change} variant="filled" fullWidth></TextField>
                </Grid>


                <Grid item xs={12} md={6}>
                    <TextField name="last_name" label="Sobrenome" value={this.state.userData.last_name} onChange={this.change} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="login" label="Login" value={this.state.userData.login} onChange={this.change} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="password" label="Senha" value={this.state.userData.password} onChange={this.change} variant="filled" type="password" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={8}>
                    <TextField name="email" label="Email" value={this.state.userData.email} onChange={this.change} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField name="cpf" label="CPF" value={this.state.userData.cpf} onChange={this.change} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={this.confirm} variant="contained">Salvar</Button>
                    <ConfimationDialog open={this.state.openModal} close={this.save}></ConfimationDialog>
                </Grid>
            </Grid>

        )
    }
}

class ConfimationDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: ''
        }

        this.change = this.change.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    change(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCancel() {
        this.props.close()
        this.setState({ password: '' })
    }

    handleOk() {
        this.props.close(this.state.password);
        this.setState({ password: '' })
    }


    render() {
        return (
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                maxWidth="xs"
                open={this.props.open}
            >
                <DialogTitle>Autenticação</DialogTitle>
                <DialogContent>
                    <TextField name="password" label="Senha" value={this.state.password} onChange={this.change} variant="filled" type="password" fullWidth></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleOk}>Ok</Button>
                    <Button autoFocus onClick={this.handleCancel}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}