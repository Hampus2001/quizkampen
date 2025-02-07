import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="w-screen min-h-screen">
        <h1 className="text-5xl font-sans">Hejsan</h1>
        <button className="btn btn-primary font-sans">button</button>
        <Footer />
      </div>
    </>
  );
}
