import React from "react";
// import axios from "axios";

import { Alert, Box, Button, Tab, Tabs } from "@mui/material";

import Base from "../../components/Base";
import TabPanel from "../../components/TabPanel";
import EmployeeQuery from "./components/EmployeeQuery";


export default class Admin extends React.Component {
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
    }

    handleTab(event, newValue) {
        this.setState({
            value: newValue,
            member: null
        })
    }

    render() {
        return (
            <Base>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={this.handleTab}>
                            <Tab label="Consulta" />
                            <Tab label="Cadastro" />
                            <Tab label="Relatorio" />
                        </Tabs>
                    </Box>
                    <TabPanel index={0} value={this.state.value}>
                        {/* <MemberQuery></MemberQuery> */}
                        <EmployeeQuery></EmployeeQuery>
                    </TabPanel>

                    <TabPanel index={1} value={this.state.value}>
                        {/* <MemberForm title="Cadastro de Aluno" login={this.state.employee.login}></MemberForm> */}
                    </TabPanel>

                    <TabPanel index={2} value={this.state.value}>
                        
                    </TabPanel>
                </Box>
            </Base>
        )
    }
}