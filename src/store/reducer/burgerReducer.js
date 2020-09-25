import * as actionTypes from '../actions/actionTypes';
import updatedObj from './utility';
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false, 
    building: false
};

const PRICES = {
    salad: 0.5,
    meat: 4.75,
    cheese: 2.75
};

const addIngredient = (state, action) => {
    const newIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const newIngredients = updatedObj(state.ingredients, newIngredient);
    const newState = {
        ingredients: newIngredients,
        totalPrice: state.totalPrice + PRICES[action.ingredientName],
        building:true
    };
    return updatedObj(state, newState);
};


const removeIngredient = (state, action) => {
    const newIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const newIngredients = updatedObj(state.ingredients, newIngredient);
    const newState = {
        ingredients: newIngredients,
        totalPrice: state.totalPrice - PRICES[action.ingredientName],
        building:true
    };
    return updatedObj(state, newState);
};

const setIngredients = (state, action) => {
    const newState = {
        ingredients: {
            salad: action.ingredients.salad,
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese,
        },
        error: false,
        totalPrice: 4,
        building: false
    };
    return updatedObj(state, newState);
};
const fetchError = (state) => {
    const newState = {
        error: true
    };
    return updatedObj(state, newState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT): return addIngredient(state, action);
        case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
        case (actionTypes.SET_INGREDIENTS): return setIngredients(state, action);
        case (actionTypes.FETCH_ERROR):return fetchError(state);
        default: return state;
    }

}
export default reducer;