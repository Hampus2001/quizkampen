import QuestionContext from "@/QuestionContext";
import "@/styles/globals.css";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function App({ Component, pageProps }) {
  return (
    <QuestionContext>
      <main className={`${lexend.variable} font-sans`} data-theme="synthwave">
        <Component {...pageProps} />
      </main>
    </QuestionContext>
  );
}
