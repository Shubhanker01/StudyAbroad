const express = require("express");
const { validate } = require("../middleware/validate");
const { listUniversitiesQuerySchema } = require('../schemas/universitySchema');
const {
  listPopularUniversities,
  listUniversities,
} = require("../controllers/universityController");

const router = express.Router();

router.get("/", validate(listUniversitiesQuerySchema, "query"), listUniversities);
router.get("/popular", listPopularUniversities);

module.exports = router;
