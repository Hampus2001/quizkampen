import Link from "next/link";
import { motion, useScroll } from "motion/react";

export default function DaisyHeader() {
  return (
    <div className="fixed top-0 left-0 z-20 w-screen">
      <div className="navbar bg-base-300">
        <div className="navbar-start ml-2 gap-2">
          <Link href="/">
            <motion.div
              className="flex gap-2 chat-start"
              animate={{
                x: ["0vw", "5vw", "0"], // Animate from left (0vw) to right (100vw)
              }}
              transition={{
                duration: 3, // Duration for the animation (in seconds)
                repeat: Infinity, // Repeat the animation infinitely
                ease: "easeInOut", // Easing function for smooth movement
              }}
            >
              <svg
                width="23"
                height="44"
                viewBox="0 0 23 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 21L13 26H9L9 21H13Z" fill="white" />
                <path
                  d="M-1.37091e-06 11C-1.37091e-06 9.41788 0.2875 7.95335 0.8625 6.60641C1.4375 5.28086 2.23611 4.11565 3.25833 3.11079C4.30185 2.12731 5.51574 1.35763 6.9 0.80175C8.30555 0.26725 9.83889 0 11.5 0C13.1611 0 14.6838 0.26725 16.0681 0.80175C17.4736 1.35763 18.6875 2.12731 19.7097 3.11079C20.7532 4.11565 21.5625 5.28086 22.1375 6.60641C22.7125 7.95335 23 9.41788 23 11C23 12.5821 22.7125 14.036 22.1375 15.3615C21.5625 16.7085 20.7532 17.8737 19.7097 18.8571C18.6662 19.862 17.4417 20.6317 16.0361 21.1662C14.6519 21.7221 13.1398 22 11.5 22C9.86018 22 8.3375 21.7221 6.93194 21.1662C5.54768 20.6317 4.33379 19.862 3.29028 18.8571C2.24676 17.8737 1.4375 16.7085 0.8625 15.3615C0.2875 14.036 -1.37091e-06 12.5821 -1.37091e-06 11ZM3.35416 11C3.35416 12.0904 3.55648 13.0845 3.96111 13.9825C4.36574 14.9018 4.93009 15.6929 5.65417 16.3557C6.39954 17.0185 7.26204 17.5316 8.24167 17.895C9.24259 18.2799 10.3287 18.4723 11.5 18.4723C12.6713 18.4723 13.7468 18.2799 14.7264 17.895C15.7273 17.5316 16.5898 17.0185 17.3139 16.3557C18.0593 15.6929 18.6343 14.9018 19.0389 13.9825C19.4435 13.0845 19.6458 12.0904 19.6458 11C19.6458 9.90962 19.4435 8.90476 19.0389 7.98542C18.6343 7.08746 18.0699 6.29641 17.3458 5.61225C16.6218 4.94947 15.7593 4.43635 14.7583 4.07289C13.7787 3.70943 12.6926 3.5277 11.5 3.5277C10.3287 3.5277 9.24259 3.70943 8.24167 4.07289C7.24074 4.43635 6.37824 4.94947 5.65417 5.61225C4.93009 6.29641 4.36574 7.08746 3.96111 7.98542C3.55648 8.90476 3.35416 9.90962 3.35416 11Z"
                  fill="white"
                />
                <path
                  d="M6.96571 27.005L10.9414 26.8047L23 39.0584V43.7997L6.96571 27.005ZM-1.37091e-06 24L23 24V27.606L-1.37091e-06 27.606V24ZM-1.37091e-06 39.4925L11.7629 30.5442L14.03 33.2154L-1.37091e-06 44V39.4925Z"
                  fill="white"
                />
              </svg>
            </motion.div>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="hidden lg:flex">
            <div className="menu menu-horizontal gap-x-4">
              <ul className="flex gap-x-2">
                <li>
                  <Link href="/highscores">Scoreboard</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/quizJoel">Joel</Link>
                </li>
                <li>
                  <Link href="/quizAli">Ali</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden lg:flex mr-2">
            <Link href="/admin">
              <button className="btn btn-ghost text-xl">Admin</button>
            </Link>
          </div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content bg-primary rounded-box fixed top-16 right-0"
              >
                <li>
                  <Link href="/admin">Admin</Link>
                </li>

                <li>
                  <Link href="/highscores">Scoreboard</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/quizJoel">Joel</Link>
                </li>
                <li>
                  <Link href="/quizAli">Ali</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <motion.div
          id="bottom-bar"
          className="fixed top-16 left-0 right-0 w-full h-1.5 z-20 bg-[#e779c1]"
        />
      </div>
    </div>
  );
}
