import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EditFlats } from './EditFlats';

export default function Edit(props) {
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

    console.log(data, data.length)

    if (data.length > 0) {
        return (
            <EditFlats data={data[0]} />
        );
    }
    else {
        return (
            <div>hi</div>
        );
    }

}
