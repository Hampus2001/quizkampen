import Footer from "./components/Footer";
import { CgArrowDown } from "react-icons/cg";

export default function Home() {
  return (
    <>
      <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <section className="mt-auto">
          <h1 className="text-xl sm:text-2xl md:text-4xl flex justify-center">
            Welcome to
            <span className="bg-gradient-to-r from-blue-500 to-green-300 via-purple-300 via-blue-300 bg-clip-text text-transparent pl-2">
              QuizKampen
            </span>
          </h1>
        </section>
        <section className="flex flex-col justify-center space-y-4 items-center mt-4">
          <h2 className="text-2xl">Let's play!</h2>
          <CgArrowDown size={30} className="text-cyan-200 mt-4" />
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
            Start the
            <span className="bg-gradient-to-l from-blue-500 to-green-300 via-purple-300 via-blue-300 bg-clip-text text-transparent text-sm md:text-2xl sm:text-2xl">
              game
            </span>
          </button>
        </section>

        <Footer />
      </div>
    </>
  );
}
