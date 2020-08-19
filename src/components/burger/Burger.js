import React from 'react';
import classes from './Burger.css';
import Ingredient from './BurgerIngredients/BurgerIngredients'
const Burger=(props)=>{
    let transIngredients=Object.keys(props.ingredients)
    .map(igkey=>{
        return [...Array(props.ingredients[igkey])]
        .map((_,i)=>{
            return <Ingredient key={igkey + i} type={igkey}/>
        });
    }).reduce((arr,el)=>{return arr.concat(el)},[]); 
    if(transIngredients.length===0)
        transIngredients=<p>Add your ingredients</p>;
    return(
        <div className={classes.Burger}>
            <Ingredient type="bread-top"/>
            {transIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
}
export default Burger;