"use client";
import { useState } from "react";
//import { getSolanaWallet } from "@/actions/getWallet";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
export default function Home() {
  //generate mnemonic if not generated already
  const [isShow, setIsShow] = useState(false);
  const handleShow = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div className="bg-black flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="w-4/5 h-3/5 text-white">
        <div>
          <h1 className="text-6xl font-bold">Wallet Generator</h1>
          <p className="text-slate-300 text-2xl py-3">
            A personal web-3 solana wallet
          </p>
        </div>
        <div className="flex my-5">
          <input
            type="text"
            placeholder="Enter your secret phase or leave blank to generate"
            className=" border rounded-md border-slate-400 w-3/5 bg-inherit  p-3"
          />
          <button className="bg-white text-black px-6  ml-5 py-3 rounded-md hover:bg-slate-100">
            Generate Wallet
          </button>
        </div>
        <div className="border border-slate-400 rounded-md ">
          <div className="flex justify-between p-3">
            <h1 className="text-3xl font-semibold">Current Secret Phrase</h1>
            <div>
              {!isShow ? (
                <RiArrowDropDownFill
                  onClick={handleShow}
                  className="text-4xl"
                />
              ) : (
                <RiArrowDropUpFill onClick={handleShow} className="text-4xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
