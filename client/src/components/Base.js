import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export default class Base extends React.Component {
    render() {
        return (
            <Box sx={{
                width: '100vw',
                height: '100vh',
                overflowX: 'hidden',
                backgroundColor: '#dddddd',
            }}>
                <Box component="div" sx={{ marginBottom: '0em' }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                AcadG
                            </Typography>
                            <Button color="inherit">
                                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    sair
                                </Link>
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Box component="div" sx={{
                    width: '100%',
                    magin: '0 auto',
                }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12} md={8} style={{ backgroundColor: '#ffffff90', padding: '1em' }}>
                            {this.props.children}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    }
}