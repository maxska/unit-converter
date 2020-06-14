import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//======================    Files    ========================//
import './App.css';
//=====================    Components    ====================//
import QuantityListElement from "./QuantityListElement.js";
import Converter from "./Converter.js";
//===========================================================//


// I have this small component in this file. 
// Startpage is a component with the startpage, containing links to 
//  the different converters in the app.
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

// This is the thing that handles everything being shown. Depending on the path
//  in the address bar, the Switch decides which component will be shown.
// E.g. in the case of "/converter/:type" (e.g. "/converter/length"), the 
//  lower Route will be matching with the path, and the component Converter will
//  be shown. the ":type" part is used in Converter as "let {type} = useParams();"
//  and it can be used inside that component.
const App = () =>
{
  // https://reacttraining.com/react-router/web/guides/quick-start

  return(

    <Router>
        <Switch>

          <Route exact path="/">
            <Startpage />
          </Route>

          <Route path="/converter/:type" component={Converter} />

        </Switch>
    </Router>

  );
}
export default App;
