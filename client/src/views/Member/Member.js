import React from "react";
import axios from "axios";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import Base from "../../components/Base";

export default class Member extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            member: { ...window.history.state.usr },
            workout: null,
            exercises: []
        }
    }

    async componentDidMount() {
        if (this.state.member) {
            try {
                let res = await axios.get(`http://localhost:3333/workout/${this.state.member.id}`)

                this.setState({
                    workout: res.data.workout,
                    exercises: res.data.exercise
                })
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    render() {
        return (
            <Base>
                <h1>{this.state.member.name + ' ' + this.state.member.last_name}</h1>
                <div> {this.state.member.email}</div>
                
                <br /> <br />
                <div>Vencimento: {(new Date(this.state.member.membership_expiration).toDateString())}</div>

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
                </Grid>
            </Base>
        )
    }
}