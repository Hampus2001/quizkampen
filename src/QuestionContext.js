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
      question:
        "What is this? I have been trying to write code for hours but my cat insists on sitting on my laptop",
      alternatives: [
        "Code Comment",
        "Cat Meme",
        "Developer’s Excuse",
        "Code Interruption",
      ],
      answer: "Cat Meme",
    },
    {
      question: "Vad är den kemiska symbolen för grundämnet syre?",
      alternatives: ["A) O", "B) Ox", "C) O2", "D) Om"],
      answer: "A) O",
    },

    {
      question: "När uppfanns bilbältet?",
      alternatives: ["1970", "1964", "1959", "1955"],
      answer: "1959",
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
