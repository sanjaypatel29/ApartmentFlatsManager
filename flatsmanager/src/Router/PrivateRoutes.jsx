import React from "react";
import { Route, Redirect } from "react-router-dom";
import AdminPanel from './AdminPanel'
import { useSelector } from 'react-redux';

export default function PrivateRoutes() {

  const { isAuth } = useSelector((state) => state.app);
  console.log(isAuth);
  return (
    <>
      {
        !isAuth ? (
          <Redirect to="/Login" />
        ) : (
            <Route path="/admin" render={() => <AdminPanel />} />
          )
      }

    </>
  );

};
