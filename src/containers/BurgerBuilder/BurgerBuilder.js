import React, { Component } from 'react';
import Aux from "../../hoc/Aux"
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import BurgerSummary from '../../components/burger/BurgerSummary/BurgerSummary'
const PRICES ={
    salad:0.5, 
    meat:5,
    cheese:2.5
};
 class BurgerBuilder extends Component {
    
    state ={
        ingredients:{
        salad:0, 
        meat:0,
        cheese:0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
}
    addingIngerdient=(type)=>{
        let newIngerdientNumber = this.state.ingredients[type]+1;
        const newIngerdients= {...this.state.ingredients};
        newIngerdients[type]=newIngerdientNumber;
        let newPrice=this.state.totalPrice+PRICES[type];
        this.setState({
            ingredients:newIngerdients,
            totalPrice:newPrice

            }
        );
        this.isPurchasable(newIngerdients);
        

    }

    removingIngerdient=(type)=>{
        if(this.state.ingredients[type]<=0)
            return;
        let newIngerdientNumber = this.state.ingredients[type]-1;
        const newIngerdients= {...this.state.ingredients};
        newIngerdients[type]=newIngerdientNumber;
        let newPrice=this.state.totalPrice-PRICES[type];
        this.setState({
            ingredients:newIngerdients,
            totalPrice:newPrice
        }
        );
        this.isPurchasable(newIngerdients);
        

    }
    isPurchasable=(ingredients)=>{
        let sum = Object.keys(ingredients)
                .map(igKey=>{return ingredients[igKey];})
                .reduce((sum,el)=>{return sum+el},0);
        this.setState(
            {
                purchasable: sum>0,
            }
        )
    }
    turnPurchasing=()=>
    {
        this.setState(
            {
                purchasing:true
            }
        );
    }
    cancelPurchacing=()=>{
        
        this.setState(
            {
                purchasing:false
            }
        );
    }
    completePurchacing=()=>{
        let  newIngredients={
            salad:0, 
            meat:0,
            cheese:0
        };

        this.setState({
            ingredients:newIngredients,
            totalPrice:4,
            isPurchasable:false,
            purchasing:false
        });
        alert('Happy Meal!');
    }
        
    
    render() {
        const disablingButtons={...this.state.ingredients};
        for (let obj in disablingButtons){
            disablingButtons[obj]= (disablingButtons[obj]<=0);
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchacing}>
                <BurgerSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseFailed={this.cancelPurchacing} 
                purchaseSucceded={this.completePurchacing}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addingIngerdient}
                ingredientRemoved={this.removingIngerdient}
                disabled={disablingButtons}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                purchasing={this.turnPurchasing}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;