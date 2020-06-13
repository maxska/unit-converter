import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

//===========================================================//
//===========================================================//
//======================    Files    ========================//
import './QuantityListElement.css'; 

//===========================================================//
//===========================================================//
//=====================    Components    ====================//

//===========================================================//
//===========================================================//
//===========================================================//



const QuantityListElement = props =>
{
  let quantity = props.quantity;

  const makeTitle = s =>
  {
    return s[0].toUpperCase() + s.substring(1, s.length);
  }

  return(
    <Link to={"/converter/" + quantity}>
      <div className="quantity-list-element">

        <img src={require('./images/' + quantity + '-icon.png')} />

        <p>{makeTitle(quantity)}</p>

      </div>
    </Link>
  );
}
export default QuantityListElement;
