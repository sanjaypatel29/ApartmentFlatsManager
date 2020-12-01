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
          <h4 className="text-dark"><h3>welcome</h3>{user.admin.name}</h4>
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
        <h1> apartment Detail</h1>
        <div className="mx-auto justify-content-center">
          {
            data.length > 0 ? (
              data.map((item) => (
                <div key={item._id} className="border border-primary">
                  <div className="row d-flex mx-auto ">
                    <h3 className="flex-1 ml-5">apartment:{item.apartment}</h3>
                    <h3 className="flex-1 ml-5">flatNumber:{item.flatNumber}</h3>
                    <h3 className="flex-1 ml-5">type:{item.type}</h3>
                    <h3 className="flex-1 ml-5">No. of Residents:{item.residents.length}</h3>
                  </div>
                  <hr />
                  <h3>Residents Details</h3>
                  {item.residents.length > 0 ? (
                    item.residents.map((a) => (
                      <div>
                        <h5>name:{a.name}</h5>
                        <h5>gender:{a.gender}</h5>
                        <h5>age:{a.age}</h5>
                      </div>
                    ))
                  ) : null}
                  <div className="row">
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

        <Link to={'/'} className={classes.link}>
          <Button variant="contained" color="dark">
            Go Back
                </Button>
        </Link>

      </div>
    </>
  );
}
