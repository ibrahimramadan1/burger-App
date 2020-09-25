import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems' ;
import ToggleButton from '../SideDrawer/ToggleButton/ToggleButton';
   
const Toolbar=(props)=>{
    return(
        <header className={classes.Toolbar}>
            <ToggleButton toggle={props.toggle}/>
            <Logo/>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
}
export default Toolbar;