import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '50px'
    },
    paper: {
        padding: '10px',
        width: '100%'
    },
    control: {
        padding: theme.spacing(2)
    },
    link: {
        textDecoration: 'none'
    },
    button: {
        margin: '10px'
    }
}));

export default function FlatDetail(props) {
    const id = props.match.params.id;
    const classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(
        () => {
            axios
                .get(`http://localhost:5000/flatDataId?id=${id}`)
                .then((res) => {
                    setData([res.data]);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [id]
    );

    console.log(data, data.length);
    return (
        <Grid container className={classes.root} spacing={2} justify="center">
            <h1>Flat Detail</h1>

            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item container lg={6}>
                        <Paper className={classes.paper}>
                            {data.length !== 0 ? (
                                <Grid>
                                    <h3>Flat No.:{data[0].flatNumber}</h3>
                                    <h3>No. of Residents:{data[0].residents.length}</h3>
                                    {data.length > 0 ? (
                                        data[0].residents.map((a) => (
                                            <Grid>
                                                <h5>name:{a.name}</h5>
                                                <h5>Gender:{a.gender}</h5>
                                                <h5>Age:{a.age}</h5>
                                            </Grid>
                                        ))
                                    ) : null}
                                </Grid>
                            ) : null}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>

            <Link to={'/'} className={classes.link}>
                <Button variant="contained" color="dark">
                    Go Back
                </Button>
            </Link>
        </Grid>
    );
}
