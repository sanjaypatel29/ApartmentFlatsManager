import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import { login } from "../Redux/AuthReducer/action";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleChange = (e) => {
    let value = e.target.value;
    this.setState({
      [e.target.name]: value
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.loginRequest({ email, password })
  };


  render() {
    const { email, password } = this.state;
    const { isLoading, loginErr, isAuth } = this.props;


    return (
      <>
        {
          isAuth ? (
            <Redirect to={{ pathname: "/admin" }} />
          ) :

            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div>
                <Avatar style={{ marginLeft: "45%", color: "white", background: "blue" }} >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
        </Typography>
                <form noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    autoFocus
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={this.handleChange}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                  >
                    Sign In
          </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
              </Link>
                    </Grid>
                    <Grid item>
                      <Link href="http://localhost:3000/Register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8}>
              </Box>
            </Container>
        }
        <div>{isLoading && "...LOADING"}</div>
        <div>{loginErr && loginErr}</div>
      </>
    );
  }
}



const mapStateToProps = (state) => ({
  isAuth: state.app.isAuth,
  loginErr: state.app.loginErr,
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => dispatch(login(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
