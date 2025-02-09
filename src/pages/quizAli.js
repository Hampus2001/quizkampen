import { useContext, useState } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import Link from "next/link";

export default function AliQuiz() {
  const { question } = useContext(HandleQuestionContext);
  const newQuestion = question[1];

  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);

    if (answer === newQuestion.answer) {
      setCorrectAnswer(true); // Mark answer as correct
    } else {
      setCorrectAnswer(false); // Mark answer as incorrect
    }
    setShowAnswer(true); // Show the answer popup after selection
  };

  const closePopup = () => {
    setShowAnswer(false); // Close the popup
    setSelectedAnswer(null); // Reset selected answer
    setCorrectAnswer(null); // Reset correctness
  };

  return (
    <div className="h-screen flex justify-center items-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Question Title */}
        <div className="text-2xl font-semibold mb-6 h-56 bg-black p-6 rounded-lg flex justify-center items-center">
          <h1 className="text-white">{newQuestion.question}</h1>
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

        {/* Show Answer Popup */}
        {showAnswer && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col h-[70%] w-[40%] bg-white shadow-lg rounded-lg">
              {/* Div 1: Correct/Incorrect message */}
              <div className="flex-1 bg-black p-6 rounded-t-lg text-center flex items-center justify-center">
                <h2
                  className={`text-xl font-semibold ${
                    correctAnswer ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {correctAnswer
                    ? "You are Correct"
                    : "Unfortunately, it is wrong"}
                </h2>
              </div>

              {/* Div 2: Selected Answer and Correct Answer */}
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
          </div>
        )}
      </div>
    </div>
  );
}
