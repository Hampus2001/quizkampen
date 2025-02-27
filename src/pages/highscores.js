import Link from "next/link";
import { useEffect, useState } from "react";

export default function Scores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const storedScores =
      JSON.parse(localStorage.getItem("quizHighScores")) || [];
    setHighScores(storedScores);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" shadow-lg rounded-xl p-6 w-96 text-center border-8 border-primary">
        <h1 className="text-2xl font-bold mb-4">Highscores</h1>
        {highScores.length === 0 ? (
          <p className="">No saved scores.</p>
        ) : (
          <ul className="space-y-2">
            {highScores.map((score, index) => (
              <li key={index} className="p-2 rounded-md font-semibold text-lg">
                {index + 1}. {score.username}: {score.score} points
              </li>
            ))}
          </ul>
        )}
        <Link href="/" className="btn btn-primary mt-4">
          Play again!
        </Link>
      </div>
    </div>
  );
}
