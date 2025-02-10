

import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

let walletVal = 0;

export function getMnemonic() {
    return generateMnemonic();
}
export function getSeed(temp: string) {
    if (temp.length === 0 || temp.split(' ').length !== 12) return;

    return mnemonicToSeedSync(temp);
}
export function getSolanaWallet(temp: string) {

    if (temp.length === 0) {
        return null;
    }
    const seed = getSeed(temp);
    if (seed === undefined) return null;
    const path = `m/44'/501'/${walletVal++}'/0'`; // Derivation path for Solana

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    //console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
    return { priavateKey: Keypair.fromSecretKey(secret).secretKey, publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(), seed: seed };

}
