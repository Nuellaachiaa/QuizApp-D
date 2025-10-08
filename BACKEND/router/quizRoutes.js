const express = require("express");
const router = express.Router();
const { getAllQuestions, getAQuestion } = require("../controller/quizController");

router.get("/", getAllQuestions)

router.get("/:questionNumber", getAQuestion)


module.exports = router;