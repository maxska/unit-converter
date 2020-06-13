import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

//===========================================================//
//===========================================================//
//======================    Files    ========================//
import './App.css';
//===========================================================//
//===========================================================//
//=====================    Components    ====================//
import QuantityListElement from "./QuantityListElement.js";
import Converter from "./Converter.js";
//===========================================================//
//===========================================================//
//===========================================================//

const Startpage = () =>
{
  return(
    <div className="startpage">

      <div className="upper">
        <p>Unit Converter</p>
      </div>

      <div className="lower">
        <QuantityListElement quantity="length"/>
        <QuantityListElement quantity="weight"/>
        <QuantityListElement quantity="temperature"/>
      </div>

    </div>
  );
}

const App = () =>
{
  return(

    <Router>
      <div>

        <Switch>

          <Route exact path="/">
            <Startpage />
          </Route>

          <Route path="/converter/:type" component={Converter} />

        </Switch>

      </div>
    </Router>

  );
}
export default App;
