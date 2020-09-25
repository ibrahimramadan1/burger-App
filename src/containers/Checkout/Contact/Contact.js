import React, { Component } from 'react';
import classes from './Contact.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../Axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../../store/actions/actions';
class Contact extends Component {
    state = {
        form: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation:{
                    required:true
                },
                valid: false,
                touched: false,
                value: ''
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                validation:{
                    required:true
                },
                touched: false,
                valid: false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                validation:{
                    required:true
                },
                touched: false,
                valid: false,
                value: ''

            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code'
                },
                validation:{
                    required:true,
                    length:5
                },
                touched: false,
                valid: false,
                value: ''
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value:'fast' , displayValue: 'Fast'},
                        {value:'slow' , displayValue: 'Slow'}
                    ]
                },
                value: 'fast',
                validation:{},
                valid:true            
            }
        },
        loading: false,
        formIsValid:false
    }
    order = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        let customer={};
        for (let att in this.state.form)
        {
            customer[att]=this.state.form[att].value;
        }
        let order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: customer,
            userId:this.props.userId
        };
        this.props.onPurchasing(order,this.props.token);
        
    }
    checkValidation=(value,rules)=>{
            let valid=true;
            if (rules.required)
            {
                valid = value.trim() !=='' && valid;
            }
            if (rules.length)
            {
                valid = (value.length === rules.length) && valid;
            }
            return valid;
    }
    changed=(event,id)=>{
        const newForm={
            ...this.state.form
        }
        const newElement= {
            ...newForm[id]
        }
        newElement.value=event.target.value;
        newElement.valid=this.checkValidation(newElement.value,newElement.validation);
        newElement.touched=true;
        newForm[id]=newElement;
        let formIsValid = true;
        for(let elem in newForm){
            formIsValid = newForm[elem].valid && formIsValid;
        }
        this.setState(
            {
                form:newForm,
                formIsValid:formIsValid
            }
        );
    }
    render() {
        const formElements=[];
        for (let key in this.state.form){
            formElements.push({
                id:key,
                config:this.state.form[key]
            });
        }
        let form = (
            <form onSubmit={this.order}>
                {
                    formElements.map(
                        element=>{
                           return <Input 
                           key ={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value} 
                            changed={(event)=>this.changed(event,element.id)}
                            invalid={!element.config.valid}
                            req={element.config.validation}
                            touched={element.config.touched}/>;
                        }
                    )
                }
                
                 <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>

            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.Contact}>
                <h3>Enter your Data</h3>
                {form}
            </div>

        );
    }
}


const mapStateToProps=state=>{
    return{
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId:state.authReducer.userId
    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onPurchasing: (order,token)=>dispatch(actions.continuePurchasing(order,token)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(Contact,axios));