import { useContext, useState, useEffect } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import { HandleScoreContext } from "@/ScoreContext";
import * as motion from "motion/react-client";
import Link from "next/link";

export default function sofiaQuiz() {
  const { question } = useContext(HandleQuestionContext);
  const { score, setScore } = useContext(HandleScoreContext);
  const currentQuestionData = question[1];

  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const correctResponse = "You're fluent in cat memes, meow!";
  const incorrectResponse = "Did a cat accidentally walk on your keyboard?";

  const handleChoiceClick = (selectedAnswer) => {
    const correct = selectedAnswer === currentQuestionData.answer;
    setIsAnswerCorrect(correct);
    setIsAnswerRevealed(true);
  };

  useEffect(() => {
    console.log(score.username, score.score);
  }, []);

  // Option to go back to the question
  //   const resetQuiz = () => {
  //     setIsAnswerRevealed(false);
  //     setIsAnswerCorrect(false);
  //   };

  return (
    <section
      id="quiz-section"
      className=" w-screen min-h-screen bg-[url(/assets/cat2.jpeg)] bg-cover bg-center overflow-hidden"
    >
      <div className="mt-16 flex flex-col w-full h-full items-center justify-center p-16 space-x-0 space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0">
        <motion.div
          className="relative w-96 h-full"
          initial={false}
          animate={{
            rotateY: isAnswerRevealed ? 180 : 0,
            transition: { default: { type: "spring", stiffness: 100 } },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {!isAnswerRevealed && (
            <motion.div
              className="card z-10 bg-white shadow-xl rounded-xl h-full w-full transform transition-all duration-500 backdrop-blur-3xl"
              style={{
                transformStyle: "preserve-3d",
                position: "absolute",
                backfaceVisibility: "hidden",
              }}
            >
              <figure className="w-full h-1/2 px-16 py-32 text-center bg-base-100  rounded-t-xl">
                <h2 className="card-title text-2xl font-bold text-white">
                  {currentQuestionData?.question}
                </h2>
              </figure>
              <div className="card-body items-center bg-base-300 rounded-b-lg text-center">
                <ul className="grid grid-cols-2 gap-4 w-full">
                  {currentQuestionData?.alternatives.map((choice, index) => (
                    <li
                      key={index}
                      className="p-8 bg-primary text-primary-content rounded-xl cursor-pointer hover:bg-accent transform hover:scale-105 transition-transform"
                      onClick={() => handleChoiceClick(choice)}
                    >
                      {choice}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {isAnswerRevealed && (
            <motion.div
              className="card bg-white h-full w-full transform transition-all duration-500"
              style={{
                transformStyle: "preserve-3d",
                position: "absolute",
                backfaceVisibility: "hidden",
                rotateY: 180,
              }}
            >
              <figure className="w-full h-1/2 px-16 py-32 text-center bg-base-100 rounded-t-xl">
                <h2 className="card-title text-2xl font-bold text-white">
                  {isAnswerCorrect ? "Correct!" : "Incorrect!"}
                </h2>
              </figure>
              <div className="card-body pb-12 items-center bg-primary text-primary-content text-center gap-4 rounded-b-xl">
                <h3 className="text-xl">
                  The correct answer is:
                  <span className="ml-1 font-bold">
                    {currentQuestionData?.answer}
                  </span>
                </h3>
                <h3 className="text-lg">
                  {isAnswerCorrect ? correctResponse : incorrectResponse}
                </h3>
                <div className="card-actions justify-end">
                  {/* Takes you back to the current question */}
                  {/* <button
                    onClick={resetQuiz}
                    className="btn btn-secondary mt-4 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400"
                  >
                    Try again!  
                  </button> */}

                  <Link
                    onClick={() => {
                      if (isAnswerCorrect) {
                        // Check if the answer is correct before updating score
                        setScore((prevScore) => {
                          const updatedScore = prevScore.score + 1;
                          return { ...prevScore, score: updatedScore };
                        });
                      }
                    }}
                    href="/quizAli"
                    className="mt-4 w-40 py-2 bg-blue-500 text-white text-center rounded-lg"
                  >
                    Next Question
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
