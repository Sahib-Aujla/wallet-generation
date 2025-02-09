
import { generateMnemonic } from "bip39"
export default class GenerateWallet {

    public static generateMnemonic(): string {
        const mnemonic: string = generateMnemonic();
        return mnemonic;
    }

}