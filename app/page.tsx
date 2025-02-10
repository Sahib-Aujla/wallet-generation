"use client";
import { useEffect, useState } from "react";
import { getMnemonic, getSolanaWallet } from "@/actions/getWallet";
import { RiArrowDropDownFill } from "react-icons/ri";

interface Wallet{
  publicKey: string,
  secretKey: Buffer,
  seed: Buffer
}
export default function Home() {
  //generate mnemonic if not generated already
  const [isShow, setIsShow] = useState(false);
  const [mnem, setMnem] = useState<string[]>([]);
  const [tempVal, setTempVal] = useState<string>("");
  const [wallets,setWallets] = useState<Wallet[]>([]);
  const handleShow = () => {
    setIsShow((prev) => !prev);
  };
  useEffect(() => {
    const showPneumonic = () => {
      const mnemonic = getMnemonic();
      setMnem(mnemonic.split(" "));
    };
    showPneumonic();
  }, []);

  return (
    <div className="bg-black flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="w-3/5 h-3/5 text-white">
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
            className=" border rounded-md border-slate-400 w-4/5 bg-inherit  p-3"
            value={tempVal}
            onChange={(e) => setTempVal(e.target.value)}
          />
          <button
            onClick={() => {
              if (tempVal !== "" && tempVal.split(" ").length !== 12) {
                setTempVal("Invalid seed phrase.");
              }
              // either do it in three steps, get mnemonic if not given
              // generate seed string
              // generate wallet
              let str = "";
              if (tempVal === "") {
                if (mnem.length > 0) str = mnem.join(" ");
                else {
                  str = getMnemonic();
                }
              }
              setMnem(str.split(" "));
              const obj = getSolanaWallet(str);
              console.log(obj);
            }}
            className="bg-white text-black px-6  ml-5 py-3 rounded-md hover:bg-slate-100"
          >
            Generate Wallet
          </button>
        </div>
        <div className="border border-slate-400 rounded-md ">
          <div className="flex justify-between p-3 ">
            <h1 className="text-3xl font-semibold">Current Secret Phrase</h1>
            <div>
              <RiArrowDropDownFill
                onClick={handleShow}
                className={`text-4xl cursor-pointer 
                          transform ease-in-out transition-transform duration-300 
                          ${isShow ? "rotate-180" : ""}`}
              />
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isShow ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="flex flex-wrap p-3">
              {mnem.map((m, i) => (
                <div
                  key={i}
                  className="bg-slate-400 text-white px-3 py-1 m-1 rounded-md"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
