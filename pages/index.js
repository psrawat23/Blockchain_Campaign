import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import {Link} from '../routes';
class CampaignIndex extends Component {
  static async getInitialProps() {
    console.log("df");

    const Campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(Campaigns);

    return { Campaigns };
  }

  renderCampaigns() {
    const items = this.props.Campaigns.map((address) => {
      return {
        header: address,
        description:(<Link route={`/campaigns/${address}`}> View Campaign  </Link>),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    const CreatenewCampaign = () => (
      <div>
        <Link route="/campaigns/new">
        <a>
        <Button floated="right" content="Create Campaign" icon="add circle" style={{marginTop:'10px'}} primary />
     
        </a>
          </Link>
          </div>
    );


    return(
        <Layout>
    <div>
    <h2> Open Campaigns:</h2>
       {this.renderCampaigns()}

        {CreatenewCampaign()}
     
    </div>
    </Layout>
    );
  }
}

export default CampaignIndex;
