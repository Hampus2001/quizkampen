import { useContext, useState } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import * as motion from "motion/react-client";
import * as Tone from "tone";
import { Synth, PolySynth } from "tone";

export default function quizJoel() {
  const { question } = useContext(HandleQuestionContext);

  const myQuestion = question[0];

  const [showAnswer, setShowAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  const niceCompliment =
    "You are amazing and clever, I wish everyone could be like you...";
  const noCompliment = "You suck!";

  // const synth = new Tone.PolySynth().toDestination();
  // function playCorrectSynth() {
  //   synth.triggerAttackRelease("C5", "8n");
  // }
  // function playWrongSynth() {
  //   synth.triggerAttackRelease("B3", "8n");
  // }

  function handleAlternativeClick(selectedAlternative) {
    if (selectedAlternative === myQuestion.answer) {
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false);
    }

    setShowAnswer(true);
  }

  function restartGame() {
    setShowAnswer(false);
    setAnswerCorrect(false);
  }

  return (
    <section id="mainJoel" className="w-screen  min-h-screen">
      <div className="mt-16 flex flex-col w-full h-full items-center justify-center p-16 space-x-0 space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0">
        <motion.div
          className="relative w-96 h-full"
          initial={false}
          animate={{
            rotateY: showAnswer ? 180 : 0,
            transition: {
              default: { type: "spring" },
            },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {!showAnswer && (
            <motion.div
              className="card bg-base-100 shadow-xl h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                position: "absolute",
                backfaceVisibility: "hidden",
              }}
            >
              <figure className="w-full h-1/2 px-16 py-32 text-center bg-base-300">
                <h2 className="card-title">{myQuestion?.question}</h2>
              </figure>
              <div className="card-body items-center text-center">
                <ul className="grid grid-cols-2 grid-rows-2 gap-4 w-full">
                  {myQuestion?.alternatives.map((alternative, altIndex) => (
                    <li
                      key={altIndex}
                      className="p-8 bg-primary text-primary-content rounded-xl cursor-pointer hover:bg-accent"
                      onClick={() => handleAlternativeClick(alternative)}
                    >
                      {alternative}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {showAnswer && (
            <motion.div
              className="card bg-base-100 h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                position: "absolute",
                backfaceVisibility: "hidden",
                rotateY: 180,
              }}
            >
              <figure className="w-full h-1/2 px-16 py-32 text-center bg-base-300">
                <h2 className="card-title">
                  {answerCorrect ? "Correct!" : "Incorrect!"}
                </h2>
              </figure>
              <div className="card-body pb-12 items-center bg-primary text-primary-content text-center gap-4 rounded-b-xl">
                <h3>
                  The answer is
                  <span className="ml-1 font-bold">{myQuestion?.answer}</span>
                </h3>
                <h3>{answerCorrect ? niceCompliment : noCompliment}</h3>
                <div className="card-actions justify-end">
                  <button
                    onClick={restartGame}
                    className="btn btn-secondary mt-4"
                  >
                    Restart Game
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
