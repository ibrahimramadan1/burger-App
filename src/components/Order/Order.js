import React from 'react';
import classes from './Order.css';
const Order =(props)=>{
    const ingredients=[];
    for (let ingredient in props.ingredients){
        ingredients.push(
            {
                name: ingredient,
                amount: props.ingredients[ingredient]
            }
        );
    }

    const out=ingredients.map(ig=>{
    return <span key={ig.name}
            style={{textTransform:'capitalize',
                    display:'inline-block',
                    margin:'0 5px',
                    border:'1px solid #eee',
                    padding:'3px'}}>
                {ig.name} ({ig.amount})</span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {out}</p>
    <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}
export default Order;