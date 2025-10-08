import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/Axios";


const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [score, setScore] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false); 
  

    useEffect(() => {
        const getQuestions = async () => {
            const data = await fetchQuestions();
            setQuestions(data);
        };
        getQuestions();
        }, []);

  
    const handlePreviousQuestion = () => {
      if (currentQuestionIndex > 0) {
        setSelectedOption(selectedOption);
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1); 
      } 
    };
  

    const handleNextQuestion = () => {
      if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setSelectedOption("");
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsQuizFinished(true); 
      }
    };


    const currentQuestion = questions[currentQuestionIndex];


      if (questions.length === 0) {
        return <div>Loading...</div>;
      }
  

      if (isQuizFinished) {
      return (
        <div className="final-page" style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Quiz Finished!</h2>
        <p>
          Your score is {score} out of {questions.length}.
        </p>
        <p>Good try!</p>
        </div>
      );
    }
  

      return (

      <div>
        <div className="QuestionContainer">
          <h2 className="questionNumber">Question {currentQuestionIndex + 1}</h2>

        <div className="questionTagBox">
          <p>{currentQuestion.QuestionTag}</p>
        </div>

        <div className="choices" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {currentQuestion.choices.map((choice, index) => (
        <div
          key={index}
          style={{
            flex: "1 1 calc(50% - 20px)",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor:
              selectedOption
                ? selectedOption === choice
                    ? selectedOption === currentQuestion.correctAnswer
                      ? "green" 
                         : "red" 
                : choice === currentQuestion.correctAnswer
                    ? "green" 
                      : "#f8f9fa" 
                        : "#f8f9fa",
            transition: "background-color 0.3s ease",
              }}
              
          onClick={() => setSelectedOption(choice)}>
        <label
          style={{
            display: "block",
            width: "100%",
            cursor: "pointer",
                }}>
                
        <input
          type="radio"
          name="option"
          value={choice}
          checked={selectedOption === choice}
          onChange={() => setSelectedOption(choice)}
          style={{ display: "none" }} 
          />
          {choice}
        </label>
        </div>
          ))}
         </div>

         
          <div className=" navButtons ">
              
          <button
            className="prev"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          > Previous
          </button>
         


         <button
          className="next"
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          >
             {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>
          </div>
      </div>

       
     </div>
     
     
    );
};


export default Quiz;