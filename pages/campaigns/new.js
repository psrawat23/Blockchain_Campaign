import React, {Component} from 'react';
import Layout from '../../components/Layout';
import { Form,Button,Message,Input } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from "../../pages/web3";
// import Link from 'next/link';
import {Router} from '../../routes';
class CampaignNew extends Component{

    state={
        minimumContribution:'',
        errorMessage:'',
        loading:false,
        success:false
    };

    onSubmit=async(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
            try {
              const accounts = await web3.eth.getAccounts();
              await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({ from: accounts[0]});
                this.setState({success:true});
                Router.pushRoute('/');
            } catch (err) {
              console.log("got an error");
              this.setState({errorMessage:err.message});
            }
          }
          this.setState({loading:false});
    }

   
    render(){

        const FormExampleLoading = () => (
            <Form onSubmit={ this.onSubmit } error={!!this.state.errorMessage} success={this.state.success}>

                <Form.Field>
                <label> Miminum contribution</label>
              <Input label='wei' 
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={
                  event=>this.setState({minimumContribution:event.target.value})
                }
               />
              </Form.Field>
              <Message success
      header='Campaign Added'
      content="Your Campaign has been added succefully"
    />
            <Message error header="Error Occured" content={this.state.errorMessage} />
        
              <Button loading={this.state.loading} primary>Create</Button>
            </Form>
          );
          
          
        return   <Layout><h3> Create a New Campaign:</h3>
        
        {FormExampleLoading()}
        </Layout>; 
    }

}

export default CampaignNew;