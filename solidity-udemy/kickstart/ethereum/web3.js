import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on server or user not running metamask
    // connecting to rinkeby network through infura
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/VrD0lE4lfWAwfSvG7mOz'
    );
    web3 = new Web3(provider);

}

export default web3;

