const express = require("express");

const router = express.Router();

const controller = require("./controller");

router.post("api/call", controller.saveCallId);
router.post("api/call/:id", controller.getCallId);

module.exports = router;
