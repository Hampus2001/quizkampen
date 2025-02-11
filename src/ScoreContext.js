import { createContext, useEffect, useState } from "react";

export const HandleScoreContext = createContext([]);
export default function ScoreContext({ children }) {
  const [score, setScore] = useState({ username: "", score: 0 });
  function addScore() {
    setScore(...score, score.score++);
  }

  return (
    <HandleScoreContext.Provider
      value={{
        score,
        setScore,
        addScore,
      }}
    >
      {children}
    </HandleScoreContext.Provider>
  );
}
