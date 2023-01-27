import web3 from '../pages/web3';
import Campaign from './build/:Campaign.json';


export default (address) =>{
    return new web3.eth.Contract(
        JSON.parse(Campaign.interface),
        address
    );
};