import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state= {
        open:false
    }

    closeSideDrawer=()=>{
        this.setState({open:false});
    }
    toggleSideDrawer=()=>{
        let hh=!this.state.open;
        this.setState({open:hh});
    }
    render() {
        return (
            <Aux>
                <Toolbar toggle={this.toggleSideDrawer}/>
                <SideDrawer open={this.state.open} close={this.closeSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
            );
    }
}
export default Layout;