import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../pages/web3';
import campaign from '../ethereum/campaign';
class RequestRow extends Component{

    state={
        load:"false",
        errorMessage:''
    }
    onApprove = async() =>{
    
        this.setState({load:"true"});
        try{

     
        const account =await web3.eth.getAccounts();
        const Campaign= campaign(this.props.address);
        await Campaign.methods.approveRequest(this.props.id).send(
            {from:account[0]}
        );
        }
        catch(err){
            this.setState({errorMessage:err.message});
        }
        this.setState({load:"false"});
    };

    finalize = async() =>{
    
        this.setState({load:"true"});
        try{

     
        const account =await web3.eth.getAccounts();
        const Campaign= campaign(this.props.address);
        await Campaign.methods.finalizeRequest(this.props.id).send(
            {from:account[0]}
        );
        }
        catch(err){
            this.setState({errorMessage:err.message});
        }
        this.setState({load:"false"});
    };

    render(){
        const {Row, Cell } = Table;
        const readTofinalize = this.props.request.approvalCount > this.props.approversCount / 2;

        return (
            <Row disabled={this.props.request.complete} positive={readTofinalize}>
                
                <Cell> {this.props.id}</Cell>
                <Cell> {this.props.request.description}</Cell>
                <Cell> {web3.utils.fromWei(this.props.request.value,"ether")}</Cell>
                <Cell>   {this.props.request.recipient} </Cell>
                <Cell>   {this.props.request.approvalCount} / {this.props.approversCount}   </Cell>
                <Cell>  { this.props.request.complete ? null:( <button className="ui positive basic button" loading={this.state.load} onClick={this.onApprove}>
                    Approve
                    </button>)}
                     </Cell>

                <Cell> {this.props.request.complete ? null : (   <button className="ui primary basic button" loading={this.state.load} onClick={this.finalize}>finalize</button>
                )}
                </Cell>
            </Row>
             
        );
    }
}

export default RequestRow;