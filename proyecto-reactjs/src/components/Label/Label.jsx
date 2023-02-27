import React from "react";
import './Label.scss'
 
const Label = ({text}) => {
    return(
        <div>
            <label> {text} </label>
        </div>
    )
};

export default Label;