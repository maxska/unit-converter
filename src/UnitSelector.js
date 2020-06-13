import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

//===========================================================//
//===========================================================//
//======================    Files    ========================//
import './UnitSelector.css';
//===========================================================//
//===========================================================//
//=====================    Components    ====================//

//===========================================================//
//===========================================================//
//===========================================================//


const UnitSelector = props =>
{
  // https://reactjs.org/docs/hooks-intro.html :
  let [dropdownIsOpen, setDropdown] = useState(false);
  let [dynamicBgC, setDynamicBgC] = useState("#3c4552");
  let [dynamicColor, setDynamicColor] = useState("white");
  let [icon, setIcon] = useState("down");

  const toggleDropdown = () =>
  {
    if(dropdownIsOpen)
    {
      setDropdown(false);
      setDynamicBgC("#3c4552");
      setDynamicColor("white");
      setIcon("down");
    }
    else
    {
      setDropdown(true);
      setDynamicBgC("white");
      setDynamicColor("black");
      setIcon("up");
    }
  }


  const clickLink = input =>
  {
    //updates in Converter.js:
    props.onChangeValue(input);

    toggleDropdown();
  }


  const DropdownLink = props2 => 
  {
  /*lösningen är att ha () => här, då kan man skicka in argument 
  i önskad funktion utan att funktionen kallas på från parent... */
    return(
      <div className="dropdown-link" onClick={() => clickLink(props2.name)}> 
        <p>
          {props2.name}
        </p> 
      </div>
    );
  }


  const Dropdown = props1 =>
  {
    return(
      <div className="dropdown">
      {
        props1.units.map(u => (<DropdownLink name={u.name}/>))
      }
      </div>
    );
  }


  const dynamicStyle = 
  {
    backgroundColor: dynamicBgC,
    color: dynamicColor
  }
  

  return(
    <div className="unit-container">

      <div className="unit-button" style={dynamicStyle} onClick={toggleDropdown}>
        <p>{props.val}</p>
        <img src={require("./images/" + icon + "-icon.png")} className="down-icon"/>
      </div>  

      {
        //if dropdownIsOpen == true, the component below will be shown
        dropdownIsOpen
        &&
        <Dropdown units={props.units} />
      }

      {
        console.log("Updated immediately in UnitSelector.js: " + props.val)
      }

    </div>
  );
}
export default UnitSelector;
