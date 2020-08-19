import React from 'react';
import classes from './ToggleButton.css'
const ToggleButton=(props)=>{
    return(
        <div className={classes.DrawerToggle} onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
export default ToggleButton;