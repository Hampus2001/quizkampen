import Footer from "./components/Footer";
import QuizJoel from "./components/QuizJoel";

export default function Home() {
  return (
    <>
      <div className="w-screen min-h-screen">
        {/* <h1 className="text-5xl font-sans mt-32">Hejsan</h1> */}

        <QuizJoel />
        <Footer />
      </div>
    </>
  );
}
