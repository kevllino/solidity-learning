const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = require('../ethereum/build/CampaignFactory');

const provider = new HDWalletProvider(
    'cook snap tiger poverty junior table what accuse cost where damp echo',
    'https://rinkeby.infura.io/VrD0lE4lfWAwfSvG7mOz'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode, arguments: []})
        .send({ from: accounts[0], gas:1000000 });
    console.log('Contract deployed to ', result.options.address)
};
deploy();