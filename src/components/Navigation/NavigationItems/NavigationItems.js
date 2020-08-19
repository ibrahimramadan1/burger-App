import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems =(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        <NavigationItem link='/'>CheckOut</NavigationItem>
    </ul>
);
export default NavigationItems;