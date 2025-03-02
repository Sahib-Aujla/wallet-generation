"use client";
import { useEffect, useState } from "react";
import { getMnemonic, getSolanaWallet } from "@/actions/getWallet";
import { RiArrowDropDownFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

interface Wallet {
  publicKey: string;
  privateKey: string;
  seed: string;
}

export default function Home() {
  // generate mnemonic if not generated already
  const [isShow, setIsShow] = useState(false);
  const [mnem, setMnem] = useState<string[]>([]);
  const [tempVal, setTempVal] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [visibility, setVisibility] = useState<{ p1: boolean; p2: boolean }[]>(
    []
  );
  const [display, setDisplay] = useState(false);

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

  const handleCopyMnemonic = async () => {
    try {
      await navigator.clipboard.writeText(mnem.join(" "));
      toast.success("Mnemonic copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy mnemonic.");
      console.log(err);
    }
  };

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
            className="border rounded-md border-slate-400 w-4/5 bg-inherit p-3"
            value={tempVal}
            onChange={(e) => setTempVal(e.target.value)}
          />
          <button
            onClick={() => {
              if (tempVal !== "" && tempVal.split(" ").length !== 12) {
                setTempVal("Invalid seed phrase.");
              }
              let str = "";
              if (tempVal === "") {
                if (mnem.length > 0) str = mnem.join(" ");
                else {
                  str = getMnemonic();
                }
              } else {
                str = tempVal;
              }

              setMnem(str.split(" "));
              const obj = getSolanaWallet(str);
              if (obj !== null) {
                setWallets((prev) => [...prev, obj]);
                setVisibility((prev) => [...prev, { p1: true, p2: true }]);
                setDisplay(true);
                toast.success("Wallet added successfully");
              }
            }}
            className="bg-white text-black px-6 ml-5 py-3 rounded-md hover:bg-slate-100"
          >
            Generate Wallet
          </button>
        </div>
        <div className="border border-slate-400 rounded-md">
          <div className="flex justify-between p-3">
            <h1 className="text-3xl font-semibold">Current Secret Phrase</h1>
            {/* Copy button + toggle arrow container */}
            <div className="flex items-center space-x-3">
              <RiArrowDropDownFill
                onClick={handleShow}
                className={`text-4xl cursor-pointer
                  transform ease-in-out transition-transform duration-500
                  ${isShow ? "rotate-180" : ""}`}
              />
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isShow ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="flex flex-wrap p-3 gap-2 justify-between">
              {mnem.map((m, i) => (
                <div
                  key={i}
                  className="bg-slate-600 w-1/4 text-white px-3 py-1 m-1 rounded-md text-center hover:bg-slate-700"
                >
                  {m}
                </div>
              ))}
            </div>
            <div className="px-5 py-2">
              <button
                onClick={handleCopyMnemonic}
                className="bg-slate-800 flex gap-1 justify-center items-center px-3 py-1 rounded-md hover:bg-slate-900"
              >
                <IoCopyOutline /> Copy
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {display && (
            <motion.div
              key="vault-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-7"
            >
              <div className="flex justify-between">
                <h1 className="text-4xl font-semibold">Vault</h1>
                <button
                  onClick={() => {
                    // Animate out the Vault section before clearing
                    setDisplay(false);
                    setTimeout(() => {
                      setWallets([]);
                      setVisibility([]);
                      toast.success("Wallets cleared successfully");
                    }, 300);
                  }}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md"
                >
                  Clear Wallets
                </button>
              </div>
              <AnimatePresence>
                {wallets.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="my-6 p-5 bg-slate-800 rounded-md">
                      <h1 className="text-2xl font-semibold">Wallet {i + 1}</h1>
                      <div>
                        Public Key:
                        <div className="text-slate-300">{w.publicKey}</div>
                      </div>
                      <div>
                        Private Key:
                        <div className="flex justify-between">
                          <input
                            readOnly
                            value={w.privateKey}
                            type={visibility[i].p1 ? "password" : "text"}
                            className="text-slate-300 bg-transparent w-4/5"
                          />
                          {visibility[i].p1 ? (
                            <FaRegEye
                              onClick={() =>
                                setVisibility((prev) => {
                                  const newVis = [...prev];
                                  newVis[i] = {
                                    ...newVis[i],
                                    p1: !newVis[i].p1,
                                  };
                                  return newVis;
                                })
                              }
                              className="text-xl cursor-pointer"
                            />
                          ) : (
                            <FaRegEyeSlash
                              onClick={() =>
                                setVisibility((prev) => {
                                  const newVis = [...prev];
                                  newVis[i] = {
                                    ...newVis[i],
                                    p1: !newVis[i].p1,
                                  };
                                  return newVis;
                                })
                              }
                              className="text-xl cursor-pointer"
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
                            type={visibility[i].p2 ? "password" : "text"}
                            className="text-slate-300 bg-transparent w-4/5"
                          />
                          {visibility[i].p2 ? (
                            <FaRegEye
                              onClick={() =>
                                setVisibility((prev) => {
                                  const newVis = [...prev];
                                  newVis[i] = {
                                    ...newVis[i],
                                    p2: !newVis[i].p2,
                                  };
                                  return newVis;
                                })
                              }
                              className="text-xl cursor-pointer"
                            />
                          ) : (
                            <FaRegEyeSlash
                              onClick={() =>
                                setVisibility((prev) => {
                                  const newVis = [...prev];
                                  newVis[i] = {
                                    ...newVis[i],
                                    p2: !newVis[i].p2,
                                  };
                                  return newVis;
                                })
                              }
                              className="text-xl cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
