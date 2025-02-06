import { createContext, useState } from "react";

export const HandleQuestionContext = createContext([]);

export default function QuestionContext({ children }) {
  const [question, setQuestion] = useState([
    {
      question:
        "Which of the following is the largest planet in our solar system?",
      alternatives: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Jupiter",
    },
    {
      question: "Hur många bor i Sverige?",
      alternatives: [
        "8 miljoner",
        "9,5 miljoner",
        "10,5 miljoner",
        "12 miljoner",
      ],
      answer: "10,5 miljoner",
    },
    {
      question: "Hur många bor i Sverige?",
      alternatives: [
        "8 miljoner",
        "9,5 miljoner",
        "10,5 miljoner",
        "12 miljoner",
      ],
      answer: "10,5 miljoner",
    },
    {
      question: "Hur många bor i Sverige?",
      alternatives: [
        "8 miljoner",
        "9,5 miljoner",
        "10,5 miljoner",
        "12 miljoner",
      ],
      answer: "10,5 miljoner",
    },
  ]);

  return (
    <HandleQuestionContext.Provider
      value={{
        question,
        setQuestion,
      }}
    >
      {children}
    </HandleQuestionContext.Provider>
  );
}
