import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

//===========================================================//
//===========================================================//
//======================    Files    ========================//
//import './App.css';
import './Converter.css';
import all_units_array from "./units.json";
//===========================================================//
//===========================================================//
//=====================    Components    ====================//
import UnitSelector from "./UnitSelector.js";
//===========================================================//
//===========================================================//
//===========================================================//

import back_icon from "./images/back-icon.png";
import swap_icon from "./images/swap-icon.png";


const Converter = () =>
{
  //type is e.g. "length":
  let {type} = useParams();

  //console.log("all_units_array:");
  //console.log(all_units_array);


  //same as https://www.w3schools.com/jsref/jsref_filter.asp 
  //but i use arrow function instead

  //units_filtered contains units of the selected type, eg "length":
  let units_filtered = all_units_array.filter(u => u.type === type); 
  //the "type" to the right is "type" in the scope of this funtion, u.type is in units.json

  //===========================================================//


  //let [unit1, setUnit1] = useState( units_filtered[0].name.toString() ); 
  let [unit1, setUnit1] = useState( units_filtered[0].name ); 
  let [unit2, setUnit2] = useState( units_filtered[1].name );

  const changeValue1 = e =>
  {
    console.log("------------------");
    console.log("e = " + e);
    setUnit1(e);
    console.log("unit1 = " + unit1);
  }

  const changeValue2 = e =>
  {
    console.log("------------------");
    console.log("e = " + e);
    setUnit2(e);
    console.log("unit2 = " + unit2);
  }

  let getUnitByName = inName =>
  {
    return units_filtered.find(u => u.name === inName);
  }

  const swap = () =>
  {
    alert("swap called");
  }


  return(
    <div id="return-converter">

      <div id="header">

        <Link to="/">
          <img src={back_icon} id="back-icon"/>
        </Link>

        <p>Converting: {type}</p>
      </div>

      <div className="unit-selector-box">
        <input type="text" size="5"/>
        <UnitSelector units={units_filtered} val={unit1} onChangeValue={changeValue1} />
      </div>

      <img src={swap_icon} onClick={swap} id="swap-icon"/>

      <div className="unit-selector-box">
        <input className="test" type="text" size="5"/>
        <UnitSelector units={units_filtered} val={unit2} onChangeValue={changeValue2} />
      </div>

    </div>
  );
}
export default Converter;
