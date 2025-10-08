const express = require("express");
const Question = require("../model/quizModel");
const mongoose = require("mongoose");

const getAllQuestions = async (req, res) => {
    try {
        const findAllQuestions = await Question.find();
        res.status(200).json(findAllQuestions);
    } catch (error) {
        res.status(500).json("Server side error " + error);
        }
};

      
const getAQuestion = async (req, res) => {
    
    const questionNumber = req.params.questionNumber;

    try {
        const getAQuestion = await Question.findOne({ QuestionNumber: questionNumber });
        res.status(200).json(getAQuestion);
                }
                    catch(error) {
                        res.status(500).json("Server side error " + SyntaxError);
                    };
            };

module.exports = {
    getAllQuestions, getAQuestion
}