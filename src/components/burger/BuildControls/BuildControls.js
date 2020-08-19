import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'}
];
const BuildControls=(props)=>{
    
    
    return (<div className={classes.BuildControls}>
      <p>this Cost: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(obj=>{return <BuildControl key={obj.label} label={obj.label}
      added={()=>props.ingredientAdded(obj.type)}
      removed={()=>props.ingredientRemoved(obj.type)}
      disabled={props.disabled[obj.type]}/>;})}
      <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchasing}>Order Now!!</button>
    </div>);
}
export default BuildControls;