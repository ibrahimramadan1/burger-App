import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const addIngredient = (name)=>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredient = (name)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};
export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
export const fetchError =()=>{
    return {
        type: actionTypes.FETCH_ERROR
    };
};
export const initIngredients = () => {
    return dispatch =>{
        axios.get('https://burger-app-e28d9.firebaseio.com/ingredients.json')
            .then(respond =>{ 
                dispatch(setIngredients(respond.data));
            }).catch(error => {dispatch(fetchError());});

    };
};