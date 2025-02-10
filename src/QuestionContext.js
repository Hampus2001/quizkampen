import { createContext, useEffect, useState } from "react";

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
      question: "Vad är den kemiska symbolen för grundämnet syre?",
      alternatives: ["A) O", "B) Ox", "C) O2", "D) Om"],
      answer: "A) O",
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

  // Read localStorage
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("questions")) || [
      ...question,
    ];
    setQuestion(savedQuestions);
  }, []);

  //Update localStorage
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(question));
  }, [question]);

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
