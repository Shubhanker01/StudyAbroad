const express = require("express");

const { listPrograms } = require("../controllers/programController");
const { validate } = require("../middleware/validate");
const { listProgramsQuerySchema } = require("../schemas/programSchema");

const router = express.Router();

router.get("/", validate(listProgramsQuerySchema, "query"), listPrograms);

module.exports = router;
