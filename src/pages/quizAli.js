import { useContext, useState, useEffect } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import Link from "next/link";
import * as motion from "motion/react-client";

export default function AliQuiz() {
  const { question } = useContext(HandleQuestionContext);
  const newQuestion = question[3];

  useEffect(() => {
    console.log(question);
  }, [question]);

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

  return (
    <div className="h-screen flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-6"
      >
        <motion.div
          key="question"
          initial={{ opacity: 1 }}
          animate={{
            opacity: showAnswer ? 0 : 1,
            rotate: showAnswer ? 180 : 0,
          }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-semibold mb-6 h-56 bg-blue-950 p-6 rounded-lg flex justify-center items-center"
        >
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-center">
              <img height={500} width={250} src="/assets/608.jpg"></img>
            </div>
            <h1 className="text-white">{newQuestion.question}</h1>
          </div>
        </motion.div>

        <motion.div
          key="alternatives"
          initial={{ opacity: 1 }}
          animate={{ opacity: showAnswer ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4 w-full"
        >
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
        </motion.div>

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 flex justify-center items-center z-50"
          >
            <div className="flex flex-col h-[70%] w-[40%] bg-white shadow-lg rounded-lg">
              <div className="flex-1 bg-blue-950 p-6 rounded-t-lg text-center flex items-center justify-center">
                <h2
                  className={`text-3xl font-semibold ${
                    correctAnswer ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {correctAnswer
                    ? "You got it! I might need to start taking notes from you!"
                    : "Wrong answer! You might want to try Googling it next time...😉"}
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

                <div className="flex justify-between mt-4">
                  <button
                    onClick={closePopup}
                    className="mt-4 w-40 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Close
                  </button>
                  <Link
                    href="/"
                    className="mt-4 w-40 py-2 bg-blue-500 text-white text-center rounded-lg"
                  >
                    Next Question
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
