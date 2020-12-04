import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { deleteflate, handleState } from '../Redux/FlatReducer/actions'

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
  const history = useHistory()
  const dispatch = useDispatch()
  const isDelete = useSelector(state => state.flat.isDelete)

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

  const handleDelete = (id) => {
    dispatch(deleteflate({ id }))
  }

  useEffect(() => {
    if (isDelete) {
      alert("Deleted Successfully")
      dispatch(handleState())
      history.push("/")
    }
  }, [isDelete, dispatch, history, data.flatNumber])

  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="text-dark"><span className="text-primary">welcome</span> {user.admin.name}</h4>
        </div>
        <div className="col">
          <Link to={`/flat`} className={classes.link}>
            <Button variant="contained" color="dark">
              Add More Data
            </Button>
          </Link>
        </div>
      </div>

      <div className="row d-flex flex-column">
        <h1> apartment Details</h1>
        <div className="mx-auto justify-content-center ">
          {
            data.length > 0 ? (
              data.map((item) => (
                <div key={item._id} style={{ border: "4px solid grey" }}>
                  <div className="row d-flex mx-auto p-3  bg-primary ">
                    <span className="flex-1 font-weight-bold ml-5">apartment:{item.apartment}</span>
                    <span className="flex-1 font-weight-bold ml-5">flatNumber:{item.flatNumber}</span>
                    <span className="flex-1 font-weight-bold ml-5">type:{item.type}</span>
                    <span className="flex-1 font-weight-bold ml-5">No. of Residents:{item.residents.length}</span>
                  </div>
                  <h3>Residents Details</h3>
                  <table class="table">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                      </tr>
                    </thead>
                    {item.residents.length > 0 ? (
                      item.residents.map((a) => (
                        <tbody>
                          <tr>
                            <td>{a.name}</td>
                            <td>{a.gender}</td>
                            <td>{a.age}</td>
                          </tr>
                        </tbody>
                      ))

                    ) : null}
                  </table>

                  <div className="row mb-3">
                    <div className="col">
                      <Link to={`/edit/${item._id}`} data={item} className={classes.link}>
                        <Button variant="contained" color="dark">
                          Edit
                      </Button>
                      </Link>
                    </div>
                    <div className="col">
                      <button className="btn btn-danger px-5" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
        </div>
      </div>
      <hr />
      <Link to={'/'} className={classes.link}>
        <Button variant="contained" color="dark">
          Go Back
                </Button>
      </Link>
    </>
  );
}
