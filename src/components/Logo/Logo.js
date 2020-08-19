import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assests/images/Logo.png';

const Logo =(props)=>
(

    <div className={classes.Logo}>
        <img src={burgerLogo} alt='Happy Burger'/>
    </div>
);
export default Logo;