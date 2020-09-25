const updateObj = (state,newState)=>{
    return{
        ...state,
        ...newState
    };  
};

export default updateObj;