import { useContext, useEffect, useState } from "react";
import { HandleQuestionContext } from "@/QuestionContext";
import Footer from "./components/Footer";

import { FiSettings } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";

export default function Admin() {
  const { question, setQuestion } = useContext(HandleQuestionContext);
  const [showModal, setShowModal] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUsername] = useState("Meta");
  const [password, setPassword] = useState("Quizkampen");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    setLoggedIn(isLoggedIn);

    const updatedUsername =
      JSON.parse(localStorage.getItem("username")) || userName;
    setUsername(updatedUsername);
    const updatedPassword =
      JSON.parse(localStorage.getItem("password")) || password;
    setPassword(updatedPassword);
  }, []);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(userName));
    localStorage.setItem("password", JSON.stringify(password));
  }, [setUsername && setPassword]);

  function handleLogin() {
    if (userName === inputUsername && password === inputPassword) {
      setLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    } else {
      alert("Invalid login!");
    }
  }

  const displayQuestions = [];

  for (let i = 0; i < question.length; i++) {
    displayQuestions.push(
      <div
        key={i}
        className="flex flex-col w-2/3 items-center m-10 bg-gradient-to-r from-primary to-secondary text-black rounded-xl border-8 bg-clip-border border-transparent"
      >
        <h2 className="w-full p-10 text-7xl text-center font-bold bg-base-300 rounded-t-xl text-white">
          Question {i + 1}
        </h2>
        <textarea
          className="w-full bg-base-300 text-white text-5xl px-5 pt-10 pb-5 text-center outline-none"
          value={question[i].question}
          onChange={(e) => {
            const newQuestions = [...question];
            newQuestions[i] = { ...newQuestions[i], question: e.target.value };
            setQuestion(newQuestions);
          }}
        />

        <div className="flex justify-center pb-10 pt-5 px-10 flex-wrap bg-base-300 gap-10 ">
          {question[i].alternatives.map((alternative, index) => (
            <div className="flex flex-col text-center p-5 text-2xl gap-5 bg-base-100 border-4 border-primary rounded-xl shadow-xl">
              <p className="text-start text-3xl font-bold text-white">
                Alternative {index + 1} :{" "}
              </p>
              <textarea
                className="bg-white w-full p-2 rounded-xl text-center outline-none"
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
        <div className="flex w-full text-white items-center justify-center gap-5 p-10 text-3xl bg-base-300 rounded-b-xl">
          <p>Answer : </p>
          <textarea
            className="bg-white text-black p-2 h-14 rounded-xl outline-none"
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
    <>
      <div className={showModal ? "blur-lg" : ""}>
        <div className="flex flex-col items-center mt-20">
          {loggedIn ? (
            <div className="flex flex-col items-center">
              <h1 className="text-7xl font-bold pb-10 pt-20">
                CONTROLL CENTER
              </h1>
              {displayQuestions}
              <div className="sm:flex items-center justify-center gap-5 lg:fixed lg:right-10 lg:bottom-10">
                <button onClick={() => setShowModal(true)}>
                  <FiSettings className="text-accent  text-5xl hover:text-secondary" />
                </button>
                <button
                  className="btn btn-accent btn-lg "
                  onClick={() => {
                    setLoggedIn(false);
                    localStorage.setItem("isLoggedIn", JSON.stringify(false));
                  }}
                >
                  LOG OUT
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center my-60 bg-gradient-to-r from-primary to-secondary rounded-xl border-4 bg-clip-border border-transparent">
              <div className="p-20 bg-base-300 rounded-xl">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-center pb-5">
                    Sign in
                  </h1>
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
                    className="btn btn-lg btn-accent text-2xl rounded-xl"
                    onClick={() => handleLogin()}
                  >
                    LOG IN
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
      {showModal && (
        <div className="fixed bottom-5 right-0 bg-gradient-to-r from-primary to-secondary bg-clip-border border-transparent border-4 rounded-xl">
          <div className="flex flex-col bg-base-300 p-10 rounded-xl">
            <div className="flex flex-col gap-5 p-10">
              <button
                className="btn btn-lg text-base-300 btn-accent text-5xl"
                onClick={() => setShowModal(false)}
              >
                <IoMdCloseCircle />
              </button>
              <input
                type="text"
                placeholder="Change Username"
                className="p-5 bg-white text-black text-2xl rounded-xl outline-nones"
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Change Password"
                className="p-5 bg-white text-black text-2xl rounded-xl outline-none"
                onChange={(e) => setUpdatedPassword(e.target.value)}
              />
              <button
                className="btn btn-lg btn-accent text-2xl"
                onClick={() => {
                  setUsername(updatedUsername);
                  setPassword(updatedPassword);
                  setShowModal(false);
                }}
              >
                UPDATE LOGIN
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
