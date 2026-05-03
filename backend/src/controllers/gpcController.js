const gpcService = require("../services/gpcService");

async function getSegments(req, res, next) {
  try {
    const data = await gpcService.getSegments();
    res.json(data);
  } catch (err) { next(err); }
}

async function getFamilies(req, res, next) {
  try {
    const data = await gpcService.getFamiliesBySegment(req.params.segmentId);
    res.json(data);
  } catch (err) { next(err); }
}

async function getClasses(req, res, next) {
  try {
    const data = await gpcService.getClassesByFamily(req.params.familyId);
    res.json(data);
  } catch (err) { next(err); }
}

async function getBricks(req, res, next) {
  try {
    const data = await gpcService.getBricksByClass(req.params.classId);
    res.json(data);
  } catch (err) { next(err); }
}

async function getAttributes(req, res, next) {
  try {
    const data = await gpcService.getAttributesByBrick(req.params.brickId);
    res.json(data);
  } catch (err) { next(err); }
}

module.exports = { getSegments, getFamilies, getClasses, getBricks, getAttributes };
