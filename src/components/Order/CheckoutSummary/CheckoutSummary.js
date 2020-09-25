import React from 'react';
import Burger from '../../burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const CheckoutSummary=(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope U like our burger !!</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Success' clicked={props.checkoutContinued}>Continue</Button>
            <Button btnType='Danger' clicked={props.checkoutCanceled}>Cancel</Button>
        </div>

    );
}
export default CheckoutSummary;