import React from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default class Member extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            member: { ...window.history.state.usr },
            workout: null,
            exercises: null
        }

        console.log(this.state)
    }

    async componentDidMount() {
        if (this.state.member) {
            try {
                let res = await axios.get(`http://localhost:3333/workout/${this.state.member.id}`)

                this.setState({
                    workout: res.data.workout,
                    exercises: res.data.exercise
                })
                console.log(this.state);
            }
            catch (e) {
                console.log('Not found')
            }
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.member.name + ' ' + this.state.member.last_name}</h1>
                <span>{this.state.member.email}</span>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Exercicio</TableCell>
                                <TableCell align="right">Series</TableCell>
                                <TableCell align="right">Repeticoes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.exercises && this.state.exercises.map((exercise) => (
                                <TableRow
                                    key={exercise.id}
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
            </div>
        )
    }
}