import React, { useState } from "react"; 
import { FormCheck } from "react-bootstrap";

export default function UserMode(props) {
  const [isToggled, setToggled] = useState(false);
  const toggleTrueFalse = () => {setToggled(!isToggled); console.log(isToggled)}

return (
    <div className="col-sm-2 user-switch text-right">
       <FormCheck 
        id="switchEnabled"
        type="switch"
        onChange={toggleTrueFalse}
        label="User Mode"/>
        <div>You are in {isToggled? 'Customer': 'Admin'} Mode</div>
    </div>
   )
}