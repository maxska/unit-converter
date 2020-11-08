import React from 'react';
import { Link } from "react-router-dom";
//======================    Files    ========================//
import './style/QuantityListElement.css'; 
//===========================================================//


const QuantityListElement = props =>
{
  //props.quantity is set in App.js, e.g. "length":
  let quantity = props.quantity; 

  // Makes the first character of the string s uppercase:
  const makeTitle = s =>
  {
    return s[0].toUpperCase() + s.substring(1, s.length);
  }

  return(
    <Link to={"/converter/" + quantity}>
      <div className="quantity-list-element" key={quantity}>

        <img src={require("../images/" + quantity + "-icon.png")} alt={quantity + " icon"}/>

        <p>{makeTitle(quantity)}</p>

      </div>
    </Link>
  );
}
export default QuantityListElement;
