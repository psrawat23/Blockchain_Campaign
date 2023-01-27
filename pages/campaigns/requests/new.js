import React, {Component} from "react";
import {Form, Button, Message} from 'semantic-ui-react';
import campaign from "../../../ethereum/campaign";
import { Link, Router} from '../../../routes';
import Layout from "../../../components/Layout";
import web3 from "../../web3";
class RequestNew extends Component{

    state={
        value:'',
        description:'',
        recipient:'',
        load:false,
        errorMessage:'',
        success:false
    };
    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }

    onSubmit =async event =>{
      event.preventDefault();
      const Campaign = campaign(this.props.address);
      const {description, value, recipient} = this.state;
      this.setState({load:true,errorMessage:''});
      try{

        const accounts= await web3.eth.getAccounts();
        await Campaign.methods.createRequest(description,web3.utils.toWei(value,'ether'),
        recipient
        ).send({from:accounts[0]});

        this.setState({success:true,load:false});
      }

        catch(err){
          this.setState({errorMessage:err.message,load:false});
            console.log(err);

        }

        this.setState(
          {
            value:'',
            description:'',
          recipient:'',
          
        }

        );
        
      
    }
    render(){

       const  NewRequest = ()=>(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={this.state.success}>
            <Form.Field>
              <label>description </label>
              <input value={this.state.description} 
              onChange={event => this.setState({description:event.target.value})}
              />
            </Form.Field>
            <Form.Field>
              <label> Value in Ether</label>
              <input value={this.state.value}
              onChange={event=> this.setState({value:event.target.value})}
               />
            </Form.Field>
            <Form.Field>
              <label> Recipient</label>
              <input value={this.state.recipient}
              onChange={event=>this.setState({recipient:event.target.value})}
              />
            </Form.Field>
            <Message success header="Succefully added the request"/>
        
            <Message error header="Error Occured" content={this.state.errorMessage} />
        
            <Button type='submit' loading={this.state.load} primary>Submit</Button>
          </Form>
       );
        return(
            <Layout>

            <h3>
               Create New request
      
            </h3>
                      {NewRequest()}
                      </Layout>

        );
    }
}

export default RequestNew;