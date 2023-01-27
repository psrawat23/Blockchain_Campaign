import Web3 from 'web3';
let web3;
if(typeof window !== "undefined" && typeof window.web3 !== 'undefined'){
    window.ethereum.request({method:"eth_requestAccounts"});
    web3=new Web3(window.ethereum);
    

}else{

const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/eeeee90a16bb4ab39744bab71c1aa131'
);
web3= new Web3(provider);

 }
export default web3;
