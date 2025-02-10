import { useContext, useState, useEffect } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import { HandleScoreContext } from "@/ScoreContext";
import * as motion from "motion/react-client";
import * as Tone from "tone";
import Link from "next/link";

import { SpeakerOffIcon, SpeakerLoudIcon } from "@radix-ui/react-icons";

export default function quizJoel() {
  const { question } = useContext(HandleQuestionContext);
  const { score, setScore } = useContext(HandleScoreContext);
  const myQuestion = question[0];

  const [showAnswer, setShowAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [synth, setSynth] = useState(null);

  const niceCompliment =
    "You are amazing and clever, I wish everyone could be like you...";
  const noCompliment = "You suck!";

  useEffect(() => {
    console.log(score.username, score.score);
  }, []);

  useEffect(() => {
    if (soundOn && !audioInitialized) {
      Tone.start().then(() => {
        setAudioInitialized(true);
      });
    }
  }, [soundOn, audioInitialized]);

  useEffect(() => {
    if (audioInitialized) {
      const freeverb = new Tone.Freeverb({
        roomSize: 0.9,
        dampening: 3000,
        wet: 0.7,
      }).toDestination();

      const delay = new Tone.Delay({
        delayTime: 0.1,
        feedback: 0.8,
        wet: 0.9,
      }).toDestination();

      const synthInstance = new Tone.Synth().connect(freeverb).connect(delay);
      setSynth(synthInstance);

      return () => {
        synthInstance.dispose();
      };
    }
  }, [audioInitialized]);

  function soundToggleBTN() {
    setSoundOn((prevSoundState) => {
      const newState = !prevSoundState;
      if (newState && !audioInitialized) {
        Tone.start().then(() => {
          setAudioInitialized(true);
        });
      }
      return newState;
    });
  }

  function handleAlternativeClick(selectedAlternative) {
    const now = Tone.now();
    if (selectedAlternative === myQuestion.answer) {
      setAnswerCorrect(true);
      setScore((prevScore) => {
        const updatedScore = prevScore.score + 1;
        return { ...prevScore, score: updatedScore };
      });

      if (soundOn) {
        synth.triggerAttackRelease("D4", "8n", now, 0.05);
        synth.triggerAttackRelease("F#4", "8n", now + 0.05, 0.05);
        synth.triggerAttackRelease("A4", "8n", now + 0.1, 0.05);
      }
    } else {
      setAnswerCorrect(false);
      if (soundOn) {
        synth.triggerAttackRelease("E4", "8n", now, 0.05);
        synth.triggerAttackRelease("C#4", "8n", now + 0.05, 0.05);
        synth.triggerAttackRelease("B2", "8n", now + 0.1, 0.05);
      }
    }

    setShowAnswer(true);
  }

  function restartGame() {
    setShowAnswer(false);
    setAnswerCorrect(false);
  }

  return (
    <section
      id="mainJoel"
      className="w-screen min-h-screen bg-[url(https://ia601205.us.archive.org/24/items/SPD-SLRSY-2046/nssdc_vg1_p21287.jpg)] bg-cover bg-no-repeat overflow-hidden"
    >
      <label className="absolute bottom-6 left-4">
        <input
          type="checkbox"
          checked={soundOn}
          onChange={soundToggleBTN}
          className="hidden"
        />

        <button
          onClick={soundToggleBTN}
          className={`btn btn-circle btn-primary backdrop-blur-3xl ${
            soundOn ? "swap-off" : "swap-on"
          }`}
        >
          {soundOn ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
        </button>
      </label>

      <div className="mt-16 flex flex-col w-full h-full items-center justify-center p-16 space-x-0 space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0">
        <motion.div
          className="relative w-96 h-full z-10 backdrop-blur-xl"
          initial={false}
          animate={{
            rotateY: showAnswer ? 180 : 0,
            transition: {
              default: { type: "spring" },
            },
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px", // Ensures proper 3D perspective
          }}
        >
          {/* Front of the card */}
          {!showAnswer && (
            <motion.div
              className="card bg-base-100 shadow-xl h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                position: "absolute",
                backfaceVisibility: "hidden", // Keeps the back side hidden
              }}
            >
              <figure className="w-full h-1/2 px-16 py-32 text-center bg-base-100">
                <h2 className="card-title">{myQuestion?.question}</h2>
              </figure>
              <div className="card-body bg-base-300 rounded-b-xl items-center text-center">
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

          {/* Back of the card (after the question is answered) */}
          {showAnswer && (
            <motion.div
              className="card bg-base-100 h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                position: "absolute",
                backfaceVisibility: "visible", // Make sure the backface is visible
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
                  <Link
                    href="/quizAli"
                    className="btn-base-100 btn mt-4 text-white text-center"
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
