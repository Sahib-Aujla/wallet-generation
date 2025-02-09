
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

let mnemonic: string = '';
let seed: Buffer = Buffer.alloc(0); //mnemonicToSeedSync(mnemonic);
let walletVal = 0;

export function getMnemonic() {
    if (mnemonic === '') mnemonic = generateMnemonic();
    return mnemonic;
}
export function getSeed() {
    if (mnemonic === '') mnemonic = getMnemonic();
    return seed = mnemonicToSeedSync(mnemonic);
}
export function getSolanaWallet() {

    if (seed.length === 0) { return undefined; }
    const path = `m/44'/501'/${walletVal++}'/0'`; // Derivation path for Solana

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    //console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    return { priavateKey: Keypair.fromSecretKey(secret).secretKey, publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58() };

}
