import { Router } from '../routes';
import React, {Component} from 'react';
import Campaign from '../ethereum/campaign';
import web3 from '../pages/web3';
const { Form,Input,Message,Button } = require("semantic-ui-react");
class contributeForm extends Component{

    state={
        value:'',
        load:false,
        errorMessage:'',
        success:false    
    };
    onSubmit=async(event)=>{
        event.preventDefault();
        const campaign=Campaign(this.props.address);
        this.setState({errorMessage:""})
        this.setState({load:true});

        try {
            const accounts=await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(this.state.value,'ether')
            });

            this.setState({load:false});
            this.setState({success:true})
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (error) {
            this.setState({errorMessage:error.message,value:''})
            console.log(error);
            
        }
        this.setState({load:false,value:''});
       
    };

    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={this.state.success}>
                <Form.Field>
                    <label> Amount ot Contribute</label>
                    <Input label="ether"
                     labelPosition="right" 
                    value={this.state.value} 
                    onChange={event=>this.setState({value:event.target.value})}
                    
                    /> 
                </Form.Field>
                <Message success
      header='Campaign Added'
      content="Your Contribution has been succesfully added."
    />
                <Message error header="Error Occured" content={this.state.errorMessage} />
                <Button loading={this.state.load} primary>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default contributeForm;