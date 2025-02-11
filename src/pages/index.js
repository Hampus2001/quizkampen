import { useContext, useEffect } from "react";
import Footer from "./components/Footer";
import { HandleScoreContext } from "@/ScoreContext";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    score.username = "";
    score.score = 0;
  }, []);

  const { score, setScore } = useContext(HandleScoreContext);
  /* function startGame() {
    console.log(score.username, score.score);
    window.location.href = "/quizAli";
  } */
  return (
    <>
      <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-base-400 text-foreground">
        <section className="">
          <h1 className="text-2xl text-base-content font-bold sm:text-2xl md:text-4xl flex justify-center">
            Welcome to
            <span className="bg-gradient-to-r from-blue-500 to-green-300 via-purple-300 via-blue-300 bg-clip-text text-transparent pl-2">
              QuizKampen
            </span>
          </h1>
        </section>
        <section className="flex flex-col justify-center space-y-4 items-center mt-4">
          <input
            placeholder="Username"
            type="text"
            className="bg-base-300 rounded-xl p-2 my-8 text-base-content"
            onChange={(e) => {
              setScore((score) => ({
                ...score,
                username: e.target.value,
              }));
              console.log(score.username);
            }}
          />

          <Link className="btn btn-wide  bg-blue-500" href={"/quizJoel"}>
            <p className="text-lg px-8 ">Start Game</p>
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}
