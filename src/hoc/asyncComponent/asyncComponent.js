import React ,{Component} from 'react';
const async =(importComp)=>
{
    return class extends Component{
        state={
            component:null
        }
        componentDidMount(){
            importComp()
            .then(comp=>{this.setState({component:comp.default});});
        }
        render()
        {
            const C=this.state.component;

            return C? <C {...this.props} /> : null;

        }
    }
}
export default async;