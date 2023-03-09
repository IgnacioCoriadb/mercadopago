const Router = require("express");
const {paymenMp,success,response} = require("../controllers/payMp");
const payMp = Router();

payMp.post('/pay',paymenMp);
payMp.get('/success', success);
payMp.post('/response', response);


module.exports = payMp;