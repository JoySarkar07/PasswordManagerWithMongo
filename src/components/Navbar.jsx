import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const gotoGithub = ()=>{
    open('https://github.com/JoySarkar07/PasswordManagerWithMongo');
  }
  return (
    <nav className="bg-slate-800 flex justify-around p-5">
      <div className="text-white font-bold text-xl">
        <span className="text-green-700 font-bold">&lt;</span>
        JP
        <span className="text-green-700 font-bold">Manager/&gt;</span>
      </div>
      <button className="text-white flex justify-center items-center gap-2 border border-green-400 rounded-lg px-5 py-1 bg-green-700 hover:bg-opacity-0" onClick={gotoGithub}>
        <FaGithub size={20}/>
        Github
      </button>
    </nav>
  );
};

export default Navbar;
