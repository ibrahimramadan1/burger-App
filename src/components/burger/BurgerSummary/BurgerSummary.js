import React,{Component} from 'react';
import Aux from '../../../hoc/Aux'
import classes from './BurgerSummary.css'
import Button from '../../UI/Button/Button'
class BurgerSummary extends Component{
    render(){
        let ordreSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
                        : {this.props.ingredients[igKey]}
            </li>);
        });
        return(
            <Aux>
            <h3 className={classes.BurgerSummary}>Your Order</h3>
            <p>Your Burger contains : </p>
            <ul>
                {ordreSummary}
            </ul>

            <p><strong>this Cost : ${this.props.price}</strong></p>
            <Button btnType="Success" clicked={this.props.purchaseSucceded}>CONTINUE</Button>
            <Button btnType="Danger" clicked={this.props.purchaseFailed}>CANCEL</Button>

        </Aux>
        );
    }
}
export default BurgerSummary;