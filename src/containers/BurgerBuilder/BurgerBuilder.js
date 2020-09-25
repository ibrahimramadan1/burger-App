import React, { Component } from 'react';
import Aux from "../../hoc/Aux"
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerSummary from '../../components/burger/BurgerSummary/BurgerSummary';
import axios from '../../Axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/actions';
import { connect } from 'react-redux';

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
    }


    isPurchasable = (ingredients) => {
        let sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey]; })
            .reduce((sum, el) => { return sum + el }, 0);
        return sum > 0;

    }
    turnPurchasing = () => {
        if (this.props.isAuth) {
            this.setState(
                {
                    purchasing: true
                }
            );
        } else {
            this.props.changeRedirect('/checkout');
            this.props.history.push('/auth');
        }
    }
    cancelPurchacing = () => {

        this.setState(
            {
                purchasing: false
            }
        );
    }
    completePurchacing = () => {
        this.props.initPurchasing();
        this.props.history.push('/checkout');
    }
    componentDidMount() {
        this.props.initIngredients();

    }



    render() {
        let burger = this.props.error ? <p>Something Went Wrong</p> : <Spinner />;
        let orderSummary;


        const disablingButtons = { ...this.props.ings };
        for (let obj in disablingButtons) {
            disablingButtons[obj] = (disablingButtons[obj] <= 0);
        }
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.ingredientAdded}
                        ingredientRemoved={this.props.ingredientRemoved}
                        disabled={disablingButtons}
                        price={this.props.price}
                        purchasable={this.isPurchasable(this.props.ings)}
                        purchasing={this.turnPurchasing}
                        isAuth={this.props.isAuth} />
                </Aux>);
            orderSummary = <BurgerSummary
                price={this.props.price}
                ingredients={this.props.ings}
                purchaseFailed={this.cancelPurchacing}
                purchaseSucceded={this.completePurchacing} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchacing}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuth: state.authReducer.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        ingredientAdded: (name) => dispatch(actions.addIngredient(name)),
        ingredientRemoved: (name) => dispatch(actions.removeIngredient(name)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchasing: () => dispatch(actions.initPurchasing()),
        changeRedirect: (path) => dispatch(actions.changeRedirect(path)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));