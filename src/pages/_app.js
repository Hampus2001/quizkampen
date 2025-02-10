import QuestionContext from "@/QuestionContext";
import "@/styles/globals.css";
import { Lexend } from "next/font/google";
import DaisyHeader from "./components/DaisyHeader";
import ScoreContext from "@/ScoreContext";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${lexend.variable} font-sans`} data-theme="synthwave">
      <DaisyHeader />
      <ScoreContext>
        <QuestionContext>
          <Component {...pageProps} />
        </QuestionContext>
      </ScoreContext>
    </main>
  );
}
