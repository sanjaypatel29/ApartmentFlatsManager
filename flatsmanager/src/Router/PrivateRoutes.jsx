import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminPanel from './AdminPanel'
import { useSelector } from 'react-redux';
import { AddFlates } from "./AddFlates";
import Edit from "./Edit";

export default function PrivateRoutes() {

  const { isAuth } = useSelector((state) => state.app);
  console.log(isAuth);
  return (
    <>
      {
        !isAuth ? (
          <Redirect to="/Login" />
        ) : (
            <switch>
              <Route path="/admin" render={() => <AdminPanel />} />
              <Route path="/flat" render={() => <AddFlates />} />
              <Route path="/edit/:id" exact render={(props) => <Edit {...props} />} />
            </switch>
          )
      }

    </>
  );

};
