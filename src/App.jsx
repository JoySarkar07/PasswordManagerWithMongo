import "./App.css";
import Body from "./components/Body";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(129,236,165,0.93)] opacity-50 blur-[80px]"></div>
        </div>
      <Body />
      </div>
      <Footer/>
    </>
  );
}

export default App;
