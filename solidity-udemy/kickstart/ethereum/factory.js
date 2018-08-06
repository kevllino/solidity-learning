import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x1DF787C3ED5355B42a615a591988e29e015b5Eb7'
);

export default instance;