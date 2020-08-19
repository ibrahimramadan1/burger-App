import React ,{Component}from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';
class BurgerIngredients extends Component{
    render(){
        let Ingredient = null;
        switch (this.props.type) {
            case ('bread-bottom'):
                Ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                Ingredient = <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>;
                break;
            case ('meat'):
                Ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                Ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('salad'):
                Ingredient = <div className={classes.Salad}></div>;
                break;
            default:
                break;
    
        }
        return Ingredient;
    }
}
BurgerIngredients.propTypes={
    type:PropTypes.string.isRequired
}
export default BurgerIngredients;