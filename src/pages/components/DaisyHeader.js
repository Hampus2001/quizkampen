import Link from "next/link";

export default function DaisyHeader() {
  return (
    <div className="fixed top-0 left-0 z-20 w-screen">
      <div className="navbar bg-base-300">
        <div className="navbar-start ml-2">
          <Link href="/">
            <button className="btn btn-ghost text-xl">QuizKampen</button>
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
      </div>
    </div>
  );
}
