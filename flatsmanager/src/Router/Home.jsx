import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '10px'
    },
    paper: {
        padding: '20px 20px 20px 20px',
        width: '90%',
        paddingBottom: '60px',
        borderRadius: '15px',
        background: '#fafdff',
        alignItems: 'center',
        boxShadow: '20px 20px 64px #dadcde ,-20px -20px 64px #ffffff'
    },
    control: {
        padding: theme.spacing(2)
    },
    button: {
        width: '60%',
        height: '40px',
        marginLeft: '-100px',
        marginTop: '10px',
    },
    mainGrid: {
        marginTop: '40px',
        marginBottom: '40px'
    },
    formControl: {
        width: '100%'
    },
    link: {
        textDecoration: 'none'
    }
}));
export default function Home(props) {
    const [data, setdata] = useState([]);
    const [temp, setTemp] = useState([]);
    const [params, setParams] = useState({ flatNumber: '', type: '', page: 1, perPage: 5 });
    const classes = useStyles();
    let totalPages = Math.ceil(temp.length / params.perPage);
    const array = new Array(totalPages).fill(0);
    useEffect(
        () => {
            axios.get('http://localhost:5000/flats/all').then((res) => setTemp(res.data.data));
            axios
                .get(
                    `http://localhost:5000/flats/all?page=${params.page}&limit=${params.perPage}&flatNumber=${params.flatNumber}&type=${params.type}`
                )
                .then((res) => setdata(res.data.data));
            axios
                .get(
                    `http://localhost:5000/flat/search`
                )
                .then((res) => setdata(res.data.data));
        },
        [params.page, params.perPage, params.flatNumber, params.type]
    );
    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };
    console.log(data, params);
    return (
        <Grid container className={classes.root} spacing={2} justify="center">
            <Grid item container lg={12} className={classes.mainGrid}>
                <Grid item container lg={3}></Grid>
                <Grid item container lg={6}>
                    <Grid item container lg={6}>
                        <Grid container item lg={4} sm={2} xs={2}>
                            <h4>Sort by flatNumber:</h4>
                        </Grid>
                        <Grid container item lg={8} sm={5} xs={10}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">flatNumber</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    name="flatNumber"
                                    onChange={handleChange}
                                    label="flatNumber"
                                    value={params.flatNumber}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    <MenuItem value="asc">Ascending Order</MenuItem>
                                    <MenuItem value="desc">Descending Order</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container lg={3} />
                    <Grid item container lg={3}>
                        <Grid container item lg={4} sm={2} xs={2}>
                            <h4>Filter:</h4>
                        </Grid>
                        <Grid container item lg={8} sm={5} xs={10}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    name="type"
                                    onChange={handleChange}
                                    label="type"
                                    value={params.type}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="owner">owner</MenuItem>
                                    <MenuItem value="tenant">tenant</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Grid container justify="center" spacing={2}>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <Grid key={item._id} item lg={12} justify="center">
                                <Paper className={classes.paper}>
                                    <h3>Flat No.:{item.flatNumber}</h3>
                                    <h3>No. of Residents:{item.residents.length}</h3>
                                    <Link to={`dashboard/${item._id}`} className={classes.link}>
                                        <Button variant="contained" color="dark">
                                            More Details
                                            </Button>
                                    </Link>
                                </Paper>
                            </Grid>
                        ))
                    ) : null}
                </Grid>
                <Grid item container lg={12} justify="center">
                    {array.map((a, index) => (
                        <Button
                            className={classes.mainGrid}
                            key={index}
                            value={index + 1}
                            variant="contained"
                            style={{ marginLeft: '10px' }}
                            color="primary"
                            onClick={(e) => setParams({ ...params, page: index + 1 })}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}


