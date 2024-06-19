const express = require('express');

const home = require("../controllers/view_controllers/home_controller");
const candidates = require("../controllers/view_controllers/candidates_controller");
const categories = require("../controllers/view_controllers/categories_controller");
const individual = require("../controllers/view_controllers/individual_controller");
const billet = require("../controllers/view_controllers/billet_controller");
const checkout = require("../controllers/view_controllers/checkout_controller");
const vote = require("../controllers/view_controllers/vote_controller");
const validation = require("../controllers/view_controllers/validation_controller");
const flwWebhook = require("../controllers/flw_webhook_controller/flw_webhook_controller");

const router = express.Router();

router.get("/home", home);
router.get("/categories", categories);
router.get("/candidates", candidates);
router.get("/individual", individual);
router.get("/billet", billet);
// router.get("/checkout", checkout);
router.get("/vote", vote);
router.get("/validation", validation);


router.post("/flw-webhook", flwWebhook);




router.get("/*", (req, res) => res.redirect("/user/home"));

module.exports = router;