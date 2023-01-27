import React, {Component} from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from 'semantic-ui-react';
import {Link } from '../../../routes';
import campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{

    static async getInitialProps(props){
        const {address} = props.query;
        const Campaign = campaign(address);
        const requestsCount = await Campaign.methods.getRequestsCount().call();
        const approversCount = await Campaign.methods.approversCount().call();
        const requests = await Promise.all(
            Array(requestsCount)
            .fill()
            .map((element,index) => {
                return Campaign.methods.requests(index).call()
            })
        );
    

        return {address,requests,approversCount,requestsCount};
    }


    renderRow(){
        return this.props.requests.map((request,index)=>{
            return <RequestRow 
            key={index} 
            id={index}
            request={request}
            approversCount={this.props.approversCount}
            requestsCount= {this.props.requestsCount}
            address={this.props.address}
            />
        }
        );
    }
    render(){

        const {Header, Row, HeaderCell, Body} = Table;

        return (

            <Layout>
                <h3> Request List</h3>
               
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                
                <a>
                    <Button primary> Add request</Button>
                </a>
                </Link>
                
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>approvalCount</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
            </Layout>
          
        );
    }
}

export default RequestIndex;
