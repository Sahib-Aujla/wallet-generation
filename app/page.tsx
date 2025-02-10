"use client";
import { useEffect, useState } from "react";
import { getMnemonic, getSolanaWallet } from "@/actions/getWallet";
import { RiArrowDropDownFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface Wallet {
  publicKey: string;
  privateKey: string;
  seed: string;
}
export default function Home() {
  //generate mnemonic if not generated already
  const [isShow, setIsShow] = useState(false);
  const [mnem, setMnem] = useState<string[]>([]);
  const [tempVal, setTempVal] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isP1, setIsP1] = useState(true);
  const [isP2, setIsP2] = useState(true);

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
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
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
              if (obj !== null) {
                setWallets((prev) => [...prev, obj]);
              }
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
        <div className="mt-7">
          <div className="flex justify-between">
            <h1 className="text-4xl font-semibold">Vault</h1>
            <button className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md">
              Clear Wallets
            </button>
          </div>
          <div className="flex flex-wrap"></div>
          {wallets.map((w, i) => (
            <div key={i}>
              <div className="p-3 border border-slate-400 rounded-md">
                <h1 className="text-2xl font-semibold">Wallet {i + 1}</h1>
                <p>Public Key: {w.publicKey}</p>
                <div>
                  Private Key:
                  <div className="flex justify-between">
                    <input
                      readOnly
                      value={w.privateKey}
                      type={isP1 ? "password" : "text"}
                      className="text-slate-300 bg-transparent w-4/5"
                    />
                    {isP1 ? (
                      <FaRegEye
                        onClick={() => setIsP1((prev) => !prev)}
                        className="text-xl"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setIsP1((prev) => !prev)}
                        className="text-xl"
                      />
                    )}
                  </div>
                </div>
                <div>
                  Seed Key:
                  <div className="flex justify-between">
                    <input
                      readOnly
                      value={w.seed}
                      type={isP2 ? "password" : "text"}
                      className="text-slate-300 bg-transparent w-4/5"
                    />
                    {isP2 ? (
                      <FaRegEye
                        onClick={() => setIsP2((prev) => !prev)}
                        className="text-xl"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setIsP2((prev) => !prev)}
                        className="text-xl"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
