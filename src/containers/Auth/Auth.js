import React, { Component } from 'react';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { continueAuth, changeRedirect } from '../../store/actions/actions';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        form: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                validation: {
                    required: true
                },
                touched: false,
                valid: false,
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                validation: {
                    required: true,
                    minLength: 5
                },
                touched: false,
                valid: false,
                value: ''
            },
        },
        formIsValid: false,
        isSignUp: true
    };

    checkValidation = (value, rules) => {
        let valid = true;
        if (rules.required) {
            valid = value.trim() !== '' && valid;
        }
        if (rules.minLength) {
            valid = (value.length >= rules.minLength) && valid;
        }
        return valid;
    };

    changed = (event, id) => {
        const newForm = {
            ...this.state.form
        }
        const newElement = {
            ...newForm[id]
        }
        newElement.value = event.target.value;
        newElement.valid = this.checkValidation(newElement.value, newElement.validation);
        newElement.touched = true;
        newForm[id] = newElement;
        let formIsValid = true;
        for (let elem in newForm) {
            formIsValid = newForm[elem].valid && formIsValid;
        }
        this.setState(
            {
                form: newForm,
                formIsValid: formIsValid
            }
        );
    };
    submit = (event) => {
        event.preventDefault();
        this.props.startAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignUp);
    };
    switchSignUP = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        });
    }
    componentDidMount() {
        if (!this.props.buildingBurger && this.props.redirectPath !== '/') {
            this.props.changeRedirect();
        }
    }
    render() {
        const formElements = [];
        for (let key in this.state.form) {
            formElements.push({
                id: key,
                config: this.state.form[key]
            });
        }
        let auth = null;
        if (this.props.isAuth)
            auth = <Redirect to={this.props.redirectPath} />;
        let form = (
            <form onSubmit={this.submit}>
                {
                    formElements.map(
                        element => {
                            return <Input
                                key={element.id}
                                elementType={element.config.elementType}
                                elementConfig={element.config.elementConfig}
                                value={element.config.value}
                                changed={(event) => this.changed(event, element.id)}
                                invalid={!element.config.valid}
                                req={element.config.validation}
                                touched={element.config.touched} />;
                        }
                    )
                }
                <Button btnType='Success' disabled={!this.state.formIsValid}>Submit</Button>
            </form>
        );
        if (this.props.loading)
            form = <Spinner />;
        let err = null;
        if (this.props.error)
            err = <h5 style={{ color: 'red' }}>{this.props.error.message}</h5>;
        return (
            <div className={classes.Auth}>
                <h3>Enter your Data</h3>
                {auth}
                {err}
                {form}
                <Button btnType='Danger' clicked={this.switchSignUP}>Switch to {this.state.isSignUp ? 'SignIn' : 'SignUp'}</Button>
            </div>

        );

    }

}
const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuth: state.authReducer.token !== null,
        buildingBurger: state.burgerReducer.building,
        redirectPath: state.authReducer.redirectPath
    };
};
const mapDispatchToProps = dispatch => {
    return {
        startAuth: (email, password, isSignUp) => dispatch(continueAuth(email, password, isSignUp)),
        changeRedirect: () => dispatch(changeRedirect('/'))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);