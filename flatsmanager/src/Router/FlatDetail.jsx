import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
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
        <>
            {data.length !== 0 ? (
                <div style={{ margin: "0 20%" }}>
                    <h3>Flat No.:{data[0].flatNumber}</h3>
                    <h3>No. of Residents:{data[0].residents.length}</h3>
                    <table class="table">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Age</th>
                            </tr>
                        </thead>
                        {data.length > 0 ? (
                            data[0].residents.map((a) => (
                                <tbody>
                                    <tr>
                                        <td>{a.name}</td>
                                        <td>{a.gender}</td>
                                        <td>{a.age}</td>
                                    </tr>
                                </tbody>
                            ))
                        ) : "No Member"}
                    </table>
                </div>
            ) : "No Member"}
        </>
    );
}
