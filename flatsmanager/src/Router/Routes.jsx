import React from 'react'
import { Route, Switch } from "react-router-dom"
import Navbar from '../Component/Navbar'
import Login from './Login'
import Register from './Register'
import PrivateRoutes from "./PrivateRoutes"
import Home from './Home'
import FlatDetail from './FlatDetail'


function Routes() {
    return (
        <>
            <Route path="/" render={() => <Navbar />} />
            <Switch>
                <Route path="/" exact render={() => <Home />} />
                <Route path="/Login" render={(props) => <Login {...props} />} />
                <Route path="/Register" render={() => <Register />} />
                <Route path="/dashboard" exact render={() => <Home />} />
                <Route path="/dashboard/:id" exact render={(props) => <FlatDetail {...props} />} />
                <PrivateRoutes />
                <Route render={() => <div>Error:404 page not found</div>} />
            </Switch>
        </>
    )
}
export { Routes }