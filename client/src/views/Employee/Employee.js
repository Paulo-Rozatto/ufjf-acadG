import React from "react";
import axios from "axios";

import { Alert, Box, Button, Tab, Tabs } from "@mui/material";

import Base from "../../components/Base";
import TabPanel from "../../components/TabPanel";
import MemberForm from "./components/MemberForm";
import MemberQuery from "./components/MemberQuery";


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
        this.punch = this.punch.bind(this);
    }

    handleTab(event, newValue) {
        this.setState({
            value: newValue,
            member: null
        })
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
                        <MemberQuery></MemberQuery>
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