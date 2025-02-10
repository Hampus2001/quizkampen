import { createContext, useEffect, useState } from "react";

export const HandleScoreContext = createContext([]);
export default function ScoreContext({ children }) {
  const [score, setScore] = useState([{ username: "test", score: 1 }]);
  function addScore() {
    setScore(...score, score.score++);
  }

  return (
    <HandleScoreContext.Provider
      value={{
        score,
        addScore,
      }}
    >
      {children}
    </HandleScoreContext.Provider>
  );
}
