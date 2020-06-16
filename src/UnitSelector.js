import React, { useState } from 'react';
//======================    Files    ========================//
import './UnitSelector.css';
//===========================================================//


const UnitSelector = props =>
{
  // https://reactjs.org/docs/hooks-intro.html :
  let [dropdownIsOpen, setDropdown] = useState(false);
  let [dynamicBgC, setDynamicBgC] = useState("#3c4552");
  let [dynamicColor, setDynamicColor] = useState("white");
  let [icon, setIcon] = useState("down");

  // Function for toggling the dropdown unit list. Changes states depending on 
  //  whether the dropdown is open, including style for the button:
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

  // Returns the object in the array of filtered units (from the JSON file)
  //  that has the same name as inName:
  let getShortName = name =>
  {
    let shortName = props.units.find(u => u.name === name).shortName;

    if(shortName.includes("^"))
    {

      let split = shortName.split("^");
      return <span>{split[0]}<span className="sup">{split[1]}</span></span>;
    }
    else
    {
      return shortName;
    }
  }


  // Handles what happens when an item in the dropdown unit list is clicked:
  const clickLink = input =>
  {
    //updates in Converter.js, calles a function through the attribute of
    // "onChangeValue" in Converter.js:
    props.onChangeValue(input);

    //close the dropdown menu:
    toggleDropdown();
  }


  // Renders the dropdown unit list, using map, with each element being of 
  //  the component DropdownLink. units, from props1, comes from props, 
  //  which comes from Converter.js, contains all units for the current quantity,
  //  and using map, each unit's name (u.name) is sent into DropdownLink as a prop, 
  //  and all DropdownLink elements are placed in the div with classname "dropdown", 
  //  because DropdownLink returns a component and map concatenates all those components.
  const Dropdown = () =>
  {
    return(
      <div className="dropdown">
      {
        props.units.map(u => (<DropdownLink name={u.name} key={u.name}/>))
      }
      </div>
    );
  }

  
  // Renders an item/link in the dropdown unit list.
  const DropdownLink = props2 => 
  {
    return(
      <div className="dropdown-link" onClick={() => clickLink(props2.name)}> 
        <p>
          {props2.name} ({getShortName(props2.name)})
        </p> 
      </div>
    );
  }


  // An object for dynamic style, used by a div element in return below. The
  //  style (dynamicBgC and dynamicColor) is set through states above.
  const dynamicStyle = 
  {
    backgroundColor: dynamicBgC,
    color: dynamicColor
  }
  

  return(
    <div className="unit-container">

      <div className="unit-button" style={dynamicStyle} onClick={toggleDropdown}>
        <p>{props.selectedUnit} ({getShortName(props.selectedUnit)})</p>
        <img src={require("./images/" + icon + "-icon.png")} className="down-icon" alt="expand"/>
      </div>  

      {
        //if dropdownIsOpen == true, the component below will be shown
        dropdownIsOpen
        &&
        <Dropdown/>
      }

    </div>
  );
}
export default UnitSelector;
