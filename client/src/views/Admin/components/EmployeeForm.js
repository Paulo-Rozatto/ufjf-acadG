import React from "react";
import axios from "axios";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from "@mui/material";

export default class EmployeeForm extends React.Component {
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
                type: 2
            },
            employeeData: {
                salary: '',
                contract_status: 'ativo',
                type: 1
            },
            instructorData: {
                cref: ""
            },
            openModal: false,
            warning: false,
            success: false
        }

        this.changeUser = this.changeUser.bind(this);
        this.changeEmployee = this.changeEmployee.bind(this);
        this.changeInstructor = this.changeInstructor.bind(this);
        this.save = this.save.bind(this);
        this.confirm = this.confirm.bind(this);
        this.handleSelct = this.handleSelct.bind(this);
    }

    changeUser(event) {
        this.setState({
            userData: { ...this.state.userData, [event.target.name]: event.target.value }
        })
    }

    changeEmployee(event) {
        this.setState({
            employeeData: { ...this.state.employeeData, [event.target.name]: event.target.value }
        })
    }

    changeInstructor(event) {
        this.setState({
            instructorData: { ...this.state.instructorData, [event.target.name]: event.target.value }
        })
    }

    confirm() {
        let empty1 = false, empty2 = false, empty3 = false;
        for (const key in this.state.userData) {
            empty1 = this.state.userData[key] === '';

            if (empty1) break;
        }

        for (const key in this.state.employeeData) {
            empty2 = this.state.employeeData[key] === '';

            if (empty2) break;
        }

        if (this.state.employeeData.type === 2) {
            for (const key in this.state.instructorData) {
                empty3 = this.state.instructorData[key] === '';

                if (empty3) break;
            }
        }

        if (empty1 || empty2 || empty3) {
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
                username: this.props.login,
                password: password
            },
            userData: { ...this.state.userData },
            employeeData: { ...this.state.employeeData }
        }

        if(this.state.employeeData.type === 2) {
            data.instructorData = {...this.state.instructorData}
        }

        try {
            await axios.post('http://localhost:3333/employee', data)

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
                employeeData: {
                    salary: '',
                    contract_status: 'ativo',
                    type: 1
                },
                instructorData: {
                    cref: ""
                },
                success: true
            })

        } catch (error) {
            console.error(error)
        }

    }

    handleSelct(event) {
        this.setState({
            employeeData: { ...this.state.employeeData, type: event.target.value }
        })
    }

    render(event) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}><h2>{this.props.title}</h2></Grid>

                <Grid item xs={12}>
                    {this.state.success && <Alert severity="success">Usuario cadastrado</Alert>}
                    {this.state.warning && <Alert severity="warning">Nenhum campo pode ficar vazio</Alert>}
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="name" label="Nome" value={this.state.userData.name} onChange={this.changeUser} variant="filled" fullWidth></TextField>
                </Grid>


                <Grid item xs={12} md={6}>
                    <TextField name="last_name" label="Sobrenome" value={this.state.userData.last_name} onChange={this.changeUser} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="login" label="Login" value={this.state.userData.login} onChange={this.changeUser} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="password" label="Senha" value={this.state.userData.password} onChange={this.changeUser} variant="filled" type="password" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={8}>
                    <TextField name="email" label="Email" value={this.state.userData.email} onChange={this.changeUser} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField name="cpf" label="CPF" value={this.state.userData.cpf} onChange={this.changeUser} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="salary" label="Salário" type="number" value={this.state.employeeData.salary} onChange={this.changeEmployee} variant="filled" fullWidth></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField name="type" select label="Tipo" value={this.state.employeeData.type} onChange={this.changeEmployee} variant="filled" fullWidth>
                        <MenuItem value={1}>Regular</MenuItem>
                        <MenuItem value={2}>Professor(a)</MenuItem>
                    </TextField>
                </Grid>
                {this.state.employeeData.type === 2 &&
                    <Grid item xs={12} md={12}>
                        <TextField name="cref" label="CREF" value={this.state.instructorData.cref} onChange={this.changeInstructor} variant="filled" fullWidth></TextField>
                    </Grid>
                }

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