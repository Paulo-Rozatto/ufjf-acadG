import React from "react";
import axios from "axios";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            punchs: []
        }
    }

    async componentDidMount() {
        try {
            let res = await axios.get(`http://localhost:3333/punchclocks`)

            console.log(res);

            this.setState({
                punchs: res.data,
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h2>Relatorio de Pontos</h2>
                </Grid>
                <Grid item xs={12} >
                    {this.state.punchs.length > 0 && <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Matricula funcionario</TableCell>
                                    <TableCell align="">Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.punchs.map((punch) => (
                                    <TableRow
                                        key={punch.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {punch.employee_id}
                                        </TableCell>
                                        <TableCell align="">{(new Date(punch.date)).toString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                    {!this.state.punchs.length > 0 && <h4>Nenhum ponto registrado</h4>}
                </Grid>
            </Grid>
        )
    }
}