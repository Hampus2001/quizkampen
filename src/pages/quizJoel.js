import { useContext, useState, useEffect } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import * as motion from "motion/react-client";
import * as Tone from "tone";

import { SpeakerOffIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";

export default function quizJoel() {
  const { question } = useContext(HandleQuestionContext);
  const myQuestion = question[0];

  const [showAnswer, setShowAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [synth, setSynth] = useState(null);
  const now = Tone.now();

  const niceCompliment =
    "You are amazing and clever, I wish everyone could be like you...";
  const noCompliment = "You suck!";

  useEffect(() => {
    if (audioInitialized) {
      const synthInstance = new Tone.Synth().toDestination();
      setSynth(synthInstance);

      return () => {
        synthInstance.dispose();
      };
    }
  }, [audioInitialized]);

  function soundToggleBTN() {
    if (!audioInitialized) {
      Tone.start();
      setAudioInitialized(true);
    }

    setSoundOn((prevSoundState) => {
      const newState = !prevSoundState;

      if (newState && synth) {
        synth.triggerAttackRelease("C5", "8n", now);
        synth.triggerAttackRelease("E5", "8n", now + 0.05);
        synth.triggerAttackRelease("G5", "8n", now + 0.1);
      }

      return newState;
    });
  }

  function handleAlternativeClick(selectedAlternative) {
    const now = Tone.now();
    if (selectedAlternative === myQuestion.answer) {
      setAnswerCorrect(true);

      synth.triggerAttackRelease("D4", "8n", now);
      synth.triggerAttackRelease("F#4", "8n", now + 0.05);
      synth.triggerAttackRelease("A4", "8n", now + 0.1);
    } else {
      setAnswerCorrect(false);

      synth.triggerAttackRelease("E4", "8n", now);
      synth.triggerAttackRelease("C#4", "8n", now + 0.05);
      synth.triggerAttackRelease("B2", "8n", now + 0.1);
    }

    setShowAnswer(true);
  }

  function restartGame() {
    setShowAnswer(false);
    setAnswerCorrect(false);
  }

  return (
    <section id="mainJoel" className="w-screen min-h-screen">
      <label className="absolute bottom-6 left-4 z-20">
        <input
          type="checkbox"
          checked={soundOn}
          onChange={soundToggleBTN}
          className="hidden"
        />

        <button
          onClick={soundToggleBTN}
          className={`btn btn-circle ${
            soundOn ? "swap-off btn-base-300" : "swap-on btn-primary"
          }`}
        >
          {soundOn ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
        </button>
      </label>

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
