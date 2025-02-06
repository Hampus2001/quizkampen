import { useContext } from "react";
import { HandleQuestionContext } from "@/QuestionContext";

export default function Admin() {
  const { question, setQuestion } = useContext(HandleQuestionContext);

  const displayQuestions = [];

  for (let i = 0; i < question.length; i++) {
    displayQuestions.push(
      <div
        key={i}
        className="flex flex-col items-center w-2/4 gap-3 my-10 bg-white text-black rounded-xl"
      >
        <h2 className="w-full p-10 text-5xl text-center font-bold bg-secondary rounded-t-xl">
          Question {i + 1}
        </h2>
        <input
          className="bg-white text-5xl px-5"
          value={question[i].question}
          onChange={(e) => {
            const newQuestions = [...question];
            newQuestions[i].question = e.target.value;
            setQuestion(newQuestions);
          }}
        />

        <ul>
          {question[i].alternatives.map((alternative, index) => (
            <div className="flex p-5 text-xl gap-5">
              <p>Alternative {index + 1} : </p>
              <input className="bg-white" key={index} value={alternative} />
            </div>
          ))}
        </ul>
        <div className="flex gap-5 p-5">
          <p>Answer : </p>
          <input className="bg-white text-2xl" value={question[i].answer} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {displayQuestions}
      <button onClick={() => console.log(question)}>logg</button>
    </div>
  );
}
