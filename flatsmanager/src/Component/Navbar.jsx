// import React from 'react'
import { Link } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../Redux/AuthReducer/action"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flex: 1
  },
  buttonNavbar: {
    padding: 10
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function Navbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch()

  const handleRouteChange = (to) => {
    history.push(to);
  };

  const { isAuth } = useSelector((state) => state.app);

  const handleLogout = () => {
    alert("Do you Want to LogOut?")
    dispatch(logout())
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            edge="start"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            <Link style={{ color: "white", textDecoration: "none" }} to="/dashboard"><i class="fa fa-home h3 m-1" aria-hidden="true"></i>
Apartment Flats Manager<i class="fa fa-home h3 m-1" aria-hidden="true"></i>
            </Link>
          </Typography>
          <IconButton color="inherit">
            <Typography
              className={classes.buttonNavbar}
              variant="h6"
              color="inherit"
            >
              {
                !isAuth ? (
                  <Link style={{ color: "white", textDecoration: "none" }} to="/Login">Login</Link>
                ) : (
                    <div className="text-danger font-weight-bolder bg-white" onClick={handleLogout}><i class="fa fa-sign-out" aria-hidden="true"></i>
                    </div>
                  )
              }
            </Typography>
          </IconButton>
          <IconButton color="inherit">
            <Typography
              className={classes.buttonNavbar}
              variant="h6"
              color="inherit"
            >
              {
                !isAuth ? (
                  <Link style={{ color: "white", textDecoration: "none" }} to="/Register">Sign up</Link>
                ) : (
                    null
                  )
              }
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="subtitle1"> <i class="fa fa-home display-1 m-1 text-primary" aria-hidden="true"></i> </Typography>
        </div>
        <Divider />
        <List >
          {[
            {
              text: "Dashboard",
              icon: <DashboardIcon />,
              to: "/dashboard"
            },
            {
              text: "Manager Panel",
              icon: <AssignmentIcon />,
              to: "/admin"
            },
          ].map((item) => (
            <ListItem
              onClick={() => handleRouteChange(item.to)}
              button
              key={item.text}
            >
              <ListItemIcon> {item.icon} </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.contentHeader} />
        {props.children}
      </main>
    </div>
  );
}

export default Navbar;
