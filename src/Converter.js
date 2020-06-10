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

  //hur ska jag lösa millimeter osv?
  //kanske genom att ha en "belongsTo" i json? där man på millimeter kan ha belongsTo=meter
  // men det går inte ty millimeter inte finns i json, utan bara milli.
  // man kan ha en funktion checkIfSub typ som kollar om name innehåller "milli", "deci", "kilo",
  // osv, och om den hittar det så kan den kolla vad resten av name innehåller, och då kanske
  // den hittar "meter", och då vet den att det är milli av just meter.....



  return(
    <div>

      <div id="header">
        <Link to="/">BACK TO HOME</Link>
        <h2>Converting: {type}</h2>
      </div>

      <UnitSelector units={units_filtered} val={unit1} onChangeValue={changeValue1} />

      <p style={{color: "white"}}>Convert to</p>

      <UnitSelector units={units_filtered} val={unit2} onChangeValue={changeValue2} />

    </div>
  );
}
export default Converter;
