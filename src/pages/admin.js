import { useContext } from "react";
import { HandleQuestionContext } from "@/QuestionContext";

export default function Admin() {
  const { question, setQuestion } = useContext(HandleQuestionContext);

  const displayQuestions = [];

  for (let i = 0; i < question.length; i++) {
    displayQuestions.push(
      <div key={i} className="flex flex-col w-2/4 gap-3 my-10">
        <div className="flex flex-col gap-5">
          <h2>Question {i + 1}</h2>
          <input
            className="text-white text-5xl"
            value={question[i].question}
            onChange={(e) => {
              const newQuestions = [...question];
              newQuestions[i].question = e.target.value;
              setQuestion(newQuestions);
            }}
          />
        </div>
        <ul>
          {question[i].alternatives.map((alternative, index) => (
            <div>
              alternative {index + 1} :
              <input key={index} value={alternative} />
            </div>
          ))}
        </ul>
        <div>
          Answer:
          <input className="text-white text-2xl" value={question[i].answer} />
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
