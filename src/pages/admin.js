import { useContext, useState } from "react";
import { HandleQuestionContext } from "@/QuestionContext";

export default function Admin() {
  const { question, setQuestion } = useContext(HandleQuestionContext);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUsername] = useState("Meta");
  const [password, setPassword] = useState("Quizkampen");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  function handleLogin() {
    if (userName === inputUsername && password === inputPassword) {
      setLoggedIn(true);
    } else {
      alert("Invalid login!");
    }
  }

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
          className="bg-white text-5xl px-5 w-full text-center outline-none"
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
                className="bg-white w-full p-2 rounded-lg  outline-none"
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
            className="bg-white p-2 rounded-lg  outline-none"
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
      {loggedIn ? (
        <div className="flex flex-col items-center">
          <h1 className="text-7xl font-bold p-10">CONTROLL CENTER</h1>
          {displayQuestions}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-60">
          <div className="p-10 bg-primary rounded-xl">
            <div className="flex flex-col">
              <input
                className="p-5 bg-white text-black text-2xl rounded-xl outline-none"
                type="text"
                placeholder="Username:"
                onChange={(e) => setInputUsername(e.target.value)}
              />
              <br />
              <input
                className="p-5 bg-white text-black text-2xl rounded-xl outline-none"
                type="password"
                placeholder="Password:"
                onChange={(e) => setInputPassword(e.target.value)}
              />
              <br />
              <button
                className="bg-base-300 p-5 text-2xl rounded-xl"
                onClick={() => handleLogin()}
              >
                LOG IN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
