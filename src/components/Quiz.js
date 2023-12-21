import React, { useState } from "react";
import "../quiz.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// ************** DONT FORGET TO ADD THE PROGRESS BARRRRRRRR***************************

export default function Quiz() {
  const navigate = useNavigate();

  const navigateHome = () => {
    // Call the function with the desired scores
    const userID = sessionStorage.getItem("userId");
    function findMaxScore(score) {
      const maxScore = Math.max(...Object.values(score));
      const maxAttribute = Object.keys(score).find(
        (attribute) => score[attribute] === maxScore
      );
      return maxAttribute;
    }
    //Send PUT request to update scores using axios
  const updateScores = async (userID, scores) => {
    try {
      const response = await axios.put(
        `http://localhost:3030/user/update/${userID}`,
        scores,
        {
          withCredentials: true,
        }
      );
      navigate("/Home");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    const learningStyle = findMaxScore(scores)
    const randomNum = Math.floor(Math.random() * 3) + 1;
    updateScores(userID, {
      ProfilePicturePath: 'selected/'+ learningStyle+'Learner'+randomNum,
      LearningStyle: learningStyle,
      VisualPercent: calculatePercentage(scores.Visual, totalQuestions),
      AuditoryPercent: calculatePercentage(scores.Auditory, totalQuestions),
      ReadingPercent: calculatePercentage(scores.ReadWrite, totalQuestions),
      KinestheticPercent: calculatePercentage(
        scores.Kinesthetic,
        totalQuestions
      ),
    });
    
  };

  

  const questions = [
    {
      // Q1
      questionText:
        "Consider choosing a college for your pre-graduate or post-graduate studies, how would you prefer to gather your knowledge about your array of options of colleges?",
      answerOptions: [
        {
          answerText:
            "Asking friends and relatives where they went and how was their experience",
          isCorrect: true,
          scoreType: "Visual", // Add the scoreType property
        },
        {
          answerText:
            "Reading college brochures and rating between other colleges and researching online reviews.",
          isCorrect: true,
          scoreType: "Auditory", // Add the scoreType property
        },
        {
          answerText: "Visiting your options in person and asking for a tour",
          isCorrect: true,
          scoreType: "Kinesthetic", // Add the scoreType property
        },
        {
          answerText:
            "Watching YouTube videos of tours and online graph analysis of college reviews",
          isCorrect: true,
          scoreType: "ReadWrite", // Add the scoreType property
        },
      ],
    },
    {
      // Q2
      questionText:
        " Consider picking a form of media entertainment, which of these options sounds better to you?",
      answerOptions: [
        {
          answerText: " Watching a movie or a series",
          isCorrect: true,
          scoreType: "Visual", // Add the scoreType property
        },
        {
          answerText: "Listening to music",
          isCorrect: true,
          scoreType: "Auditory", // Add the scoreType property
        },
        {
          answerText: " Going out and doing an activity in a group or alone",
          isCorrect: true,
          scoreType: "Kinesthetic", // Add the scoreType property
        },
        {
          answerText: " Reading comic books and Novels",
          isCorrect: true,
          scoreType: "ReadWrite", // Add the scoreType property
        },
      ],
    },
    {
      //Q3
      questionText:
        "Consider learning a new skill of how to stay organized, which would you benefit more of?",
      answerOptions: [
        {
          answerText:
            "Using a website like wikihow, that uses visuals beside small descriptions of the steps needed",
          isCorrect: true,
          scoreType: "Visual", // Add the scoreType property
        },
        {
          answerText:
            " Reading a self help book on how to declutter and have a more organized life.",
          isCorrect: true,
          scoreType: "ReadWrite", // Add the scoreType property
        },
        {
          answerText:
            "Joining an online or real-life class on how to stay organized.",
          isCorrect: true,
          scoreType: "Kinesthetic", // Add the scoreType property
        },
        {
          answerText:
            "Listening to a podcast that explains the benefits and how to stay organized.",
          isCorrect: true,
          scoreType: "Auditory", // Add the scoreType property
        },
      ],
    },
    {
      //Q4
      questionText: " Which career path sounds more intriguing for you?",
      answerOptions: [
        {
          answerText:
            "A work path centered around making visuals, diagrams and maps.",
          isCorrect: true,
          scoreType: "Visual", // Add the scoreType property
        },
        {
          answerText:
            " A work path centered around communicating with clients and making presentations and speeches.",
          isCorrect: true,
          scoreType: "Auditory", // Add the scoreType property
        },
        {
          answerText:
            "A work path centered around working physically on the project and applying knowledge in real-life situations.",
          isCorrect: true,
          scoreType: "Kinesthetic", // Add the scoreType property
        },
        {
          answerText:
            " A work path centered around documenting and having well written out plans for a project.",
          isCorrect: true,
          scoreType: "ReadWrite", // Add the scoreType property
        },
      ],
    },
    {
      // Q5
      questionText:
        "When visiting a doctor for a health condition, how would you understand better what the doctor is explaining to you as a diagnosis",
      answerOptions: [
        {
          answerText: "Through a diagram and drawings of what is wrong",
          isCorrect: true,
          scoreType: "Visual",
        },
        {
          answerText: " Through explaining it verbally ",
          isCorrect: true,
          scoreType: "Auditory",
        },
        {
          answerText: "Through showing a 3D physical model",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText: "Through some resources to read more at home",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
      ],
    },

    {
      //Q6
      questionText:
        "Consider assembling a wooden table that came in parts, what would you learn best from?",
      answerOptions: [
        {
          answerText:
            "Written instructions that came with the parts for the table.",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
        {
          answerText:
            "Watching a video of a person assembling a similar table.",
          isCorrect: true,
          scoreType: "Visual",
        },
        {
          answerText: "Diagrams showing each stage of the assembly.",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText: " Advice from someone who has done it before.",
          isCorrect: true,
          scoreType: "Auditory",
        },
      ],
    },

    {
      //Q7
      questionText:
        " Consider wanting to learn a new computer program, which instructions do you prefer?",
      answerOptions: [
        {
          answerText:
            "read the written instructions that came with the program.",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
        {
          answerText: "follow the diagrams in a book.",
          isCorrect: true,
          scoreType: "Visual",
        },
        {
          answerText: " start using it and learn by trial and error.",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText: " talk with people who know about the program.",
          isCorrect: true,
          scoreType: "Auditory",
        },
      ],
    },
    {
      //Q8
      questionText:
        " Consider a class you are taking, what would you prefer the instructor to use?",
      answerOptions: [
        {
          answerText: "handouts, books, or readings.",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
        {
          answerText: " diagrams, charts, maps or graphs",
          isCorrect: true,
          scoreType: "Visual",
        },
        {
          answerText: " demonstrations, models or practical sessions.",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText:
            " question and answer, talk, group discussion, or guest speakers.",
          isCorrect: true,
          scoreType: "Auditory",
        },
      ],
    },
    {
      //Q9
      questionText:
        "  Consider having finished a competition or test, how would you like to have your feedback?",
      answerOptions: [
        {
          answerText: " Using a written description of my results.",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
        {
          answerText: " Using graphs showing what I achieved.",
          isCorrect: true,
          scoreType: "Visual",
        },
        {
          answerText: " Using examples from what I have done.",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText: " From somebody who talks it through with me.",
          isCorrect: true,
          scoreType: "Auditory",
        },
      ],
    },
    {
      //Q10
      questionText:
        " Consider studying a foreign language, which learning method do you find most effective?",
      answerOptions: [
        {
          answerText:
            "  Reading books, articles, and written materials in the target language.",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
        {
          answerText:
            " Using visual aids, flashcards, or mnemonic techniques to remember vocabulary",
          isCorrect: true,
          scoreType: "Visual",
        },
        {
          answerText:
            " Engaging in conversations and language exchanges with native speakers.",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText:
            "  Listening to audio recordings or podcasts in the target language.",
          isCorrect: true,
          scoreType: "Auditory",
        },
      ],
    },
    {
      //Q11
      questionText:
        " Consider facing a complex problem, how do you prefer to approach it?",
      answerOptions: [
        {
          answerText:
            " Breaking down the problem into smaller parts and analyzing each component.",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
        {
          answerText:
            "  Visualizing the problem through diagrams, flowcharts, or mind maps.",
          isCorrect: true,
          scoreType: "Visual",
        },
        {
          answerText:
            "  Experimenting and trying different approaches to find a solution through trial and error.",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText:
            " Engaging in brainstorming sessions and discussions with others.",
          isCorrect: true,
          scoreType: "Auditory",
        },
      ],
    },
    {
      //Q12
      questionText:
        "You want to learn how to play a musical instrument. Which learning method appeals to you?",
      answerOptions: [
        {
          answerText:
            "Reading sheet music and practicing through written instructions.",
          isCorrect: true,
          scoreType: "ReadWrite",
        },
        {
          answerText:
            "   Taking lessons from a music teacher who provides hands-on guidance",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText:
            "  Joining a music ensemble or band to learn through collaborative playing.",
          isCorrect: true,
          scoreType: "Kinesthetic",
        },
        {
          answerText:
            " Listening to recordings or watching performances by skilled musicians.",
          isCorrect: true,
          scoreType: "Auditory",
        },
      ],
    },

    // Add more questions...
  ];

  const [scores, setScores] = useState({
    Visual: 0,
    Auditory: 0,
    ReadWrite: 0,
    Kinesthetic: 0,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (isCorrect, scoreType) => {
    if (isCorrect) {
      setScores((prevScores) => ({
        ...prevScores,
        [scoreType]: prevScores[scoreType] + 1,
      }));
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const calculatePercentage = (score, totalQuestions) => {
    return ((score / totalQuestions) * 100).toFixed(2);
  };

  const totalQuestions = questions.length;

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <div>
            Visual Score: {calculatePercentage(scores.Visual, totalQuestions)}%
          </div>
          <div>
            Auditory Score:{" "}
            {calculatePercentage(scores.Auditory, totalQuestions)}%
          </div>
          <div>
            Read/Write Score:{" "}
            {calculatePercentage(scores.ReadWrite, totalQuestions)}%
          </div>
          <div>
            Kinesthetic Score:{" "}
            {calculatePercentage(scores.Kinesthetic, totalQuestions)}%
          </div>
          {/* <div>
            Total Score:{" "}
            {calculatePercentage(
              scores.Visual +
                scores.Auditory +
                scores.ReadWrite +
                scores.Kinesthetic,
              totalQuestions
            )}
            %
          </div> */}
          <div>
            <Button
              onClick={navigateHome}
              className="answerbtnn"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              Finish Signing Up{" "}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>
              {/* /{questions.length} */}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <Button
                className="answerbtnn"
                onClick={() =>
                  handleAnswerOptionClick(
                    answerOption.isCorrect,
                    answerOption.scoreType
                  )
                }
              >
                {answerOption.answerText}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
