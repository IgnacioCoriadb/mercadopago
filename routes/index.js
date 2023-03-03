const Router = require("express");
const payMp = require("./payMp");

const router = Router();

router.use("/",payMp);

module.exports = router;