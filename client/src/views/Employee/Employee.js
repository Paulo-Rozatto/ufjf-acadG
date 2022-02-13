import React from "react";
import axios from "axios";

import { Alert, Box, Button, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField } from "@mui/material";

import Base from "../../components/Base";
import TabPanel from "../../components/TabPanel";
import MemberForm from "../../components/MemberForm";


export default class Employee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            employee: { ...window.history.state.usr },
            member: null,
            workout: null,
            exercises: [],
            isCreating: false,
            punchTime: null
        }

        this.handleTab = this.handleTab.bind(this)
        this.queryMember = this.queryMember.bind(this)
        this.queryMemberWorkout = this.queryMemberWorkout.bind(this)
        this.updateMember = this.updateMember.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.saveWorkout = this.saveWorkout.bind(this);
        this.punch = this.punch.bind(this);
    }

    handleTab(event, newValue) {
        this.setState({
            value: newValue,
            member: null
        })
    }

    async queryMember() {
        let id = document.getElementById('query-member').value.trim();

        if (id.length > 0) {
            try {
                let res = await axios.get(`http://localhost:3333/member/${id}`)

                this.setState({
                    member: res.data.member,
                    isCreating: false
                })

                document.getElementById('member-name').value = res.data.member.name
                document.getElementById('member-last').value = res.data.member.last_name
                document.getElementById('member-email').value = res.data.member.email
                document.getElementById('member-expiration').value = res.data.member.membership_expiration

                if (this.state.employee.type === 2) {
                    this.queryMemberWorkout(res.data.member.id);
                }
            } catch (error) {
                console.error(error)

                this.setState({
                    member: null,
                    isCreating: false
                })
            }
        }
    }

    async queryMemberWorkout(id) {
        try {
            let res = await axios.get(`http://localhost:3333/workout/${id}`)

            this.setState({
                workout: res.data.workout,
                exercises: res.data.exercise
            })
        } catch (error) {
            this.setState({
                workout: null,
                exercises: []
            })
        }


    }

    async updateMember() {
        let name = document.getElementById('member-name').value.trim()
        let last_name = document.getElementById('member-last').value.trim()
        let email = document.getElementById('member-email').value.trim()
        let membership_expiration = document.getElementById('member-expiration').value.trim();

        let userData = {
            name,
            last_name,
            email
        }

        try {
            await axios.put(`http://localhost:3333/member`, {
                id: this.state.member.id,
                membership_expiration,
                userData
            })

        } catch (error) {
            console.error(error);
        }
    }

    addExercise() {
        let name = document.getElementById('exercise-name').value.trim();
        let sets = parseInt(document.getElementById('exercise-sets').value.trim())
        let reps = parseInt(document.getElementById('exercise-reps').value.trim())

        if (name.length > 0 && !isNaN(sets) && !isNaN(reps)) {
            this.setState({
                exercises: [...this.state.exercises, { name, sets, reps }]
            })
        }

        document.getElementById('exercise-name').value = ''
        document.getElementById('exercise-sets').value = ''
        document.getElementById('exercise-reps').value = ''
    }

    async saveWorkout() {
        let start_date = new Date();
        let expire_date = new Date();
        let member_id = this.state.member.id;
        let instructor_id = this.state.employee.id;

        expire_date.setMonth(start_date.getMonth() + 2)

        try {
            let res = await axios.post(`http://localhost:3333/workout`, {
                start_date,
                expire_date,
                member_id,
                instructor_id
            })

            let workout = res.data.workout;

            let exercises = this.state.exercises.map(e => {
                e.workout_id = workout.id;
                return e
            })

            res = await axios.post(`http://localhost:3333/exercise`, exercises)

            this.setState({
                workout,
                exercises,
                isCreating: false,
            })

        } catch (error) {
            console.error(error)
        }

    }

    async punch() {
        try {
            let employee_id = this.state.employee.type === 1 ? this.state.employee.id : this.state.employee.employee_id;

            await axios.post(`http://localhost:3333/punchClock`, {
                employee_id,
                date: new Date()
            })

            this.setState({
                punchTime: (new Date()).toString()
            })

        } catch (error) {
            console.error(error);
        }
    }


    render() {
        return (
            <Base>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={this.handleTab}>
                            <Tab label="Consulta" />
                            <Tab label="Cadastro" />
                            <Tab label="Ponto" />
                        </Tabs>
                    </Box>
                    <TabPanel index={0} value={this.state.value}>
                        <TextField id="query-member" label="Consultar aluno" variant="filled" fullWidth />
                        <br /><br />
                        <Button onClick={this.queryMember} variant="contained">Consultar</Button>
                        <br /><br />


                        {this.state.member && (

                            <div>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <h2>Informações</h2>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="member-name" label="Nome" variant="filled" fullWidth></TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="member-last" label="Sobrenome" variant="filled" fullWidth></TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="member-email" label="email" variant="filled" fullWidth></TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField id="member-expiration" label="Vencimento" variant="filled" fullWidth></TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Button onClick={this.updateMember} variant="contained">Salvar alterações</Button>
                                    </Grid>
                                </Grid>

                                {this.state.employee.type === 2 &&
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <h2>Treino</h2>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h4>Inicio treino: {this.state.workout && new Date(this.state.workout.start_date).toDateString()}</h4>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <h4>Fim treino: {this.state.workout && new Date(this.state.workout.expire_date).toDateString()}</h4>
                                        </Grid>
                                        <Grid item xs={12} >
                                            {this.state.exercises.length > 0 && <TableContainer component={Paper}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Exercicio</TableCell>
                                                            <TableCell align="right">Series</TableCell>
                                                            <TableCell align="right">Repeticoes</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {this.state.exercises.map((exercise) => (
                                                            <TableRow
                                                                key={exercise.name}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {exercise.name}
                                                                </TableCell>
                                                                <TableCell align="right">{exercise.sets}</TableCell>
                                                                <TableCell align="right">{exercise.reps}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            }
                                            {!this.state.exercises.length > 0 && <h4>Nenhum treino registrado</h4>}
                                        </Grid>

                                        {this.state.isCreating &&
                                            <>
                                                <Grid item xs={12} md={4}>
                                                    <TextField id="exercise-name" label="Exercicio" variant="filled" fullWidth></TextField>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <TextField id="exercise-sets" label="Series" variant="filled" fullWidth></TextField>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <TextField id="exercise-reps" label="Repeticoes" variant="filled" fullWidth></TextField>
                                                </Grid>
                                            </>}

                                        {this.state.isCreating &&
                                            <Grid item xs={12}>
                                                <Button onClick={this.addExercise} variant="contained">Adcionar</Button>
                                                <span>  </span>
                                                <Button onClick={this.saveWorkout} variant="outlined" color="secondary">Salvar</Button>
                                            </Grid>
                                        }

                                        {!this.state.isCreating &&
                                            <Grid item xs={12} md={6}>
                                                <Button onClick={() => { this.setState({ exercises: [], isCreating: true }) }} variant="contained">Novo treino</Button>
                                            </Grid>
                                        }
                                    </Grid>
                                }
                            </div>
                        )}
                    </TabPanel>

                    <TabPanel index={1} value={this.state.value}>
                        <MemberForm title="Cadastro de Aluno" login={this.state.employee.login}></MemberForm>
                    </TabPanel>

                    <TabPanel index={2} value={this.state.value}>
                        <Button onClick={this.punch} variant="contained">Bater ponto</Button>
                        <br /><br />
                        {this.state.punchTime && <Alert severity="success">Ponto batido em {this.state.punchTime}</Alert>}
                    </TabPanel>
                </Box>
            </Base>
        )
    }
}