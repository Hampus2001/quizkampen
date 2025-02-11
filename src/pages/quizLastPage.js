import { useContext, useState, useEffect } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import { HandleScoreContext } from "@/ScoreContext";
import Link from "next/link";
import * as motion from "motion/react-client";

export default function AliQuiz() {
  const { question } = useContext(HandleQuestionContext);
  const { score, setScore } = useContext(HandleScoreContext);
  const newQuestion = question[3];

  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);

    if (answer === newQuestion.answer) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
    setShowAnswer(true);
  };

  const closePopup = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  };

  useEffect(() => {
    console.log(score.username, score.score);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center p-6 bg-[url(/assets/608.jpg)] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-md w-full space-y-6"
      >
        <motion.div
          key="question-and-alternatives"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: showAnswer ? 0 : 1,
            y: showAnswer ? -100 : 0,
          }}
          transition={{ duration: 0.1 }}
          className="bg-base-100 p-6 rounded-lg space-y-4"
        >
          <div className="text-2xl font-semibold h-56 flex justify-center items-center">
            <h1 className="text-white text-center">{newQuestion.question}</h1>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            {newQuestion.alternatives.map((alt, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(alt)}
                className="text-black p-8 bg-pink-500 rounded-md shadow-md hover:bg-pink-600"
                disabled={showAnswer}
              >
                {alt}
              </button>
            ))}
          </div>
        </motion.div>

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex justify-center items-center"
          >
            <div className="flex flex-col h-[70%] w-[30%] bg-white shadow-lg rounded-lg">
              <div className="flex-1 bg-base-300 p-6 rounded-t-lg text-center flex items-center justify-center">
                <h2
                  className={`text-3xl font-semibold ${
                    correctAnswer ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {correctAnswer
                    ? "Wow, you're on fire! Maybe you should quit your day job and become a quiz master!"
                    : "Yikes, wrong answer! It’s okay, we’ll just pretend that didn’t happen!"}
                </h2>
              </div>

              <div className="flex-1 bg-pink-500 p-6 w-full rounded-b-lg flex flex-col justify-center">
                <p className="text-lg mb-4 text-center">
                  You selected:{" "}
                  <span className="font-semibold">{selectedAnswer}</span>
                </p>
                <p className="text-lg text-center">
                  The correct answer is:{" "}
                  <span className="font-semibold">{newQuestion.answer}</span>
                </p>

                <div className="flex justify-center mt-4">
                  <Link
                    onClick={() => {
                      if (correctAnswer) {
                        setScore((prevScore) => {
                          const updatedScore = prevScore.score + 1;
                          score.score = updatedScore;
                        });

                        const storedScores =
                          JSON.parse(localStorage.getItem("quizHighScores")) ||
                          [];
                        const updatedScores = [...storedScores, score].sort(
                          (a, b) => b.score - a.score
                        );
                        localStorage.setItem(
                          "quizHighScores",
                          JSON.stringify(updatedScores)
                        );
                      } else {
                        const storedScores =
                          JSON.parse(localStorage.getItem("quizHighScores")) ||
                          [];
                        const updatedScores = [...storedScores, score].sort(
                          (a, b) => b.score - a.score
                        );
                        localStorage.setItem(
                          "quizHighScores",
                          JSON.stringify(updatedScores)
                        );
                      }
                    }}
                    href="/highscores"
                    className="mt-4 w-40 py-2 bg-blue-500 text-white text-center rounded-lg"
                  >
                    Finish game
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
