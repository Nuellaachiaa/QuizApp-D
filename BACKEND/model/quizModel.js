const mongoose = require("mongoose"); 

const questionSchema = new mongoose.Schema({
            QuestionNumber: Number,
            QuestionTag: String,
            choices: [{
                type: String
            }],
            correctAnswer: String
        });

       module.exports = mongoose.model("Question", questionSchema);