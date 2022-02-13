import React from "react";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";

export default class EmployeeQuery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            admin: { ...window.history.state.usr },
            member: null,
            employee: null,
            workout: null,
            exercises: [],
            isCreating: false,
        }

        console.log(this.state);

        this.queryEmployee = this.queryEmployee.bind(this)
        this.updateMember = this.updateMember.bind(this);
    }


    async queryEmployee() {
        let id = document.getElementById('query-employee').value.trim();

        if (id.length > 0) {
            try {
                let res = await axios.get(`http://localhost:3333/employee/${id}`)

                this.setState({
                    employee: res.data.employee,
                    isCreating: false
                })

                document.getElementById('employee-name').value = res.data.employee.name
                document.getElementById('employee-last').value = res.data.employee.last_name
                document.getElementById('employee-email').value = res.data.employee.email
                document.getElementById('employee-salary').value = res.data.employee.salary
                document.getElementById('employee-status').value = res.data.employee.contract_status
                document.getElementById('employee-type').value = res.data.employee.type === 1 ? 'Funcionario(a)' : 'Professor(a)'

            } catch (error) {
                console.error(error)

                this.setState({
                    employee: null,
                    isCreating: false
                })
            }
        }
    }

    async updateMember() {
        let name = document.getElementById('employee-name').value.trim()
        let last_name = document.getElementById('employee-last').value.trim()
        let email = document.getElementById('employee-email').value.trim()
        let salary = document.getElementById('employee-salary').value.trim()
        let contract_status = document.getElementById('employee-status').value.trim()

        let userData = {
            name,
            last_name,
            email
        }

        try {
            await axios.put(`http://localhost:3333/employee`, {
                id: this.state.employee.id,
                salary,
                contract_status,
                userData
            })

        } catch (error) {
            console.error(error);
        }
    }

    render() {

        return <>
            <TextField id="query-employee" label="Consultar funcionário" variant="filled" fullWidth />
            <br /><br />
            <Button onClick={this.queryEmployee} variant="contained">Consultar</Button>
            <br /><br />


            {this.state.employee && (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <h2>Informações</h2>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="employee-name" label="Nome" variant="filled" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="employee-last" label="Sobrenome" variant="filled" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="employee-email" label="email" variant="filled" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="employee-salary" label="Salario" variant="filled" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="employee-status" label="Vinculo" variant="filled" fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="employee-type" label="Tipo" variant="filled" fullWidth disabled></TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Button onClick={this.updateMember} variant="contained">Salvar alterações</Button>
                    </Grid>
                </Grid>
            )}
        </>
    }
}