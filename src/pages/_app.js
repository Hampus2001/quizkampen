import QuestionContext from "@/QuestionContext";
import "@/styles/globals.css";
import { Lexend } from "next/font/google";
import DaisyHeader from "./components/DaisyHeader";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${lexend.variable} font-sans`} data-theme="synthwave">
      <DaisyHeader />
      <QuestionContext>
        <Component {...pageProps} />
      </QuestionContext>
    </main>
  );
}
