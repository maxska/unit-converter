import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

//===========================================================//
//===========================================================//
//======================    Files    ========================//
//import './App.css';
import './Converter.css';
import units from "./units.json";
import si_prefixes from "./units-si-prefixes.json";
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

  //console.log("units:");
  //console.log(units);


  // https://www.w3schools.com/jsref/jsref_filter.asp 

  //units_filtered contains units of the selected type, eg "length":
  let units_filtered = units.filter(u => u.type === type); 
  //the "type" to the right is "type" in the scope of this funtion, u.type is in units.json


  //===========================================================//


  let [unit1, setUnit1] = useState(units_filtered[0].name); 
  let [unit2, setUnit2] = useState(units_filtered[1].name);

  const changeUnit = (number, e) =>
  {
    //alert("number = "+ number);
    //alert("e = " + e);

    if(number === 1)
      setUnit1(e);
    else
      setUnit2(e);
  }

  let getUnitByName = inName =>
  {
    return units_filtered.find(u => u.name === inName);
  }

  const swap = () =>
  {
    let fromElement = document.getElementById("from-box");
    let toElement = document.getElementById("to-box");
    let temp;

    temp = fromElement.value;
    fromElement.value = toElement.innerHTML;
    toElement.innerHTML = temp;

    temp = unit1;
    setUnit1(unit2);
    setUnit2(temp);
  }

  const convert = () =>
  {
    let fromElement = document.getElementById("from-box");
    let toElement = document.getElementById("to-box");
    let convConst = 1; //conversion constant

    //let from = fromElement.value;

    if(isNaN(fromElement.value) || fromElement.value.length == 0)
    {
      toElement.innerHTML = "";
      return;
    }

    //toElement.value = from;

    let fromUnit = getUnitByName(unit1);
    let toUnit = getUnitByName(unit2);

    
    if(fromUnit.siPrefix != null) //the "unit" in "from" has a prefix to a "main" unit:
    {
      let foundPrefix = si_prefixes.find(prefix => prefix.name === fromUnit.siPrefix);

      convConst *= foundPrefix.value;

      //alert(fromUnit.name);
      fromUnit = getUnitByName(fromUnit.belongsTo);
      //alert(fromUnit.name);
    }

    if(toUnit.siPrefix != null) //the "unit" in "to" has a prefix to a "main" unit:
    {
      let foundPrefix = si_prefixes.find(prefix => prefix.name === toUnit.siPrefix);

      convConst /= foundPrefix.value;

      toUnit = getUnitByName(toUnit.belongsTo);
    }

    if(fromUnit.name == toUnit.name)
    {
      //do nothing
    }
    else if(fromUnit.conversions[toUnit.name] == null)
    {
      alert("conversion data missing...");
      return;
    }
    else
    {
      convConst = convConst * fromUnit.conversions[toUnit.name];
    }

    toElement.innerHTML = fromElement.value * convConst;
  }


  return(
    <div id="return-converter">

      <div id="header">
        <Link to="/">
          <img src={back_icon} id="back-icon"/>
        </Link>

        <p><span>Unit Converter:</span> {type}</p>
      </div>

      <p className="label">From:</p>
      <div className="unit-selector-box">
        <input id="from-box" className="ioBox input" type="text" size="5" onChange={convert}/>
        <UnitSelector units={units_filtered} val={unit1} onChangeValue={e => changeUnit(1, e)} />
      </div>
      
      <div className="centered">
        <img src={swap_icon} onClick={swap} id="swap-icon"/>
      </div>
      
      <p className="to-label label">To:</p>
      <div className="unit-selector-box">
        <p id="to-box" className="ioBox output"></p>
        <UnitSelector units={units_filtered} val={unit2} onChangeValue={e => changeUnit(2, e)} />
      </div>

    </div>
  );
}
export default Converter;
