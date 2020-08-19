import React from 'react';
import classes from './NavigationItem.css';

const NavigationItem =(props)=>(
    <li className = {classes.NavigationItem}>
        <a href={props.link} >
            {props.children}
        </a>
    </li>
);
export default NavigationItem;