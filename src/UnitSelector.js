import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

//===========================================================//
//===========================================================//
//======================    Files    ========================//
import './UnitSelector.css';
import down_icon from "./images/down-icon.png";
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



  let [clickedStyle, setClickedStyle] = useState("blue");

  const toggleDropdown = () =>
  {
    if(dropdownIsOpen)
    {
      setDropdown(false);
      setClickedStyle("blue");
    }
    else
    {
      setDropdown(true);
      setClickedStyle("#8f8f8f");
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
        props1.units.map(u => (<DropdownLink name={u.name}/>) )
      }
      </div>
    );
  }



  return(
    <div className="unit-container">

      <div className="unit-button" style={{backgroundColor: clickedStyle}} onClick={toggleDropdown}>
        <p>{props.val}</p>
        <img src={down_icon} className="down-icon"/>
      </div>  

      {
        //if dropdownIsOpen == true, the component below will be shown
        dropdownIsOpen
        &&
        <Dropdown units={props.units} />
      }


      {
        /*
        <p>Updated immediately: props.val = {props.val}</p>
        */
        console.log("Updated immediately in UnitSelector.js: " + props.val)
      }

    </div>
  );
}
export default UnitSelector;
