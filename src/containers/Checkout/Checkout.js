import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class Checkout extends Component {

    checkoutCanceled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact');
    }
    render() {
        let summary = <Redirect to='/' />;
        let purchased = this.props.purchased ? <Redirect to='/' /> : null;
        if (this.props.ings) {
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceled}
                        checkoutContinued={this.checkoutContinued} />
                    <Route
                        path={this.props.match.path + '/contact'}
                        component={Contact}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        purchased: state.orderReducer.purchased
    };
};
export default connect(mapStateToProps)(Checkout);