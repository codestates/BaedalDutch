const express = require("express");
const partiesController = require("../controllers/parties");
const router = express.Router();

router.get("/", partiesController.getParties);
router.post("/", partiesController.createParty);
router.delete("/:id", partiesController.deleteParty);
router.put("/:id", partiesController.updateParty);
router.patch("/:id", partiesController.closeParty);

module.exports = router;
