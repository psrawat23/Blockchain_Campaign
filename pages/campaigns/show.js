import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Button, Card, Grid, GridColumn } from 'semantic-ui-react';
import web3 from 'web3';
import ContributeForm from '../../components/ContributeForm';
import {Link } from '../../routes';
class CampaignShow extends Component{
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
       return {
         address:props.query.address,
        minimumContribution:summary[0],
        manager:summary[1],
        RequestCount: summary[2],
        balance: summary[3],
        approversCount:summary[4]

       };
        
    }

    renderCampaignShow(){    
        const{
            minimumContribution,
            manager,
            RequestCount,
            balance,
            approversCount
        }=this.props;

        const items = [
            {
              header: manager,
              description: 'The manager created this campaign',
              meta: "Manager",
              style:{overflowWrap:'break-word'}
            },
            {
              header: web3.utils.fromWei(balance,'ether'),
              description:
                'Total left in the campaign',
              meta: 'Campaign Balance (ether)',
            },
            {
              header: RequestCount,
              description:
                'Total requested created for this campaign',
              meta: 'Total request',
            },
              {
                header: minimumContribution,
                description:
                  'Minumum amount to contribute into the Campaign',
                meta: "Minimum Contribution",
              },
              {
                header: approversCount,
                description: 'Total Approvers count',
                meta: "Approvers",
                style:{overflowWrap:'break-word'}
              },
          ]
          return  <Card.Group items={items} />

    }
    render(){

      
        return  <Layout> 

            <div>
         
            <h3>   Campaign Details </h3>

        <Grid>

        <Grid.Row>

      <Grid.Column width={9}>
   
            {this.renderCampaignShow()}
   
                 
      </Grid.Column>
      <Grid.Column width={7}>
      <ContributeForm address={this.props.address}/>
      </Grid.Column>
                
        
            </Grid.Row>

            <Grid.Row>

              <Grid.Column>
   
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a>
                <Button primary> View requests  </Button>
              </a>
            </Link>
                         
            </Grid.Column>
            </Grid.Row>

                 </Grid> 
            </div>
           
        </Layout>;
    }
}

export default CampaignShow;