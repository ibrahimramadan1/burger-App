import React , {Component} from 'react';
import axios from '../../Axios';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux' ;
import {continueFetching} from '../../store/actions/actions'
class Orders extends Component {
    
    componentDidMount(){
        this.props.startFetching(this.props.token , this.props.userId);
    }
   
    render(){
        let orders=null;
        if (this.props.loading)
        {
            orders=<Spinner/>;
        }
        else {
            orders=this.props.orders.map(
                order=>{
                    return <Order key={order.id} 
                    ingredients={order.ingredients} 
                    price={order.price} />;
                }
            );
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        orders:state.orderReducer.orders,
        loading:state.orderReducer.loading,
        token:state.authReducer.token,
        userId:state.authReducer.userId
    };
};
const mapDispatchToProps = dispatch => {
    return{
        startFetching: (token,userId)=>dispatch(continueFetching(token,userId)),
    };
};
export default connect (mapStateToProps,mapDispatchToProps)(ErrorHandler(Orders,axios));