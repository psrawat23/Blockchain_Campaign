import web3 from '../pages/web3';
import CampaignFactory from './build/:CampaignFactory.json';



const instance= new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xA4506229cD159ccdd9dA006aF4a78c882eF6F44e'
);



export default instance;