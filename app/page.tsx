//import { getSolanaWallet } from "@/actions/getWallet";
export default function Home() {
  //generate mnemonic if not generated already

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
            className="w-3/5 bg-inherit border-slate-300 py-3"
          />
          <button className="bg-white text-black px-6  ml-5 py-3 rounded-md hover:bg-slate-100">
            Generate Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
