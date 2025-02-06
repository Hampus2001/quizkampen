import { useContext } from "react";
import { HandleQuestionContext } from "@/QuestionContext";

export default function Admin() {
  const { question, setQuestion } = useContext(HandleQuestionContext);

  const displayQuestions = [];

  for (let i = 0; i < question.length; i++) {
    displayQuestions.push(
      <div
        key={i}
        className="flex flex-col items-center w-2/5 gap-3 my-10 bg-white text-black rounded-xl"
      >
        <h2 className="w-full p-10 text-5xl text-center font-bold bg-secondary rounded-t-xl">
          Question {i + 1}
        </h2>
        <input
          className="bg-white text-5xl px-5 w-full text-center"
          value={question[i].question}
          onChange={(e) => {
            const newQuestions = [...question];
            newQuestions[i] = { ...newQuestions[i], question: e.target.value };
            setQuestion(newQuestions);
          }}
        />

        <div className="flex justify-center pb-5 flex-wrap gap-10">
          {question[i].alternatives.map((alternative, index) => (
            <div className="flex flex-col text-center p-5 text-2xl gap-5 bg-primary rounded-xl shadow-xl">
              <p className="text-start text-3xl font-bold text-white">
                Alternative {index + 1} :{" "}
              </p>
              <input
                className="bg-white w-full p-2 rounded-lg"
                key={index}
                value={alternative}
                onChange={(e) => {
                  const newQuestions = [...question];
                  newQuestions[i].alternatives[index] = e.target.value;
                  setQuestion(newQuestions);
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-center gap-5 p-5 text-3xl bg-secondary rounded-b-lg">
          <p>Answer : </p>
          <input
            className="bg-white p-2 rounded-lg"
            value={question[i].answer}
            onChange={(e) => {
              const newQuestions = [...question];
              newQuestions[i] = { ...newQuestions[i], answer: e.target.value };
              setQuestion(newQuestions);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1>ControllCenter</h1>
      {displayQuestions}
    </div>
  );
}
