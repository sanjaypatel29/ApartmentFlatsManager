import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

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

export default function AdminPanel(props) {
  const { user } = useSelector((state) => state.app);
  console.log(user.admin.apartment);

  const apartment = user.admin.apartment;
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(
    () => {
      axios
        .get(`http://localhost:5000/flats/all?apartment=${apartment}`)
        .then((res) => setData(res.data.data))
        .catch((error) => {
          console.log(error);
        });
    },
    [apartment]
  );

  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="text-dark"><h3>welcome</h3>{user.admin.name}</h4>
        </div>
        <div className="col">
          <button type="button" class="btn btn-primary btn-lg">Add Data</button>
        </div>
      </div>
      <div className="row d-flex flex-column">
        <h1> apartment Detail</h1>
        <div className="mx-auto justify-content-center">
          {
            data.length > 0 ? (
              data.map((item) => (
                <div key={item._id} className="border border-primary">
                  <div className="row d-flex mx-auto ">
                    <h3 className="flex-1 ml-5">apartment:{data[0].apartment}</h3>
                    <h3 className="flex-1 ml-5">flatNumber:{data[0].flatNumber}</h3>
                    <h3 className="flex-1 ml-5">type:{data[0].type}</h3>
                    <h3 className="flex-1 ml-5">No. of Residents:{data[0].residents.length}</h3>
                  </div>
                  <hr />
                  <h3>Residents Details</h3>
                  {data.length > 0 ? (
                    data[0].residents.map((a) => (
                      <div>
                        <h5>name:{a.name}</h5>
                        <h5>gender:{a.gender}</h5>
                        <h5>age:{a.age}</h5>
                      </div>
                    ))
                  ) : null}
                  <div className="row">
                    <div className="col">
                      <button type="button" class="btn btn-primary btn-lg">Edit</button>
                    </div>
                    <div className="col">
                      <button type="button" class="btn btn-primary btn-lg">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
        </div>

        <Link to={'/'} className={classes.link}>
          <Button variant="contained" color="dark">
            Go Back
                </Button>
        </Link>

      </div>
    </>
  );
}
