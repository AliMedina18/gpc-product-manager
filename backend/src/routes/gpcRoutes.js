const { Router } = require("express");
const router = Router();
const gpcController = require("../controllers/gpcController");

router.get("/segments", gpcController.getSegments);
router.get("/families/:segmentId", gpcController.getFamilies);
router.get("/classes/:familyId", gpcController.getClasses);
router.get("/bricks/:classId", gpcController.getBricks);
router.get("/attributes/:brickId", gpcController.getAttributes);

module.exports = router;
