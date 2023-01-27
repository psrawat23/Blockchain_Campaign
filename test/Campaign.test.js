const assert = require('assert');
const ganache = require('ganache-cli');
// const { default: Web3 } = require('web3');
const Web3 = new require('web3');
const web3= new Web3(ganache.provider());
const compiledFactory=require('../ethereum/build/:CampaignFactory.json');
const compileCampaign=require('../ethereum/build/:Campaign.json');
const { json } = require('mocha/lib/reporters');
let accounts;
let factory;
let CampaignAddress;
let Campaign;

beforeEach(async ()=>{
    accounts=await web3.eth.getAccounts();
    factory= await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data:compiledFactory.bytecode})
    .send({from:accounts[0],gas:'4612388'});
    await factory.methods.createCampaign('100')
    .send({from: accounts[0], gas:'4612388'});
    const addresses=await factory.methods.getDeployedCampaigns().call();
    CampaignAddress=addresses[0];
    Campaign= await new web3.eth.Contract(
        JSON.parse(compileCampaign.interface),
        CampaignAddress
    );
});

describe('Campaigns',()=>{

    it('deploys a factory and a campaign', ()=>{
        assert.ok(factory.options.address);
        assert.ok(Campaign.options.address);
    });
    it('marks caller as the campaign manager', async()=>{
        const manager= await Campaign.methods.manager().call();
        assert.equal(accounts[0],manager);
    });
    it('allows people to conribute money and marks them as approvers',async()=>{
        await Campaign.methods.contribute().send({
            value:'200',
            from:accounts[1]
        });
        const isContributor=await Campaign.methods.approvers(accounts[1]).call();
        assert(isContributor); // check if isContributor is true else false
    });
    it('requires a minimum contribution', async()=> {
        try{
            await Campaign.methods.contribute().send({
                value:'5',
                from:accounts[1]
            });
            assert(false);
        }
        catch(err){
            assert(err);
        }
    });

    it('allows a manager to create a request',async()=>{
        await Campaign.methods
        .createRequest("Buy Betteries",'12000',accounts[1])
        .send({
            from:accounts[0],
            gas:'4612388'
        });
        const request = await Campaign.methods.requests(0).call();
        assert.equal('Buy Betteries',request.description);
    });

    it('process requests',async()=>{
        let balance=await web3.eth.getBalance(accounts[1]);
        console.log(web3.utils.fromWei(accounts[0],'ether'));
        console.log(web3.utils.fromWei(balance,'ether'));
        await Campaign.methods.contribute().send({
            from:accounts[0],
            value:web3.utils.toWei('10','ether')
        });
        await Campaign.methods
        .createRequest('A',web3.utils.toWei('5','ether'),accounts[1])
        .send({from:accounts[0],gas:'4612388'});

        await Campaign.methods.approveRequest(0).send({
            from:accounts[0],
            gas:'4612388'
        });

        await Campaign.methods.finalizeRequest(0).send({
            from:accounts[0],
            gas:'4612388'
        });

        balance=await web3.eth.getBalance(accounts[1]);
        console.log(web3.utils.fromWei(balance,'ether'));
        
    });
});