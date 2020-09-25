import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux';
import {connect} from 'react-redux';

const SideDrawer = (props) => {
    
    let classesAttached=[classes.SideDrawer,classes.Closed];
    if (props.open)
    {
        classesAttached=[classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.close}/>
            <div className={classesAttached.join(' ')} onClick={props.close}>
                <div className={classes.Logo}>

                    <Logo />
                </div>
                <NavigationItems isAuth={props.isAuth}></NavigationItems>
            </div>
        </Aux>
    );
};
const mapStateToProps = state =>{
    return{
        isAuth: state.authReducer.token !== null
    };
};
export default connect(mapStateToProps)(SideDrawer);